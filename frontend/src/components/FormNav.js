import React from 'react';

const FormNav = ({ currentStep, onNext, onBack, isNextDisabled, isSubmitting }) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === 8;

  return (
    <div className="flex justify-between items-center pt-6 border-t border-secondary-200">
      <button
        type="button"
        onClick={onBack}
        disabled={isFirstStep}
        className={`btn-secondary ${isFirstStep ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        Back
      </button>

      <div className="flex space-x-2">
        {Array.from({ length: 8 }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-3 h-3 rounded-full ${
              step <= currentStep ? 'bg-primary-600' : 'bg-secondary-300'
            }`}
          />
        ))}
      </div>

      <button
        type="button"
        onClick={onNext}
        disabled={isNextDisabled || isSubmitting}
        className={`btn-primary ${
          isNextDisabled || isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isSubmitting ? 'Saving...' : isLastStep ? 'Submit' : 'Next'}
      </button>
    </div>
  );
};

export default FormNav;
