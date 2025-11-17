import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import StepFields from '../components/StepFields';

const FormStep = () => {
  const { stepNumber } = useParams();
  const navigate = useNavigate();
  const currentStep = parseInt(stepNumber, 10);
  const { user } = useAuth();

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  // Refs for debounce, last saved content and in-flight controller
  const saveTimerRef = useRef(null);
  const lastSavedRef = useRef(null); // stores JSON string of last-saved data per step
  const inFlightControllerRef = useRef(null);
  const loadControllerRef = useRef(null);

  // load step data (cancellable)
  useEffect(() => {
    if (!(currentStep >= 1 && currentStep <= 5)) {
      navigate('/form/1');
      return;
    }

    // cancel any previous load request
    if (loadControllerRef.current) {
      loadControllerRef.current.abort();
    }
    const controller = new AbortController();
    loadControllerRef.current = controller;

    const loadStepData = async () => {
      try {
        setIsLoading(true);
        const response = await formAPI.getStep(currentStep, { signal: controller.signal });
        const loadedData = response.data.data || {};

        // Pre-fill username in step 1 if user is logged in and username is not already set
        if (currentStep === 1 && user && !loadedData.yourUsername) {
          loadedData.yourUsername = user.name;
        }

        setFormData(loadedData);
        // set lastSavedRef for this loaded state (so autosave won't resend same content)
        lastSavedRef.current = JSON.stringify(loadedData || {});
        setError(null);
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          // aborted — ignore
        } else {
          console.error('Error loading step data:', err);
          setError('Failed to load form data');
        }
      } finally {
        setIsLoading(false);
        loadControllerRef.current = null;
      }
    };

    loadStepData();

    return () => {
      if (loadControllerRef.current) loadControllerRef.current.abort();
    };
  }, [currentStep, navigate, user]);

  // saveStepData with dedupe and cancellation
  const saveStepData = useCallback(
    async (payload) => {
      const payloadObj = payload || formData;
      // avoid saving empty/initial objects
      if (!payloadObj || Object.keys(payloadObj).length === 0) return;

      const payloadStr = JSON.stringify(payloadObj);
      if (lastSavedRef.current === payloadStr) {
        // nothing changed since last save
        return;
      }

      // cancel previous in-flight save
      if (inFlightControllerRef.current) {
        inFlightControllerRef.current.abort();
        inFlightControllerRef.current = null;
      }
      const controller = new AbortController();
      inFlightControllerRef.current = controller;

      try {
        await formAPI.updateStep(currentStep, payloadObj, { signal: controller.signal });
        lastSavedRef.current = payloadStr;
      } catch (err) {
        if (err.name === 'CanceledError' || err.name === 'AbortError') {
          // canceled — ignore
        } else {
          console.error('Error saving step data:', err);
          // we don't set UI error here for autosave, only log — keep UX smooth
        }
      } finally {
        inFlightControllerRef.current = null;
      }
    },
    [currentStep, formData]
  );

  // Debounced autosave effect
  useEffect(() => {
    // Don't auto-save while loading
    if (isLoading) return;

    // Don't auto-save if formData is empty
    if (!formData || Object.keys(formData).length === 0) return;

    // clear previous timer
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);

    saveTimerRef.current = setTimeout(() => {
      saveStepData(formData);
      saveTimerRef.current = null;
    }, 1000); // 1s debounce

    return () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    };
  }, [formData, isLoading, saveStepData]);

  // Pre-fill username when user becomes available and we're on step 1
  useEffect(() => {
    if (currentStep === 1 && user?.name && !formData.yourUsername && !isLoading) {
      setFormData((prevData) => {
        const next = { ...prevData, yourUsername: user.name };
        // reflect that this is a new change (do not immediately mark as lastSaved)
        return next;
      });
    }
  }, [user?.name, currentStep, isLoading]); // we purposely don't include formData here to avoid loops

  const handleFieldChange = (newData) => {
    setFormData(newData);
    setError(null);
  };

  const validateCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.yourName &&
          formData.yourUsername &&
          formData.describesYou &&
          formData.location &&
          formData.howDoYouKnowUs
        );
      case 2:
        return formData.mainGoal;
      case 3:
        return true;
      case 4:
        return formData.selectedSkills && formData.selectedSkills.length > 0;
      case 5:
        return formData.jobSeeking && formData.profileImage;
      default:
        return false;
    }
  };

  const flushPendingAutosave = async () => {
    // cancel timeout and perform a final save if needed
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    // If a save is in-flight, wait for it to finish; otherwise trigger saveStepData
    if (inFlightControllerRef.current) {
      // wait briefly until in-flight resolves (or cancel it)
      try {
        // cancel in-flight and then do a fresh save to ensure latest data is persisted
        inFlightControllerRef.current.abort();
        inFlightControllerRef.current = null;
      } catch (err) {
        // ignore
      }
    }

    // perform a synchronous final save
    await saveStepData(formData);
  };

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      await flushPendingAutosave();

      if (currentStep === 5) {
        await formAPI.submitForm();
        navigate('/dashboard');
      } else {
        navigate(`/form/${currentStep + 1}`);
      }
    } catch (err) {
      console.error('Error saving/submitting form:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to save form data';
      setError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      try {
        setIsSaving(true);
        setError(null);

        await flushPendingAutosave();

        navigate(`/form/${currentStep - 1}`);
      } catch (err) {
        console.error('Error saving form data:', err);
        const errorMessage = err.response?.data?.message || err.message || 'Failed to save form data';
        setError(errorMessage);
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen flex flex-col ${currentStep === 3 ? 'bg-blue-50' : 'bg-gray-100'}`}>
      {/* Blue line at top */}
      <div className="h-1 bg-blue-500"></div>

      {/* Header with progress bar */}
      <div className="bg-white border-b border-gray-200 flex-shrink-0">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Back</span>
            </button>

            <div className="flex-1 mx-2 sm:mx-8">
              <div className="relative">
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div
                    className="bg-gray-800 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / 5) * 100}%` }}
                  />
                </div>
                <div className="absolute top-0 transform -translate-y-1" style={{ left: `${(currentStep / 5) * 100}%` }}>
                  <div className="w-3 h-3 bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-8 h-8 sm:w-16 sm:h-12 bg-orange-500 rounded flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Main content - Centered vertically */}
      <div className="flex-1 flex items-center justify-center min-h-0 pb-16 sm:pb-20">
        {currentStep === 3 ? (
          <div className="w-full">
            <StepFields stepNumber={currentStep} data={formData} onChange={handleFieldChange} user={user} />
            {error && (
              <div className="max-w-4xl mx-auto px-3 sm:px-4 mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        ) : (
          <div className="w-full max-w-4xl mx-auto px-3 sm:px-4">
            <StepFields stepNumber={currentStep} data={formData} onChange={handleFieldChange} user={user} />

            {error && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 px-3 sm:px-4 py-3 sm:py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex justify-between items-center gap-3">
          <span className="text-gray-400 text-xs sm:text-sm hidden sm:inline">or press Enter</span>
          <button
            onClick={handleNext}
            disabled={!validateCurrentStep() || isSaving}
            className="bg-gray-700 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex-1 sm:flex-initial"
          >
            {isSaving ? 'Saving...' : currentStep === 5 ? 'Submit' : 'Continue'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormStep;
