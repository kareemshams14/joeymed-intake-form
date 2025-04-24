'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import AddressAutocomplete from './AddressAutocomplete';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import TreatmentInfographic from './TreatmentInfographic';
import TrustpilotReviews from './TrustpilotReviews';
import BodyVisualization from './BodyVisualization';
import SquareCheckout from './checkout/SquareCheckout';

/* ------------------------------------------------------------------
 * 1 ▏ Shared Types
 * -----------------------------------------------------------------*/
interface Height {
  feet: number;
  inches: number;
}

interface TreatmentPackage {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

interface Treatment {
  id: string;
  name: string;
  price: number;
  description: string;
  packages: TreatmentPackage[];
  healthQuestions: { id: string; text: string }[];
  stats: { value: string; label: string }[];
  benefits: string[];
}

/* ------------------------------------------------------------------
 * 2 ▏ Framer‑Motion Variants
 * -----------------------------------------------------------------*/
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

/* ------------------------------------------------------------------
 * 3 ▏ Main Component
 * -----------------------------------------------------------------*/
const IntakeForm: React.FC = () => {
  /* ---------------------------- 3.1 State ---------------------------*/
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    confirmEmail: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    selectedTreatment: '',
    selectedPackage: '',
    healthIssues: [] as string[],
    allergies: '',
    medications: '',
    height: { feet: 5, inches: 8 } as Height,
    weight: 160,
    targetWeight: 140,
    privacyConsent: false,
    telehealthConsent: false,
    hipaaConsent: false,
    marketingOptIn: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ------------------------- 3.2  Treatments ------------------------*/
  const treatments: Treatment[] = [/* ...same array as before ...*/];

  /* ------------------------- 3.3  Handlers --------------------------*/
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectTreatment = (treatmentId: string) =>
    setFormData((prev) => ({ ...prev, selectedTreatment: treatmentId, selectedPackage: '' }));

  const selectPackage = (packageId: string) =>
    setFormData((prev) => ({ ...prev, selectedPackage: packageId }));

  const toggleHealthIssue = (issueId: string) =>
    setFormData((prev) => {
      const list = new Set(prev.healthIssues);
      list.has(issueId) ? list.delete(issueId) : list.add(issueId);
      return { ...prev, healthIssues: Array.from(list) };
    });

  const selectNoneHealthIssue = () =>
    setFormData((prev) => ({ ...prev, healthIssues: ['none'] }));

  /* ------------------------- 3.4  Helpers ---------------------------*/
  const isFloridaResident = formData.state === 'FL';

  const isOver18 = (): boolean => {
    if (!formData.dob) return false;
    const b = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - b.getFullYear();
    const m = today.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < b.getDate())) age--;
    return age >= 18;
  };

  const getSelectedTreatment = (): Treatment | undefined =>
    treatments.find((t) => t.id === formData.selectedTreatment);

  const getSelectedPackage = (): TreatmentPackage | undefined =>
    getSelectedTreatment()?.packages.find((p) => p.id === formData.selectedPackage);

  /* ------------------------- 3.5  Validation ------------------------*/
  const validateStep = (): boolean => {
    const newErrors: Record<string, string> = {};
    // (same validation logic – unchanged for brevity)
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /* ------------------------- 3.6  Navigation ------------------------*/
  const nextStep = () => {
    if (validateStep()) {
      setStep((s) => s + 1);
      window.scrollTo({ top: 0 });
    }
  };

  const prevStep = () => {
    setStep((s) => s - 1);
    window.scrollTo({ top: 0 });
  };

  /* ---------------------- 3.7  Disqualification --------------------*/
  useEffect(() => {
    if (step > 2 && (!isFloridaResident || !isOver18())) setStep(10);
  }, [step, isFloridaResident]);

  /* ------------------------- 3.8  JSX -------------------------------*/
  // --- renderProgress, renderForm, renderDisqualification ---
  // (identical to the version you provided; omitted here for brevity)

  return (
    <div className="intake-form-container">
      {step < 10 && /* renderProgress() */ null}
      <AnimatePresence mode="wait">
        {/* renderDisqualification / renderForm here */}
      </AnimatePresence>
    </div>
  );
};

export default IntakeForm;
