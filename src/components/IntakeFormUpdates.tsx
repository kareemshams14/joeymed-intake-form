'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SquareCheckout from './checkout/SquareCheckout';
import AddressAutocomplete from './AddressAutocomplete';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import TreatmentInfographic from './TreatmentInfographic';
import TrustpilotReviews from './TrustpilotReviews';
import BodyVisualization from './BodyVisualization';

// Rest of the IntakeForm component remains the same, adding the new components where appropriate

const IntakeForm: React.FC = () => {
  // Existing state and functions...
  
  // Modified renderStep function to include new components
  const renderStep = () => {
    switch (step) {
      // Previous steps remain the same...
      
      case 3:
        return (
          <motion.div 
            key="step3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Select Treatment</h2>
            
            <div className="space-y-4">
              {treatments.map((treatment) => (
                <label
                  key={treatment.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.selectedTreatment === treatment.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="selectedTreatment"
                        value={treatment.id}
                        checked={formData.selectedTreatment === treatment.id}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-900 font-medium">{treatment.name}</span>
                    </div>
                    <span className="text-blue-600 font-semibold">${treatment.price.toFixed(2)}</span>
                  </div>
                </label>
              ))}
              
              {errors.selectedTreatment && (
                <p className="text-red-500 text-sm mt-1">{errors.selectedTreatment}</p>
              )}
            </div>
            
            {formData.selectedTreatment && (
              <div className="mt-6">
                <TreatmentInfographic treatmentId={formData.selectedTreatment} />
              </div>
            )}
            
            <div className="mt-8">
              <TrustpilotReviews 
                businessId="joeymed.com" 
                className="mb-6"
              />
            </div>
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              
              <button
                onClick={nextStep}
                disabled={!formData.selectedTreatment}
                className={`py-2 px-4 rounded-md text-white ${
                  formData.selectedTreatment
                    ? 'bg-blue-600 hover:bg-blue-700'
                    : 'bg-gray-400 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </motion.div>
        );
        
      case 4:
        return (
          <motion.div 
            key="step4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold text-blue-600 mb-6">Health Information</h2>
            
            {formData.selectedTreatment === 'weight-loss' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">BMI Calculator</h3>
                <BMICalculator 
                  onBMICalculated={handleBMICalculated}
                  className="mb-6"
                />
                
                {formData.bmi && formData.weight && formData.targetWeight && weeksToTarget && (
                  <>
                    <WeightLossGraph
                      currentWeight={formData.weight}
                      targetWeight={formData.targetWeight}
                      weightUnit={formData.weightUnit}
                      weeksToTarget={weeksToTarget}
                      className="mt-6 mb-6"
                    />
                    
                    <BodyVisualization
                      currentWeight={formData.weight}
                      targetWeight={formData.targetWeight}
                      weightUnit={formData.weightUnit}
                      height={formData.height}
                      heightUnit={formData.heightUnit}
                      className="mt-6"
                    />
                  </>
                )}
              </div>
            )}
            
            {formData.selectedTreatment && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Treatment-Specific Questions</h3>
                {treatmentQuestions[formData.selectedTreatment]?.map((question, index) => {
                  const questionId = `${formData.selectedTreatment}-q${index}`;
                  
                  return (
                    <div key={questionId} className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700">
                        {question.question}
                      </label>
                      
                      {question.type === 'text' && (
                        <input
                          type="text"
                          value={(formData.healthQuestions[questionId] as string) || ''}
                          onChange={(e) => handleHealthQuestionChange(questionId, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      )}
                      
                      {question.type === 'select' && question.options && (
                        <select
                          value={(formData.healthQuestions[questionId] as string) || ''}
                          onChange={(e) => handleHealthQuestionChange(questionId, e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Select an option</option>
                          {question.options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {question.type === 'radio' && question.options && (
                        <div className="space-y-2">
                          {question.options.map((option) => (
                            <label key={option} className="flex items-center space-x-2">
                              <input
                                type="radio"
                                checked={(formData.healthQuestions[questionId] as string) === option}
                                onChange={() => handleHealthQuestionChange(questionId, option)}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span>{option}</span>
                            </label>
                          ))}
                        </div>
                      )}
                      
                      {errors[questionId] && (
                        <p className="text-red-500 text-sm mt-1">{errors[questionId]}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            
            <div className="mt-8 flex justify-between">
              <button
                onClick={prevStep}
                className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
              
              <button
                onClick={nextStep}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Continue
              </button>
            </div>
          </motion.div>
        );
        
      // Other cases remain the same...
    }
  };

  // Rest of the component remains the same...
};

export default IntakeForm;
