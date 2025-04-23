'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';

interface MedicalInfoCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const MedicalInfoCard = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev 
}: MedicalInfoCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  
  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };
  
  // Handle option selection
  const handleOptionSelect = (field: string, value: string) => {
    updateFormData({ [field]: value });
  };
  
  // Handle next question
  const handleNextQuestion = () => {
    if (currentQuestion < getTotalQuestions()) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onNext();
    }
  };
  
  // Handle previous question
  const handlePrevQuestion = () => {
    if (currentQuestion > 1) {
      setCurrentQuestion(prev => prev - 1);
    } else {
      onPrev();
    }
  };
  
  // Get total questions
  const getTotalQuestions = () => {
    // Female users get an additional question about pregnancy
    return formData.gender === 'female' ? 5 : 4;
  };
  
  // Check if current question is complete
  const isCurrentQuestionComplete = () => {
    switch (currentQuestion) {
      case 1: return true; // Allergies can be empty
      case 2: return formData.labWork !== null;
      case 3: return true; // Medications can be empty
      case 4: return true; // Pre-existing conditions can be empty
      case 5: return formData.gender !== 'female' || formData.pregnantNursing !== null;
      default: return false;
    }
  };
  
  // Render current question
  const renderCurrentQuestion = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Do you have any allergies?</h3>
            <div className="mb-6">
              <textarea
                value={formData.allergies}
                onChange={(e) => handleInputChange('allergies', e.target.value)}
                className="w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue border-gray-200"
                placeholder="List any medication or general allergies, or type 'None' if none."
                rows={4}
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Have you had lab work done in the past 12 months?</h3>
            <div className="space-y-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.labWork === 'yes' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleOptionSelect('labWork', 'yes')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.labWork === 'yes' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.labWork === 'yes' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>Yes</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.labWork === 'no' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleOptionSelect('labWork', 'no')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.labWork === 'no' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.labWork === 'no' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Are you currently taking any medications?</h3>
            <div className="mb-6">
              <textarea
                value={formData.currentMedications}
                onChange={(e) => handleInputChange('currentMedications', e.target.value)}
                className="w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue border-gray-200"
                placeholder="List any medications you are currently taking, or type 'None' if none."
                rows={4}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Do you have any pre-existing conditions?</h3>
            <div className="mb-6">
              <textarea
                value={formData.preExistingConditions}
                onChange={(e) => handleInputChange('preExistingConditions', e.target.value)}
                className="w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue border-gray-200"
                placeholder="List any pre-existing medical conditions, or type 'None' if none."
                rows={4}
              />
            </div>
          </div>
        );
      case 5:
        if (formData.gender === 'female') {
          return (
            <div>
              <h3 className="text-xl font-semibold mb-6">Are you pregnant or nursing?</h3>
              <div className="space-y-4">
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.pregnantNursing === 'yes' 
                      ? 'border-joey-blue bg-blue-50' 
                      : 'border-gray-200 hover:border-joey-blue'
                  }`}
                  onClick={() => handleOptionSelect('pregnantNursing', 'yes')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.pregnantNursing === 'yes' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.pregnantNursing === 'yes' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>Yes</span>
                  </div>
                </div>
                
                <div 
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    formData.pregnantNursing === 'no' 
                      ? 'border-joey-blue bg-blue-50' 
                      : 'border-gray-200 hover:border-joey-blue'
                  }`}
                  onClick={() => handleOptionSelect('pregnantNursing', 'no')}
                >
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.pregnantNursing === 'no' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.pregnantNursing === 'no' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>No</span>
                  </div>
                </div>
              </div>
            </div>
          );
        }
        return null;
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">Medical Information</h2>
      
      <div className="flex justify-center mb-8">
        <div className="flex space-x-2">
          {Array.from({ length: getTotalQuestions() }).map((_, index) => (
            <div 
              key={index}
              className={`w-3 h-3 rounded-full ${
                currentQuestion === index + 1 
                  ? 'bg-joey-blue' 
                  : currentQuestion > index + 1 
                    ? 'bg-blue-200' 
                    : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>
      
      <motion.div
        key={currentQuestion}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {renderCurrentQuestion()}
      </motion.div>
      
      <div className="flex justify-between mt-8">
        <Button onClick={handlePrevQuestion} variant="secondary">Back</Button>
        <Button 
          onClick={handleNextQuestion} 
          disabled={!isCurrentQuestionComplete()}
        >
          {currentQuestion < getTotalQuestions() ? 'Continue' : 'Next Section'}
        </Button>
      </div>
    </div>
  );
};

export default MedicalInfoCard;
