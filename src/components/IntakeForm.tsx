// components/IntakeForm.tsx – simplified to match the new catalog API
'tuse client';

import React, { useEffect, useState, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddressAutocomplete from './AddressAutocomplete';
import TreatmentInfographic from './TreatmentInfographic';
import SquareCheckout from './checkout/SquareCheckout';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import BodyVisualization from './BodyVisualization';

/* ------------------------------------------------------------------
   Types
------------------------------------------------------------------- */
interface CatalogItem {
  id: string;
  name: string;
  price: number; // USD dollars
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  confirmEmail: string;
  dob: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  selectedItem: string;
  // weight‑loss extras (optional)
  height: { feet: number; inches: number };
  weight: number | '';
  targetWeight: number | '';
  // consents
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
   Component
------------------------------------------------------------------- */
const IntakeForm: React.FC = () => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(EMPTY_STATE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loadingItems, setLoadingItems] = useState(true);

  /* ----------------- fetch catalog ------------------------------ */
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/.netlify/functions/catalog');
        const list: CatalogItem[] = await res.json();
        setItems(list);
      } catch (err) {
        console.error('Catalog fetch failed', err);
      } finally {
        setLoadingItems(false);
      }
    })();
  }, []);

  /* ---------------- handlers ------------------------------------ */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const next = () => validateStep() && setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  /* ---------------- per‑step validation ------------------------- */
  const validateStep = (): boolean => {
    const e: Record<string, string> = {};
    switch (step) {
      case 1:
        if (!data.firstName.trim()) e.firstName = 'First name required';
        if (!data.lastName.trim()) e.lastName = 'Last name required';
        if (!/^\S+@\S+\.\S+$/.test(data.email)) e.email = 'Valid email required';
        if (data.email !== data.confirmEmail) e.confirmEmail = 'Emails must match';
        break;
      case 2:
        if (!data.address.trim()) e.address = 'Address required';
        if (data.state !== 'FL') e.state = 'Florida only';
        if (!/^[0-9]{5}(-[0-9]{4})?$/.test(data.zipCode)) e.zipCode = 'ZIP invalid';
        break;
      case 3:
        if (!data.selectedItem) e.selectedItem = 'Please choose';
        break;
      case 4:
        if (!data.privacy || !data.telehealth || !data.hipaa) e.consents = 'All consents required';
        break;
      default:
        break;
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* -------------------- steps ----------------------------------- */
  const StepWelcome = () => (
    <motion.div key="s0" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Welcome to JoeyMed</h3>
      <p className="mb-6 text-gray-600">Click below to start.</p>
      <button onClick={next} className="btn-primary">Get started</button>
    </motion.div>
  );

  const StepPersonal = () => (
    <motion.div key="s1" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Your details</h3>
      <label>First name<input name="firstName" value={data.firstName} onChange={handleChange}/></label>
      {errors.firstName && <p className="error">{errors.firstName}</p>}
      <label>Last name<input name="lastName" value={data.lastName} onChange={handleChange}/></label>
      {errors.lastName && <p className="error">{errors.lastName}</p>}
      <label>Email<input name="email" type="email" value={data.email} onChange={handleChange}/></label>
      {errors.email && <p className="error">{errors.email}</p>}
      <label>Confirm Email<input name="confirmEmail" type="email" value={data.confirmEmail} onChange={handleChange}/></label>
      {errors.confirmEmail && <p className="error">{errors.confirmEmail}</p>}
      <div className="nav"><button onClick={back} className="btn-outline" disabled={step===0}>Back</button><button onClick={next} className="btn-primary">Continue</button></div>
    </motion.div>
  );

  const StepAddress = () => (
    <motion.div key="s2" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Address</h3>
      <AddressAutocomplete onChange={(addr:any)=>setData((p)=>({...p,...addr}))}/>
      {errors.address && <p className="error">{errors.address}</p>}
      <div className="nav"><button onClick={back} className="btn-outline">Back</button><button onClick={next} className="btn-primary">Continue</button></div>
    </motion.div>
  );

  const StepSelectItem = () => (
    <motion.div key="s3" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Choose a treatment</h3>
      {loadingItems ? <p>Loading…</p> : items.map((it)=>(
        <label key={it.id} className={`option ${data.selectedItem===it.id?'selected':''}`}>
          <input type="radio" name="selectedItem" value={it.id} checked={data.selectedItem===it.id} onChange={handleChange}/>
          <span>{it.name} — ${it.price.toFixed(2)}</span>
        </label>
      ))}
      {errors.selectedItem && <p className="error">{errors.selectedItem}</p>}
      {data.selectedItem && <TreatmentInfographic treatmentId={data.selectedItem}/>}  
      <div className="nav"><button onClick={back} className="btn-outline">Back</button><button onClick={next} className="btn-primary">Continue</button></div>
    </motion.div>
  );

  const StepConsents = () => (
    <motion.div key="s4" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <h3 className="step-title">Consents</h3>
      <label className="check"><input type="checkbox" name="privacy" checked={data.privacy} onChange={handleChange}/> Privacy Policy</label>
      <label className="check"><input type="checkbox" name="telehealth" checked={data.telehealth} onChange={handleChange}/> Telehealth Consent</label>
      <label className="check"><input type="checkbox" name="hipaa" checked={data.hipaa} onChange={handleChange}/> HIPAA Authorization</label>
      {errors.consents && <p className="error">{errors.consents}</p>}
      <div className="nav"><button onClick={back} className="btn-outline">Back</button><button onClick={next} className="btn-primary">Review order</button></div>
    </motion.div>
  );

  const StepCheckout = () => (
    <motion.div key="s5" variants={cardVariants} initial="hidden" animate="visible" exit="exit" className="card">
      <SquareCheckout formData={data as any} treatments={items as any} onBack={back}/>
    </motion.div>
  );

  const steps = [StepWelcome, StepPersonal, StepAddress, StepSelectItem, StepConsents, StepCheckout];

  return (
    <div className="intake-form max-w-md mx-auto">
      <AnimatePresence mode="wait">{steps[step]()}</AnimatePresence>
    </div>
  );
};

export default IntakeForm;
