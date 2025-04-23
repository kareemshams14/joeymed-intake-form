'use client';

import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';

interface QualificationCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onDisqualify: (reason: string) => void;
}

const QualificationCard = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onDisqualify 
}: QualificationCardProps) => {
  
  // Handle Florida residency selection
  const handleFloridaResidency = (value: string) => {
    updateFormData({ floridaResident: value });
    
    if (value === 'no') {
      onDisqualify('We apologize, but JoeyMed services are only available to Florida residents.');
    }
  };
  
  // Handle age verification selection
  const handleAgeVerification = (value: string) => {
    updateFormData({ ageVerification: value });
    
    if (value === 'no') {
      onDisqualify('We apologize, but JoeyMed services are only available to individuals 18 years of age or older.');
    }
  };
  
  // Handle telehealth consent selection
  const handleTelehealthConsent = (value: string) => {
    updateFormData({ telehealthConsent: value });
    
    if (value === 'no') {
      onDisqualify('Telehealth consent is required to use JoeyMed services.');
    }
  };
  
  // Check if all required fields are filled
  const isComplete = () => {
    return (
      formData.floridaResident === 'yes' &&
      formData.ageVerification === 'yes' &&
      formData.telehealthConsent === 'yes'
    );
  };
  
  // Handle next button click
  const handleNext = () => {
    if (isComplete()) {
      onNext();
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">Qualification</h2>
      <p className="text-gray-600 mb-10 text-center">
        Please answer these initial questions to determine your eligibility for JoeyMed services.
      </p>
      
      {/* Florida Residency Question */}
      <div className="mb-10">
        <h3 className="text-xl font-semibold mb-4">Are you a Florida resident?</h3>
        <div className="space-y-3">
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.floridaResident === 'yes' 
                ? 'border-joey-blue bg-blue-50' 
                : 'border-gray-200 hover:border-joey-blue'
            }`}
            onClick={() => handleFloridaResidency('yes')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                formData.floridaResident === 'yes' ? 'border-joey-blue' : 'border-gray-300'
              }`}>
                {formData.floridaResident === 'yes' && (
                  <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                )}
              </div>
              <span>Yes</span>
            </div>
          </div>
          
          <div 
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.floridaResident === 'no' 
                ? 'border-joey-blue bg-blue-50' 
                : 'border-gray-200 hover:border-joey-blue'
            }`}
            onClick={() => handleFloridaResidency('no')}
          >
            <div className="flex items-center">
              <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                formData.floridaResident === 'no' ? 'border-joey-blue' : 'border-gray-300'
              }`}>
                {formData.floridaResident === 'no' && (
                  <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                )}
              </div>
              <span>No</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Age Verification Question */}
      {formData.floridaResident === 'yes' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold mb-4">Are you 18 years of age or older?</h3>
          <div className="space-y-3">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.ageVerification === 'yes' 
                  ? 'border-joey-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-joey-blue'
              }`}
              onClick={() => handleAgeVerification('yes')}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  formData.ageVerification === 'yes' ? 'border-joey-blue' : 'border-gray-300'
                }`}>
                  {formData.ageVerification === 'yes' && (
                    <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                  )}
                </div>
                <span>Yes</span>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.ageVerification === 'no' 
                  ? 'border-joey-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-joey-blue'
              }`}
              onClick={() => handleAgeVerification('no')}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  formData.ageVerification === 'no' ? 'border-joey-blue' : 'border-gray-300'
                }`}>
                  {formData.ageVerification === 'no' && (
                    <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                  )}
                </div>
                <span>No</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Telehealth Consent Question */}
      {formData.floridaResident === 'yes' && formData.ageVerification === 'yes' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-10"
        >
          <h3 className="text-xl font-semibold mb-4">Do you consent to telehealth services?</h3>
          <div className="space-y-3">
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.telehealthConsent === 'yes' 
                  ? 'border-joey-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-joey-blue'
              }`}
              onClick={() => handleTelehealthConsent('yes')}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  formData.telehealthConsent === 'yes' ? 'border-joey-blue' : 'border-gray-300'
                }`}>
                  {formData.telehealthConsent === 'yes' && (
                    <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                  )}
                </div>
                <span>Yes</span>
              </div>
            </div>
            
            <div 
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.telehealthConsent === 'no' 
                  ? 'border-joey-blue bg-blue-50' 
                  : 'border-gray-200 hover:border-joey-blue'
              }`}
              onClick={() => handleTelehealthConsent('no')}
            >
              <div className="flex items-center">
                <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                  formData.telehealthConsent === 'no' ? 'border-joey-blue' : 'border-gray-300'
                }`}>
                  {formData.telehealthConsent === 'no' && (
                    <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                  )}
                </div>
                <span>No</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
      
      {/* Next Button */}
      <div className="flex justify-end mt-8">
        <Button 
          onClick={handleNext} 
          disabled={!isComplete()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default QualificationCard;
