'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QualificationCard from './cards/QualificationCard';
import BasicInfoCard from './cards/BasicInfoCard';
import TreatmentSelectionCard from './cards/TreatmentSelectionCard';
import DynamicQuestionsCard from './cards/DynamicQuestionsCard';
import MedicalInfoCard from './cards/MedicalInfoCard';
import ConsentCard from './cards/ConsentCard';
import DisqualificationCard from './cards/DisqualificationCard';
import ProgressBar from './ui/ProgressBar';
import Logo from './ui/Logo';

export type FormData = {
  // Qualification
  floridaResident: string | null;
  ageVerification: string | null;
  telehealthConsent: string | null;
  
  // Basic Info
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zipCode: string;
  dateOfBirth: string;
  gender: string | null;
  
  // Treatment Selection
  selectedTreatment: string | null;
  
  // Dynamic Questions - Weight Loss
  weightLossPlan: string | null;
  currentWeight: string;
  goalWeight: string;
  weightLossHistory: string[];
  metabolicIssues: string | null;
  
  // Dynamic Questions - Erectile Dysfunction
  edProduct: string | null;
  symptomDuration: string | null;
  cardiovascularHistory: string | null;
  nitratesUse: string | null;
  medicationPreference: string | null;
  
  // Dynamic Questions - Sexual Health
  shProduct: string | null;
  libidoIssues: string | null;
  hormonalTherapy: string | null;
  menopauseStatus: string | null;
  nasalSensitivity: string | null;
  
  // Dynamic Questions - Anti-Aging
  aaProduct: string | null;
  energyLevel: string | null;
  moodLevel: string | null;
  sleepQuality: string | null;
  hormoneTherapyHistory: string | null;
  injectionTolerance: string | null;
  
  // Dynamic Questions - Travel Kit
  travelDestination: string;
  travelStartDate: string;
  travelEndDate: string;
  travelHealthConcerns: string;
  travelMeds: string[];
  
  // Medical Info
  allergies: string;
  labWork: string | null;
  currentMedications: string;
  preExistingConditions: string;
  pregnantNursing: string | null;
  
  // Consent
  termsConsent: boolean;
  medicalConsent: boolean;
  
  // Selected Products
  selectedProducts: Array<{id: string, name: string, price: number}>;
  upsellProducts: Array<{id: string, name: string, price: number}>;
};

const initialFormData: FormData = {
  // Qualification
  floridaResident: null,
  ageVerification: null,
  telehealthConsent: null,
  
  // Basic Info
  fullName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  zipCode: '',
  dateOfBirth: '',
  gender: null,
  
  // Treatment Selection
  selectedTreatment: null,
  
  // Dynamic Questions - Weight Loss
  weightLossPlan: null,
  currentWeight: '',
  goalWeight: '',
  weightLossHistory: [],
  metabolicIssues: null,
  
  // Dynamic Questions - Erectile Dysfunction
  edProduct: null,
  symptomDuration: null,
  cardiovascularHistory: null,
  nitratesUse: null,
  medicationPreference: null,
  
  // Dynamic Questions - Sexual Health
  shProduct: null,
  libidoIssues: null,
  hormonalTherapy: null,
  menopauseStatus: null,
  nasalSensitivity: null,
  
  // Dynamic Questions - Anti-Aging
  aaProduct: null,
  energyLevel: null,
  moodLevel: null,
  sleepQuality: null,
  hormoneTherapyHistory: null,
  injectionTolerance: null,
  
  // Dynamic Questions - Travel Kit
  travelDestination: '',
  travelStartDate: '',
  travelEndDate: '',
  travelHealthConcerns: '',
  travelMeds: [],
  
  // Medical Info
  allergies: '',
  labWork: null,
  currentMedications: '',
  preExistingConditions: '',
  pregnantNursing: null,
  
  // Consent
  termsConsent: false,
  medicalConsent: false,
  
  // Selected Products
  selectedProducts: [],
  upsellProducts: []
};

const IntakeForm = () => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [currentStep, setCurrentStep] = useState(1);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [disqualificationReason, setDisqualificationReason] = useState('');
  const [totalSteps, setTotalSteps] = useState(7);
  
  // Update form data
  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };
  
  // Handle disqualification
  const handleDisqualification = (reason: string) => {
    setIsDisqualified(true);
    setDisqualificationReason(reason);
  };
  
  // Handle next step
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  // Handle previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Handle form submission
  const handleSubmit = () => {
    // Prepare data for Square checkout
    const products = [...formData.selectedProducts];
    
    // Add selected upsell products
    if (formData.upsellProducts.length > 0) {
      products.push(...formData.upsellProducts);
    }
    
    // Create Square checkout URL with products
    const squareCheckoutUrl = createSquareCheckoutUrl(products);
    
    // Redirect to Square checkout
    window.location.href = squareCheckoutUrl;
  };
  
  // Create Square checkout URL
  const createSquareCheckoutUrl = (products: Array<{id: string, name: string, price: number}>) => {
    // This is a placeholder - in a real implementation, you would construct the proper Square checkout URL
    // with all the selected products and their IDs
    const baseUrl = 'https://joey-med.square.site/checkout/';
    
    // For demo purposes, we'll just append product IDs
    const productIds = products.map(p => p.id).join(',');
    return `${baseUrl}?products=${productIds}`;
  };
  
  // Determine which card to show based on current step and selected treatment
  const renderCurrentCard = () => {
    if (isDisqualified) {
      return (
        <DisqualificationCard 
          reason={disqualificationReason} 
        />
      );
    }
    
    switch (currentStep) {
      case 1:
        return (
          <QualificationCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNextStep} 
            onDisqualify={handleDisqualification} 
          />
        );
      case 2:
        return (
          <BasicInfoCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
            onDisqualify={handleDisqualification} 
          />
        );
      case 3:
        return (
          <TreatmentSelectionCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
          />
        );
      case 4:
        return (
          <DynamicQuestionsCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
          />
        );
      case 5:
        return (
          <MedicalInfoCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNextStep} 
            onPrev={handlePrevStep} 
          />
        );
      case 6:
        return (
          <ConsentCard 
            formData={formData} 
            updateFormData={updateFormData} 
            onSubmit={handleSubmit} 
            onPrev={handlePrevStep} 
          />
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="w-full min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-50 px-4 py-3 flex justify-between items-center">
        <Logo />
        <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
      </header>
      
      <div className="pt-20 pb-10 px-4 flex items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl"
          >
            {renderCurrentCard()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default IntakeForm;
