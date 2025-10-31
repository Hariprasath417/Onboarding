import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { formAPI } from '../services/api';
import StepFields from '../components/StepFields';

const FormStep = () => {
  const { stepNumber } = useParams();
  const navigate = useNavigate();
  const currentStep = parseInt(stepNumber, 10);

  const [formData, setFormData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  const saveStepData = useCallback(async () => {
    try {
      await formAPI.updateStep(currentStep, formData);
    } catch (err) {
      console.error('Error saving step data:', err);
      setError('Failed to save form data');
    }
  }, [currentStep, formData]);

  useEffect(() => {
    const loadStepData = async () => {
      try {
        setIsLoading(true);
        const response = await formAPI.getStep(currentStep);
        setFormData(response.data.data || {});
        setError(null);
      } catch (err) {
        console.error('Error loading step data:', err);
        setError('Failed to load form data');
      } finally {
        setIsLoading(false);
      }
    };

    if (currentStep >= 1 && currentStep <= 5) {
      loadStepData();
    } else {
      navigate('/form/1');
    }
  }, [currentStep, navigate]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (Object.keys(formData).length > 0 && !isLoading) {
        saveStepData();
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [formData, isLoading, saveStepData]);

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

  const handleNext = async () => {
    if (!validateCurrentStep()) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsSaving(true);
      await formAPI.updateStep(currentStep, formData);

      if (currentStep === 5) {
        await formAPI.submitForm();
        navigate('/dashboard');
      } else {
        navigate(`/form/${currentStep + 1}`);
      }
    } catch (err) {
      console.error('Error saving/submitting form:', err);
      setError('Failed to save form data');
    } finally {
      setIsSaving(false);
    }
  };

  const handleBack = async () => {
    if (currentStep > 1) {
      try {
        setIsSaving(true);
        await formAPI.updateStep(currentStep, formData);
        navigate(`/form/${currentStep - 1}`);
      } catch (err) {
        console.error('Error saving form data:', err);
        setError('Failed to save form data');
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
    <div className="min-h-screen bg-gray-100">
      {/* Header with progress bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            <button
              onClick={handleBack}
              disabled={currentStep === 1}
              className="flex items-center text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
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
                <div
                  className="absolute top-0 transform -translate-y-1"
                  style={{ left: `${(currentStep / 5) * 100}%` }}
                >
                  <div className="w-3 h-3 bg-gray-800 rounded-full" />
                </div>
              </div>
            </div>

            <div className="w-8 h-8 sm:w-16 sm:h-12 bg-orange-500 rounded flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
          <StepFields stepNumber={currentStep} data={formData} onChange={handleFieldChange} />

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 px-3 sm:px-4 py-3 sm:py-4">
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

      {/* Bottom padding for fixed footer */}
      <div className="h-16 sm:h-20" />
    </div>
  );
};

export default FormStep;