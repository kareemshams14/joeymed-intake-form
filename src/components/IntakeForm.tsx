'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AddressAutocomplete from './AddressAutocomplete';
import TreatmentInfographic from './TreatmentInfographic';
import TrustpilotReviews from './TrustpilotReviews';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import BodyVisualization from './BodyVisualization';
import SquareCheckout from './checkout/SquareCheckout';

/* ------------------------------------------------------------------
   Types & Constants
------------------------------------------------------------------- */
interface Treatment {
  id: string;
  name: string;
  price: number;
}

interface FormState {
  /* personal */
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  dob: string; // ISO date
  phone: string;
  /* address */
  address: string;
  city: string;
  state: string;
  zipCode: string;
  /* choices */
  selectedTreatment: string;
  selectedPackage: string;
  /* weight‑loss extras */
  height: { feet: number; inches: number };
  weight: number | '';
  targetWeight: number | '';
  /* consents */
  privacy: boolean;
  telehealth: boolean;
  hipaa: boolean;
}

const TREATMENTS: Treatment[] = [
  { id: 'weight-loss', name: 'Weight‑Loss Program', price: 299 },
  { id: 'ed', name: 'ED Treatment', price: 159 },
  { id: 'sexual-health', name: 'Sexual Health', price: 179 },
  { id: 'longevity', name: 'Longevity', price: 299 },
];

const EMPTY_STATE: FormState = {
  /* personal */
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  dob: '',
  phone: '',
  /* address */
  address: '',
  city: '',
  state: 'FL',
  zipCode: '',
  /* selections */
  selectedTreatment: '',
  selectedPackage: '',
  /* weight loss */
  height: { feet: 5, inches: 8 },
  weight: '',
  targetWeight: '',
  /* consents */
  privacy: false,
  telehealth: false,
  hipaa: false,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

/* ------------------------------------------------------------------
   Component
------------------------------------------------------------------- */
const IntakeForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  /* ---------------- handlers ----------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const next = () => validateStep() && setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  /* ------------- validation per step --------- */
  const validateStep = (): boolean => {
    const e: Record<string, string> = {};

    switch (step) {
      case 1: {
        if (!data.firstName.trim()) e.firstName = 'First name required';
        if (!data.lastName.trim()) e.lastName = 'Last name required';
        if (!data.email.trim()) e.email = 'Email required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Invalid email';
        if (data.email !== data.confirmEmail) e.confirmEmail = 'Emails must match';
        if (!data.dob) e.dob = 'Date of birth required';
        if (!data.phone.trim()) e.phone = 'Phone required';
        break;
      }
      case 2: {
        if (!data.address.trim()) e.address = 'Address required';
        if (!data.city.trim()) e.city = 'City required';
        if (data.state !== 'FL') e.state = 'Florida residents only';
        if (!/^\d{5}(-\d{4})?$/.test(data.zipCode)) e.zipCode = 'ZIP invalid';
        break;
      }
      case 3: {
        if (!data.selectedTreatment) e.selectedTreatment = 'Pick a treatment';
        break;
      }
      case 4: {
        if (data.selectedTreatment === 'weight-loss') {
          if (!data.weight) e.weight = 'Current weight required';
          if (!data.targetWeight) e.targetWeight = 'Target weight required';
        }
        break;
      }
      case 5: {
        if (!data.privacy || !data.telehealth || !data.hipaa) e.consents = 'All consents required';
        break;
      }
      default:
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ==== helpers for weight‑loss projection ==== */
  const weeksToTarget = () => {
    if (!data.weight || !data.targetWeight) return 0;
    const lbsToLose = Number(data.weight) - Number(data.targetWeight);
    if (lbsToLose <= 0) return 0;
    return Math.ceil(lbsToLose / 1.5); // avg 1‑2 lb → use 1.5 lb/wk
  };

  /* ------------- step renderers -------------- */
  const StepWelcome = () => (
    <motion.div key="s0" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h2 className="text-2xl font-semibold mb-4 text-center">Welcome to JoeyMed</h2>
      <p className="text-center mb-6">Click below to begin your intake.</p>
      <div className="text-center">
        <button onClick={next} className="btn-primary">Get Started</button>
      </div>
    </motion.div>
  );

  const StepPersonal = () => (
    <motion.div key="s1" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Tell us about you</h3>
      <div className="form-grid">
        <div>
          <label>First name</label>
          <input name="firstName" value={data.firstName} onChange={handleChange} />
          {errors.firstName && <p className="error">{errors.firstName}</p>}
        </div>
        <div>
          <label>Last name</label>
          <input name="lastName" value={data.lastName} onChange={handleChange} />
          {errors.lastName && <p className="error">{errors.lastName}</p>}
        </div>
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" name="email" value={data.email} onChange={handleChange} />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-group">
        <label>Confirm email</label>
        <input type="email" name="confirmEmail" value={data.confirmEmail} onChange={handleChange} />
        {errors.confirmEmail && <p className="error">{errors.confirmEmail}</p>}
      </div>
      <div className="form-group">
        <label>Date of birth</label>
        <input type="date" name="dob" value={data.dob} onChange={handleChange} />
        {errors.dob && <p className="error">{errors.dob}</p>}
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input name="phone" value={data.phone} onChange={handleChange} />
        {errors.phone && <p className="error">{errors.phone}</p>}
      </div>
      <div className="nav">
        <button onClick={back} className="btn-outline">Back</button>
        <button onClick={next} className="btn-primary">Continue</button>
      </div>
    </motion.div>
  );

  const StepAddress = () => (
    <motion.div key="s2" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Your address (Florida only)</h3>
      <div className="form-group">
        <label>Street address</label>
        <AddressAutocomplete
          initialAddress={data.address}
          onAddressSelect={(addr) =>
            setData((prev) => ({
              ...prev,
              address: addr.street,
              city: addr.city,
              state: addr.state,
              zipCode: addr.zipCode,
            }))
          }
        />
        {errors.address && <p className="error">{errors.address}</p>}
      </div>
      <div className="form-grid">
        <div>
          <label>City</label>
          <input name="city" value={data.city} onChange={handleChange} />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>
        <div>
          <label>State</label>
          <select name="state" value={data.state} onChange={handleChange}>
            <option value="FL">Florida</option>
          </select>
          {errors.state && <p className="error">{errors.state}</p>}
        </div>
      </div>
      <div className="form-group">
        <label>ZIP code</label>
        <input name="zipCode" value={data.zipCode} onChange={handleChange} />
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}
      </div>
      <div className="nav">
        <button onClick={back} className="btn-outline">Back</button>
        <button onClick={next} className="btn-primary">Continue</button>
      </div>
    </motion.div>
  );

  const StepTreatment = () => (
    <motion.div key="s3" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Select treatment</h3>
      {TREATMENTS.map((t) => (
        <label key={t.id} className={`option ${data.selectedTreatment === t.id ? 'selected' : ''}`}>
          <input type="radio" name="selectedTreatment" value={t.id} checked={data.selectedTreatment === t.id} onChange={handleChange} />
          <span>{t.name} — ${t.price}</span>
        </label>
      ))}
      {errors.selectedTreatment && <p className="error">{errors.selectedTreatment}</p>}
      {data.selectedTreatment && <TreatmentInfographic treatmentId={data.selectedTreatment} />}
      <div className="nav">
        <button onClick={back} className="btn-outline">Back</button>
        <button onClick={next} className="btn-primary">Continue</button>
      </div>
    </motion.div>
  );

  const StepWeightLoss = () => (
    <motion.div key="s4" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Your weight details</h3>
      <BMICalculator
        height={data.height}
        weight={data.weight as number | ''}
        onHeightChange={(h) => setData((prev) => ({ ...prev, height: h }))}
        onWeightChange={(w) => setData((prev) => ({ ...prev, weight: w }))}
      />
      <div className="form-group mt-4">
        <label>Target weight (lbs)</label>
        <input type="number" name="targetWeight" value={data.targetWeight} onChange={handleChange} />
        {errors.targetWeight && <p className="error">{errors.targetWeight}</p>}
      </div>
      {data.weight && data.targetWeight && (
        <>
          <WeightLossGraph currentWeight={Number(data.weight)} targetWeight={Number(data.targetWeight)} weeks={weeksToTarget()} />
          <BodyVisualization height={data.height} currentWeight={Number(data.weight)} targetWeight={Number(data.targetWeight)} />
        </>
      )}
      <div className="nav">
        <button onClick={back} className="btn-outline">Back</button>
        <button onClick={next} className="btn-primary">Continue</button>
      </div>
    </motion.div>
  );

  const StepConsents = () => (
    <motion.div key="s5" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Consents</h3>
      <label className="check"><input type="checkbox" name="privacy" checked={data.privacy} onChange={handleChange} /> I agree to the Privacy Policy</label>
      <label className="check"><input type="checkbox" name="telehealth" checked={data.telehealth} onChange={handleChange} /> I agree to the Telehealth Consent</label>
      <label className="check"><input type="checkbox" name="hipaa" checked={data.hipaa} onChange={handleChange} /> I agree to the HIPAA Authorization</label>
      {errors.consents && <p className="error">{errors.consents}</p>}
      <div className="nav">
        <button onClick={back} className="btn-outline">Back</button>
        <button onClick={next} className="btn-primary">Review Order</button>
      </div>
    </motion.div>
  );

  const StepCheckout = () => (
    <motion.div key="s6" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <SquareCheckout formData={data as any} treatments={TREATMENTS} onBack={back} />
    </motion.div>
  );

  /* ------------------ assemble steps ------------------ */
  const steps = [StepWelcome, StepPersonal, StepAddress, StepTreatment];
  if (data.selectedTreatment === 'weight-loss') steps.push(StepWeightLoss);
  steps.push(StepConsents, StepCheckout);

  return (
    <div className="intake-form">
      <AnimatePresence mode="wait">{steps[step]()}</AnimatePresence>
    </div>
  );
};

export default IntakeForm;

/* ------------------------------------------------------------------
   Minimal Tailwind‑like utility classes (global CSS stubs)
------------------------------------------------------------------- */
