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

/* ------------------------------------------------------------------
   1. Types
------------------------------------------------------------------- */
interface Treatment {
  id: string;
  name: string;
  price: number;
}

/* ------------------------------------------------------------------
   2. Component
------------------------------------------------------------------- */
const IntakeForm: React.FC = () => {
  /* ------------------ 2.1  State  -------------------------------- */
  const [step, setStep] = useState<number>(1);

  /** mock data; wire up real data + validation as needed */
  const treatments: Treatment[] = [
    { id: 'weight-loss', name: 'Weight-Loss Program', price: 299 },
    { id: 'ed',          name: 'ED Treatment',        price: 159 },
  ];

  const [formData, setFormData] = useState<any>({
    fullName: '',
    email: '',
    selectedTreatment: '',
    bmi: undefined,
    weight: undefined,
    targetWeight: undefined,
    weightUnit: 'lb',
    height: undefined,
    heightUnit: 'in',
    healthQuestions: {},
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const weeksToTarget = 12; // stub; compute based on dates

  /* ------------------ 2.2  Helpers  ----------------------------- */
  const cardVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const prevStep = () => setStep((s) => Math.max(1, s - 1));
  const nextStep = () => setStep((s) => s + 1);

  const handleBMICalculated = (bmi: number) =>
    setFormData({ ...formData, bmi });

  const handleHealthQuestionChange = (id: string, value: string) =>
    setFormData({
      ...formData,
      healthQuestions: { ...formData.healthQuestions, [id]: value },
    });

  /** placeholder questions */
  const treatmentQuestions: Record<
    string,
    { question: string; type: 'text' | 'select' | 'radio'; options?: string[] }[]
  > = {
    'weight-loss': [
      { question: 'When did you last have lab work done?', type: 'select', options: ['<6 months', '6–12 months', '>12 months'] },
    ],
    ed: [
      { question: 'Do you take nitrates?', type: 'radio', options: ['Yes', 'No'] },
    ],
  };

  /* ------------------ 2.3  Step renderer  ----------------------- */
  const renderStep = () => {
    switch (step) {
      /* ------------------ Step 1 ------------------ */
      case 1:
        return (
          <motion.div
            key="step1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Welcome to JoeyMed</h2>
            <p className="text-gray-700 mb-6">
              Please click below to begin your intake form.
            </p>
            <div className="flex justify-end">
              <button
                onClick={nextStep}
                className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Get Started
              </button>
            </div>
          </motion.div>
        );

      /* ------------------ Step 2 ------------------ */
      case 2:
        return (
          <motion.div
            key="step2"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-4">Tell Us About You</h2>
            <div className="space-y-4">
              <label className="block">
                <span className="text-gray-700">Full Name</span>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
              <label className="block">
                <span className="text-gray-700">Email Address</span>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </label>
            </div>
            <div className="mt-6 flex justify-between">
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

      /* ------------------ Step 3 ------------------ */
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
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Select Treatment
            </h2>

            <div className="space-y-4">
              {treatments.map((t) => (
                <label
                  key={t.id}
                  className={`block p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.selectedTreatment === t.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-blue-300'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        name="selectedTreatment"
                        value={t.id}
                        checked={formData.selectedTreatment === t.id}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <span className="ml-2 text-gray-900 font-medium">
                        {t.name}
                      </span>
                    </div>
                    <span className="text-blue-600 font-semibold">
                      ${t.price.toFixed(2)}
                    </span>
                  </div>
                </label>
              ))}
              {errors.selectedTreatment && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.selectedTreatment}
                </p>
              )}
            </div>

            {formData.selectedTreatment && (
              <div className="mt-6">
                <TreatmentInfographic
                  treatmentId={formData.selectedTreatment}
                />
              </div>
            )}

            <div className="mt-8">
              <TrustpilotReviews businessId="joeymed.com" className="mb-6" />
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

      /* ------------------ Step 4 ------------------ */
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
            <h2 className="text-2xl font-bold text-blue-600 mb-6">
              Health Information
            </h2>

            {formData.selectedTreatment === 'weight-loss' && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  BMI Calculator
                </h3>
                <BMICalculator
                  onBMICalculated={handleBMICalculated}
                  className="mb-6"
                />

                {formData.bmi &&
                  formData.weight &&
                  formData.targetWeight &&
                  weeksToTarget && (
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
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Treatment-Specific Questions
                </h3>
                {treatmentQuestions[formData.selectedTreatment]?.map(
                  (q, i) => {
                    const qid = `${formData.selectedTreatment}-q${i}`;
                    return (
                      <div key={qid} className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                          {q.question}
                        </label>

                        {q.type === 'text' && (
                          <input
                            type="text"
                            value={formData.healthQuestions[qid] || ''}
                            onChange={(e) =>
                              handleHealthQuestionChange(qid, e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        )}

                        {q.type === 'select' && q.options && (
                          <select
                            value={formData.healthQuestions[qid] || ''}
                            onChange={(e) =>
                              handleHealthQuestionChange(qid, e.target.value)
                            }
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select an option</option>
                            {q.options.map((opt) => (
                              <option key={opt}>{opt}</option>
                            ))}
                          </select>
                        )}

                        {q.type === 'radio' && q.options && (
                          <div className="space-y-2">
                            {q.options.map((opt) => (
                              <label
                                key={opt}
                                className="flex items-center space-x-2"
                              >
                                <input
                                  type="radio"
                                  checked={formData.healthQuestions[qid] === opt}
                                  onChange={() =>
                                    handleHealthQuestionChange(qid, opt)
                                  }
                                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                />
                                <span>{opt}</span>
                              </label>
                            ))}
                          </div>
                        )}

                        {errors[qid] && (
                          <p className="text-red-500 text-sm mt-1">
                            {errors[qid]}
                          </p>
                        )}
                      </div>
                    );
                  }
                )}
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

      /* ------------------ Default ----------------- */
      default:
        return null;
    }
  };

  /* ------------------------------------------------------------------
     2.4  Render
  ------------------------------------------------------------------ */
  return <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>;
};

export default IntakeForm;
