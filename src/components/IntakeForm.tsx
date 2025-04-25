'use client';

import React, { useState, useEffect, ChangeEvent, FC, KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import AddressAutocomplete from './AddressAutocomplete';
import TreatmentInfographic from './TreatmentInfographic';
import TrustpilotReviews from './TrustpilotReviews';
import SquareCheckout from './checkout/SquareCheckout';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import BodyVisualization from './BodyVisualization';

/* ------------------------------------------------------------------
 * Types & helpers
 * ---------------------------------------------------------------- */
export interface CatalogItem {
  id: string;
  name: string;
  price: number; // USD dollars already
}

interface AddressObj {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

interface FormState {
  /* personal */
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  dob: string;
  phone: string;
  /* address */
  address: string;
  city: string;
  state: string;
  zipCode: string;
  /* selections */
  selectedItem: string;
  addOns: string[];
  /* weight‑loss extras */
  height: { feet: number; inches: number };
  weight: number | '';
  targetWeight: number | '';
  /* consents */
  privacy: boolean;
  telehealth: boolean;
  hipaa: boolean;
}

const EMPTY_STATE: FormState = {
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
  selectedItem: '',
  addOns: [],
  height: { feet: 5, inches: 8 },
  weight: '',
  targetWeight: '',
  privacy: false,
  telehealth: false,
  hipaa: false,
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

// single source of truth for input style so text is dark & visible on gradient bg
const inputClass =
  'w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500';
const btnPrimary =
  'btn-primary px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50';
const btnOutline =
  'btn-outline px-5 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50';

/* ------------------------------------------------------------------
 * Component
 * ---------------------------------------------------------------- */
const IntakeForm: FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  /* ---------------- fetch catalog ---------------- */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/.netlify/functions/catalog');
        const json: CatalogItem[] = await res.json();
        setItems(json);
      } catch (e) {
        console.error('catalog error', e);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, []);

  /* -------------- handlers ---------------------- */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setData((p) => ({ ...p, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleKeyNav = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.currentTarget.form;
      if (!form) return;
      const index = Array.prototype.indexOf.call(form, e.currentTarget);
      (form.elements[index + 1] as HTMLElement)?.focus();
    }
  };

  const next = () => validateStep() && setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  /* -------------- validation -------------------- */
  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!data.firstName.trim()) e.firstName = 'Required';
        if (!data.lastName.trim()) e.lastName = 'Required';
        if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Email invalid';
        if (data.email !== data.confirmEmail) e.confirmEmail = 'Must match';
        if (!data.dob) e.dob = 'Required';
        if (!data.phone.trim()) e.phone = 'Required';
        break;
      case 2:
        if (!data.address.trim()) e.address = 'Required';
        if (!data.city.trim()) e.city = 'Required';
        if (data.state !== 'FL') e.state = 'FL only';
        if (!/^\d{5}(-\d{4})?$/.test(data.zipCode)) e.zipCode = 'ZIP invalid';
        break;
      case 3:
        if (!data.selectedItem) e.selectedItem = 'Pick one';
        break;
      case 5:
        if (!data.privacy || !data.telehealth || !data.hipaa)
          e.consents = 'Required';
        break;
      default:
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ------------------- Steps -------------------- */
  const StepWelcome: FC = () => (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card text-center"
    >
      {/* JoeyMed logo */}
      <img
        src="https://www.joeymed.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.7dd72441.png&w=1080&q=100"
        alt="JoeyMed logo"
        className="mx-auto mb-4 h-14 w-auto"
      />
      <h2 className="step-title text-2xl font-semibold mb-2 text-gray-900">
        Welcome to Joey&nbsp;Med
      </h2>
      <p className="mb-6 text-gray-600">Click below to begin your intake.</p>
      <button onClick={next} className={btnPrimary}>
        Get Started
      </button>
    </motion.div>
  );

  const StepPersonal: FC = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Your details</h3>
      <form>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="firstName"
            placeholder="First name"
            value={data.firstName}
            onChange={handleChange}
            onKeyDown={handleKeyNav}
            className={inputClass}
            
          />
          <input
            name="lastName"
            placeholder="Last name"
            value={data.lastName}
            onChange={handleChange}
            onKeyDown={handleKeyNav}
            className={inputClass}
          />
        </div>
        <input
          className={`${inputClass} mt-4`}
          name="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          onKeyDown={handleKeyNav}
        />
        <input
          className={`${inputClass} mt-2`}
          name="confirmEmail"
          placeholder="Confirm email"
          value={data.confirmEmail}
          onChange={handleChange}
          onKeyDown={handleKeyNav}
        />
        <input
          className={`${inputClass} mt-2`}
          name="dob"
          type="date"
          value={data.dob}
          onChange={handleChange}
          onKeyDown={handleKeyNav}
        />
        <input
          className={`${inputClass} mt-2`}
          name="phone"
          placeholder="Phone"
          value={data.phone}
          onChange={handleChange}
          onKeyDown={handleKeyNav}
        />
      </form>
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      {/* show one generic error */}
      {Object.values(errors).length > 0 && (
        <p className="error mt-2">Please fix the highlighted fields.</p>
      )}
      <div className="nav mt-4">
        <button onClick={back} className={btnOutline} disabled={step === 0}>
          Back
        </button>
        <button onClick={next} className={btnPrimary}>
          Continue
        </button>
      </div>
    </motion.div>
  );

  const StepAddress: FC = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Address</h3>
      <AddressAutocomplete
        onAddressSelect={(addr: AddressObj) => setData((p) => ({ ...p, ...addr }))}
      />
      {errors.address && <p className="error">{errors.address}</p>}
      <div className="nav">
        <button onClick={back} className={btnOutline}>
          Back
        </button>
        <button onClick={next} className={btnPrimary}>
          Continue
        </button>
      </div>
    </motion.div>
  );

  const StepSelectItem: FC = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Choose a treatment</h3>
      {loadingItems ? (
        <p>Loading…</p>
      ) : (
        items.map((it) => (
          <label key={it.id} className={`option ${data.selectedItem === it.id ? 'selected' : ''}`}>
            <input
              type="radio"
              name="selectedItem"
              value={it.id}
              checked={data.selectedItem === it.id}
              onChange={handleChange}
            />
            <span>
              {it.name} — ${it.price.toFixed(2)}
            </span>
          </label>
        ))
      )}
      {errors.selectedItem && <p className="error">{errors.selectedItem}</p>}
      {data.selectedItem && (
        <TreatmentInfographic
          treatmentId={data.selectedItem as any}
          stats={[]}
          benefits={[]}
        />
      )}
      <TrustpilotReviews />
      <div className="nav">
        <button onClick={back} className={btnOutline}>
          Back
        </button>
        <button onClick={next} className={btnPrimary}>
          Continue
        </button>
      </div>
    </motion.div>
  );

  const StepConsents: FC = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Consents</h3>
      <label className="check">
        <input type="checkbox" name="privacy" checked={data.privacy} onChange={handleChange} /> I agree to the
        Privacy Policy
      </label>
      <label className="check">
        <input type="checkbox" name="telehealth" checked={data.telehealth} onChange={handleChange} /> I agree to the
        Telehealth Consent
      </label>
      <label className="check">
        <input type="checkbox" name="hipaa" checked={data.hipaa} onChange={handleChange} /> I agree to the HIPAA
        Authorization
      </label>
      {errors.consents && <p className="error">{errors.consents}</p>}
      <div className="nav">
        <button onClick={back} className={btnOutline}>
          Back
        </button>
        <button onClick={next} className={btnPrimary}>
          Review Order
        </button>
      </div>
    </motion.div>
  );

  const StepCheckout: FC = () => (
    <motion.div variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <SquareCheckout formData={data as any} treatments={items as any} onBack={back} />
    </motion.div>
  );

  /* ordered steps list */
  const steps: FC[] = [StepWelcome, StepPersonal, StepAddress, StepSelectItem, StepConsents, StepCheckout];

  const CurrentStep = steps[step] ?? steps[0];

  return (
    <div className="intake-form-container flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <AnimatePresence mode="wait">
        <CurrentStep key={step} />
      </AnimatePresence>
    </div>
  );
};

export default IntakeForm;
