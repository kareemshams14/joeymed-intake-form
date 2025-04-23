'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';

interface DynamicQuestionsCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const DynamicQuestionsCard = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev 
}: DynamicQuestionsCardProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Get total questions based on selected treatment
  const getTotalQuestions = () => {
    return 5; // All treatment verticals have 5 questions
  };
  
  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Handle option selection
  const handleOptionSelect = (field: string, value: string) => {
    updateFormData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Handle checkbox selection
  const handleCheckboxSelect = (field: string, value: string, isChecked: boolean) => {
    const currentValues = formData[field as keyof FormData] as string[];
    let newValues: string[];
    
    if (isChecked) {
      newValues = [...currentValues, value];
    } else {
      newValues = currentValues.filter(v => v !== value);
    }
    
    updateFormData({ [field]: newValues });
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
  
  // Check if current question is complete
  const isCurrentQuestionComplete = () => {
    switch (formData.selectedTreatment) {
      case 'weight-loss':
        switch (currentQuestion) {
          case 1: return formData.weightLossPlan !== null;
          case 2: return formData.currentWeight !== '';
          case 3: return formData.goalWeight !== '';
          case 4: return true; // Checkbox question, always valid
          case 5: return formData.metabolicIssues !== null;
          default: return false;
        }
      case 'erectile-dysfunction':
        switch (currentQuestion) {
          case 1: return formData.edProduct !== null;
          case 2: return formData.symptomDuration !== null;
          case 3: return formData.cardiovascularHistory !== null;
          case 4: return formData.nitratesUse !== null;
          case 5: return formData.medicationPreference !== null;
          default: return false;
        }
      case 'sexual-health':
        switch (currentQuestion) {
          case 1: return formData.shProduct !== null;
          case 2: return formData.libidoIssues !== null;
          case 3: return formData.hormonalTherapy !== null;
          case 4: return formData.menopauseStatus !== null;
          case 5: return formData.nasalSensitivity !== null;
          default: return false;
        }
      case 'anti-aging':
        switch (currentQuestion) {
          case 1: return formData.aaProduct !== null;
          case 2: return formData.energyLevel !== null;
          case 3: return formData.moodLevel !== null;
          case 4: return formData.sleepQuality !== null;
          case 5: return formData.injectionTolerance !== null;
          default: return false;
        }
      case 'travel-kit':
        switch (currentQuestion) {
          case 1: return formData.travelDestination !== '';
          case 2: return formData.travelStartDate !== '';
          case 3: return formData.travelEndDate !== '';
          case 4: return formData.travelHealthConcerns !== '';
          case 5: return true; // Checkbox question, always valid
          default: return false;
        }
      default:
        return false;
    }
  };
  
  // Render weight loss questions
  const renderWeightLossQuestions = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Which Weight Loss plan are you interested in?</h3>
            <div className="space-y-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.weightLossPlan === 'basic' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => {
                  handleOptionSelect('weightLossPlan', 'basic');
                  updateFormData({ 
                    selectedProducts: [
                      ...formData.selectedProducts.filter(p => p.id !== 'weight-loss-basic' && p.id !== 'weight-loss-gold' && p.id !== 'weight-loss-premium'),
                      { id: 'weight-loss-basic', name: 'Weight Loss Basic Plan', price: 120 }
                    ]
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.weightLossPlan === 'basic' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.weightLossPlan === 'basic' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>Basic Plan</span>
                  </div>
                  <span className="text-joey-blue font-semibold">$120/mo</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.weightLossPlan === 'gold' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => {
                  handleOptionSelect('weightLossPlan', 'gold');
                  updateFormData({ 
                    selectedProducts: [
                      ...formData.selectedProducts.filter(p => p.id !== 'weight-loss-basic' && p.id !== 'weight-loss-gold' && p.id !== 'weight-loss-premium'),
                      { id: 'weight-loss-gold', name: 'Weight Loss Gold Plan', price: 199 }
                    ]
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.weightLossPlan === 'gold' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.weightLossPlan === 'gold' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>Gold Plan</span>
                  </div>
                  <span className="text-joey-blue font-semibold">$199/mo</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.weightLossPlan === 'premium' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => {
                  handleOptionSelect('weightLossPlan', 'premium');
                  updateFormData({ 
                    selectedProducts: [
                      ...formData.selectedProducts.filter(p => p.id !== 'weight-loss-basic' && p.id !== 'weight-loss-gold' && p.id !== 'weight-loss-premium'),
                      { id: 'weight-loss-premium', name: 'Weight Loss Premium Plan', price: 299 }
                    ]
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.weightLossPlan === 'premium' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.weightLossPlan === 'premium' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>Premium Plan</span>
                  </div>
                  <span className="text-joey-blue font-semibold">$299/mo</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">What is your current weight?</h3>
            <div className="mb-6">
              <input
                type="number"
                value={formData.currentWeight}
                onChange={(e) => handleInputChange('currentWeight', e.target.value)}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                  errors.currentWeight ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter weight in lbs"
              />
              {errors.currentWeight && (
                <p className="text-red-500 mt-2 text-sm">{errors.currentWeight}</p>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">What is your goal weight?</h3>
            <div className="mb-6">
              <input
                type="number"
                value={formData.goalWeight}
                onChange={(e) => handleInputChange('goalWeight', e.target.value)}
                className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                  errors.goalWeight ? 'border-red-500' : 'border-gray-200'
                }`}
                placeholder="Enter weight in lbs"
              />
              {errors.goalWeight && (
                <p className="text-red-500 mt-2 text-sm">{errors.goalWeight}</p>
              )}
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Have you tried weight loss methods before?</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-none"
                  checked={formData.weightLossHistory.includes('none')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'none', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-none">None</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-diet"
                  checked={formData.weightLossHistory.includes('diet')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'diet', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-diet">Diet Only</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-exercise"
                  checked={formData.weightLossHistory.includes('exercise')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'exercise', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-exercise">Exercise Only</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-diet-exercise"
                  checked={formData.weightLossHistory.includes('diet-exercise')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'diet-exercise', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-diet-exercise">Diet and Exercise</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-medication"
                  checked={formData.weightLossHistory.includes('medication')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'medication', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-medication">Weight Loss Medication</label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="weight-loss-surgery"
                  checked={formData.weightLossHistory.includes('surgery')}
                  onChange={(e) => handleCheckboxSelect('weightLossHistory', 'surgery', e.target.checked)}
                  className="w-5 h-5 mr-3"
                />
                <label htmlFor="weight-loss-surgery">Weight Loss Surgery</label>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Do you have any metabolic or thyroid issues?</h3>
            <div className="space-y-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.metabolicIssues === 'yes' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleOptionSelect('metabolicIssues', 'yes')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.metabolicIssues === 'yes' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.metabolicIssues === 'yes' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>Yes</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.metabolicIssues === 'no' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleOptionSelect('metabolicIssues', 'no')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.metabolicIssues === 'no' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.metabolicIssues === 'no' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>No</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Render erectile dysfunction questions
  const renderErectileDysfunctionQuestions = () => {
    switch (currentQuestion) {
      case 1:
        return (
          <div>
            <h3 className="text-xl font-semibold mb-6">Which product are you interested in?</h3>
            <div className="space-y-4">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.edProduct === 'vitalitymax' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => {
                  handleOptionSelect('edProduct', 'vitalitymax');
                  updateFormData({ 
                    selectedProducts: [
                      ...formData.selectedProducts.filter(p => 
                        !['vitalitymax', 'tadalafil-daily', 'tadalafil-needed', 'sildenafil', 'olympus-male'].includes(p.id)
                      ),
                      { id: 'vitalitymax', name: 'VitalityMax', price: 50 }
                    ]
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.edProduct === 'vitalitymax' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.edProduct === 'vitalitymax' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>VitalityMax</span>
                  </div>
                  <span className="text-joey-blue font-semibold">$50/mo</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.edProduct === 'tadalafil-daily' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => {
                  handleOptionSelect('edProduct', 'tadalafil-daily');
                  updateFormData({ 
                    selectedProducts: [
                      ...formData.selectedProducts.filter(p => 
                        !['vitalitymax', 'tadalafil-daily', 'tadalafil-needed', 'sildenafil', 'olympus-male'].includes(p.id)
                      ),
                      { id: 'tadalafil-daily', name: 'Tadalafil Daily', price: 90 }
                    ]
                  });
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                      formData.edProduct === 'tadalafil-daily' ? 'border-joey-blue' : 'border-gray-300'
                    }`}>
                      {formData.edProduct === 'tadalafil-daily' && (
                        <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                      )}
                    </div>
                    <span>Tadalafil Daily</span>
                  </div>
                  <span className="text-joey-blue font-semibold">$90/mo</span>
                </div>
              </div>
              
              {/* Add other ED products here */}
            </div>
          </div>
        );
      // Add other ED questions here
      default:
        return null;
    }
  };
  
  // Render questions based on selected treatment
  const renderDynamicQuestions = () => {
    switch (formData.selectedTreatment) {
      case 'weight-loss':
        return renderWeightLossQuestions();
      case 'erectile-dysfunction':
        return renderErectileDysfunctionQuestions();
      // Add other treatment questions here
      default:
        return <div>Please select a treatment first.</div>;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">
        {formData.selectedTreatment === 'weight-loss' && 'Weight Loss Questions'}
        {formData.selectedTreatment === 'erectile-dysfunction' && 'Erectile Dysfunction Questions'}
        {formData.selectedTreatment === 'sexual-health' && 'Sexual Health Questions'}
        {formData.selectedTreatment === 'anti-aging' && 'Anti-Aging & Wellness Questions'}
        {formData.selectedTreatment === 'travel-kit' && 'Travel Kit Questions'}
      </h2>
      
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
        {renderDynamicQuestions()}
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

export default DynamicQuestionsCard;
