'use client';

import React, { useState, useEffect, ChangeEvent, FC } from 'react';
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
      key="s0"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
      <h2 className="step-title">Welcome to JoeyMed</h2>
      <p className="mb-6 text-gray-600">Click below to begin your intake.</p>
      <button onClick={next} className="btn-primary">
        Get Started
      </button>
    </motion.div>
  );

  const StepPersonal: FC = () => (
    <motion.div
      key="s1"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
      <h3 className="step-title">Your details</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="firstName"
          placeholder="First name"
          value={data.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last name"
          value={data.lastName}
          onChange={handleChange}
        />
      </div>
      <input
        className="mt-4"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
      />
      <input
        className="mt-2"
        name="confirmEmail"
        placeholder="Confirm email"
        value={data.confirmEmail}
        onChange={handleChange}
      />
      <input
        className="mt-2"
        name="dob"
        type="date"
        value={data.dob}
        onChange={handleChange}
      />
      <input
        className="mt-2"
        name="phone"
        placeholder="Phone"
        value={data.phone}
        onChange={handleChange}
      />
      {Object.values(errors).length > 0 && (
        <p className="error mt-2">Please fix the highlighted fields.</p>
      )}
      <div className="nav">
        <button
          onClick={back}
          className="btn-outline"
          disabled={step === 0}
        >
          Back
        </button>
        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </motion.div>
  );

  const StepAddress: FC = () => (
    <motion.div
      key="s2"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
      <h3 className="step-title">Address</h3>
      <AddressAutocomplete
        onAddressSelect={(addr: AddressObj) =>
          setData((p) => ({ ...p, ...addr }))
        }
      />
      {errors.address && <p className="error">{errors.address}</p>}
      <div className="nav">
        <button onClick={back} className="btn-outline">
          Back
        </button>
        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </motion.div>
  );

  const StepSelectItem: FC = () => (
    <motion.div
      key="s3"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="card"
    >
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
        <button onClick={back} className="btn-outline">
          Back
        </button>
        <button onClick={next} className="btn-primary">
          Continue
        </button>
      </div>
    </motion.div>

    
