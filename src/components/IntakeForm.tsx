import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AddressAutocomplete from './AddressAutocomplete';
import BMICalculator from './BMICalculator';
import WeightLossGraph from './WeightLossGraph';
import TreatmentInfographic from './TreatmentInfographic';
import TrustpilotReviews from './TrustpilotReviews';
import BodyVisualization from './BodyVisualization';
import SquareCheckout from './checkout/SquareCheckout';

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
};

const IntakeForm = () => {
  // Form state
  const [step, setStep] = useState(0);
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
    healthIssues: [],
    allergies: [],
    medications: [],
    height: { feet: 5, inches: 8 },
    weight: 160,
    targetWeight: 140,
    privacyConsent: false,
    telehealthConsent: false,
    hipaaConsent: false,
    marketingOptIn: false
  });

  // Treatment data
  const treatments = [
    {
      id: 'weight-loss',
      name: 'Weight Loss Program',
      price: 299.00,
      description: 'Our medically supervised weight loss program helps you achieve sustainable results through personalized treatment plans.',
      packages: [
        {
          id: 'weight-loss-basic',
          name: 'Basic Plan',
          price: 299.00,
          description: 'Essential weight loss medication with basic support',
          features: [
            'FDA-approved weight loss medication',
            'Initial medical consultation',
            'Basic nutritional guidance',
            '30-day supply'
          ]
        },
        {
          id: 'weight-loss-plus',
          name: 'Plus Plan',
          price: 399.00,
          description: 'Enhanced weight loss program with additional support',
          features: [
            'FDA-approved weight loss medication',
            'Initial and follow-up consultations',
            'Comprehensive nutritional guidance',
            'Weekly check-ins',
            '30-day supply with refill option'
          ]
        },
        {
          id: 'weight-loss-premium',
          name: 'Premium Plan',
          price: 499.00,
          description: 'Complete weight loss solution with maximum support',
          features: [
            'FDA-approved weight loss medication',
            'Unlimited medical consultations',
            'Personalized meal planning',
            'Daily check-ins and support',
            '30-day supply with automatic refills',
            'Body composition analysis'
          ]
        }
      ],
      healthQuestions: [
        { id: 'diabetes', text: 'Diabetes' },
        { id: 'hypertension', text: 'High Blood Pressure' },
        { id: 'heart-disease', text: 'Heart Disease' },
        { id: 'thyroid', text: 'Thyroid Issues' },
        { id: 'kidney', text: 'Kidney Problems' }
      ],
      stats: [
        { value: '95%', label: 'of patients see results within 4 weeks' },
        { value: '30+', label: 'pounds average weight loss in 6 months' },
        { value: '85%', label: 'report improved energy levels' }
      ],
      benefits: [
        'Personalized medication and dosing',
        'Medical supervision throughout your journey',
        'Nutritional guidance and support',
        'Regular check-ins with healthcare providers'
      ]
    },
    {
      id: 'ed-treatment',
      name: 'ED Treatment',
      price: 159.00,
      description: 'Effective treatment for erectile dysfunction with FDA-approved medications and ongoing support.',
      packages: [
        {
          id: 'ed-basic',
          name: 'Basic ED Treatment',
          price: 159.00,
          description: 'Essential ED medication for occasional use',
          features: [
            'FDA-approved ED medication',
            'Initial medical consultation',
            '8 doses per month'
          ]
        },
        {
          id: 'ed-plus',
          name: 'Plus ED Treatment',
          price: 199.00,
          description: 'Enhanced ED treatment with more doses',
          features: [
            'FDA-approved ED medication',
            'Initial and follow-up consultations',
            '12 doses per month',
            'Access to medical support'
          ]
        },
        {
          id: 'ed-premium',
          name: 'Premium ED Treatment',
          price: 249.00,
          description: 'Complete ED solution with maximum support',
          features: [
            'FDA-approved ED medication',
            'Unlimited medical consultations',
            '16 doses per month',
            '24/7 access to medical support',
            'Performance supplements included'
          ]
        }
      ],
      healthQuestions: [
        { id: 'heart-disease', text: 'Heart Disease' },
        { id: 'hypertension', text: 'High Blood Pressure' },
        { id: 'diabetes', text: 'Diabetes' },
        { id: 'stroke', text: 'Previous Stroke' },
        { id: 'nitrates', text: 'Taking Nitrate Medications' }
      ],
      stats: [
        { value: '90%', label: 'success rate with our treatments' },
        { value: '30min', label: 'average time to effectiveness' },
        { value: '92%', label: 'patient satisfaction rate' }
      ],
      benefits: [
        'Discreet packaging and delivery',
        'FDA-approved medications',
        'Ongoing medical support',
        'Personalized dosing recommendations'
      ]
    },
    {
      id: 'sexual-health',
      name: 'Sexual Health',
      price: 179.00,
      description: 'Comprehensive sexual health treatments for improved performance, libido, and satisfaction.',
      packages: [
        {
          id: 'sexual-health-basic',
          name: 'Basic Sexual Health',
          price: 179.00,
          description: 'Essential sexual health support',
          features: [
            'Performance enhancement medication',
            'Initial medical consultation',
            'Basic treatment plan',
            '30-day supply'
          ]
        },
        {
          id: 'sexual-health-plus',
          name: 'Plus Sexual Health',
          price: 249.00,
          description: 'Enhanced sexual health program',
          features: [
            'Performance enhancement medication',
            'Libido support supplements',
            'Initial and follow-up consultations',
            'Comprehensive treatment plan',
            '30-day supply with refill option'
          ]
        },
        {
          id: 'sexual-health-premium',
          name: 'Premium Sexual Health',
          price: 329.00,
          description: 'Complete sexual health solution',
          features: [
            'Performance enhancement medication',
            'Libido support supplements',
            'Hormone optimization',
            'Unlimited medical consultations',
            'Personalized treatment plan',
            '30-day supply with automatic refills'
          ]
        }
      ],
      healthQuestions: [
        { id: 'heart-disease', text: 'Heart Disease' },
        { id: 'hypertension', text: 'High Blood Pressure' },
        { id: 'diabetes', text: 'Diabetes' },
        { id: 'hormone', text: 'Hormone Imbalance' },
        { id: 'medications', text: 'Taking Multiple Medications' }
      ],
      stats: [
        { value: '94%', label: 'report improved satisfaction' },
        { value: '85%', label: 'experience increased libido' },
        { value: '90%', label: 'would recommend to others' }
      ],
      benefits: [
        'Comprehensive approach to sexual health',
        'Personalized treatment plans',
        'Discreet packaging and delivery',
        'Ongoing medical support'
      ]
    },
    {
      id: 'longevity',
      name: 'Longevity Treatment',
      price: 299.00,
      description: 'Advanced anti-aging and longevity treatments to help you look and feel younger.',
      packages: [
        {
          id: 'longevity-basic',
          name: 'Basic Longevity',
          price: 299.00,
          description: 'Essential anti-aging support',
          features: [
            'Anti-aging supplements',
            'Initial medical consultation',
            'Basic longevity assessment',
            '30-day supply'
          ]
        },
        {
          id: 'longevity-plus',
          name: 'Plus Longevity',
          price: 399.00,
          description: 'Enhanced anti-aging program',
          features: [
            'Anti-aging supplements',
            'NAD+ boosters',
            'Initial and follow-up consultations',
            'Comprehensive longevity assessment',
            '30-day supply with refill option'
          ]
        },
        {
          id: 'longevity-premium',
          name: 'Premium Longevity',
          price: 599.00,
          description: 'Complete anti-aging solution',
          features: [
            'Anti-aging supplements',
            'NAD+ boosters',
            'Peptide therapy',
            'Unlimited medical consultations',
            'Advanced longevity assessment',
            'Personalized treatment plan',
            '30-day supply with automatic refills'
          ]
        }
      ],
      healthQuestions: [
        { id: 'autoimmune', text: 'Autoimmune Conditions' },
        { id: 'cancer', text: 'Cancer History' },
        { id: 'liver', text: 'Liver Problems' },
        { id: 'kidney', text: 'Kidney Problems' },
        { id: 'allergies', text: 'Severe Allergies' }
      ],
      stats: [
        { value: '87%', label: 'report improved energy levels' },
        { value: '78%', label: 'notice better skin appearance' },
        { value: '82%', label: 'experience improved mental clarity' }
      ],
      benefits: [
        'Science-backed anti-aging compounds',
        'Personalized longevity protocols',
        'Regular biomarker monitoring',
        'Ongoing medical support'
      ]
    }
  ];

  // Validation state
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle treatment selection
  const selectTreatment = (treatmentId) => {
    setFormData(prev => ({
      ...prev,
      selectedTreatment: treatmentId,
      selectedPackage: ''
    }));
  };

  // Handle package selection
  const selectPackage = (packageId) => {
    setFormData(prev => ({
      ...prev,
      selectedPackage: packageId
    }));
  };

  // Handle health issue selection
  const toggleHealthIssue = (issueId) => {
    setFormData(prev => {
      const healthIssues = [...prev.healthIssues];
      const index = healthIssues.indexOf(issueId);
      
      if (index === -1) {
        healthIssues.push(issueId);
      } else {
        healthIssues.splice(index, 1);
      }
      
      return {
        ...prev,
        healthIssues
      };
    });
  };

  // Select "None" for health issues
  const selectNoneHealthIssue = () => {
    setFormData(prev => ({
      ...prev,
      healthIssues: ['none']
    }));
  };

  // Validate current step
  const validateStep = () => {
    const newErrors = {};
    
    switch (step) {
      case 1: // Basic info
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
        if (formData.email !== formData.confirmEmail) newErrors.confirmEmail = 'Emails do not match';
        if (!formData.dob) newErrors.dob = 'Date of birth is required';
        else {
          const birthDate = new Date(formData.dob);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          const monthDiff = today.getMonth() - birthDate.getMonth();
          if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
          }
          if (age < 18) newErrors.dob = 'You must be at least 18 years old';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        break;
      
      case 2: // Address
        if (!formData.address.trim()) newErrors.address = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (formData.state !== 'FL') newErrors.state = 'You must be a Florida resident';
        if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
        else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) newErrors.zipCode = 'Invalid ZIP code format';
        break;
      
      case 3: // Treatment selection
        if (!formData.selectedTreatment) newErrors.selectedTreatment = 'Please select a treatment';
        break;
      
      case 6: // Package selection
        if (!formData.selectedPackage) newErrors.selectedPackage = 'Please select a package';
        break;
      
      case 8: // Consent
        if (!formData.privacyConsent) newErrors.privacyConsent = 'You must agree to the Privacy Policy';
        if (!formData.telehealthConsent) newErrors.telehealthConsent = 'You must agree to the Telehealth Consent';
        if (!formData.hipaaConsent) newErrors.hipaaConsent = 'You must agree to the HIPAA Authorization';
        break;
      
      default:
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const nextStep = () => {
    if (validateStep()) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  // Handle previous step
  const prevStep = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  // Check if user is in Florida
  const isFloridaResident = formData.state === 'FL';

  // Check if user is over 18
  const isOver18 = () => {
    if (!formData.dob) return false;
    
    const birthDate = new Date(formData.dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age >= 18;
  };

  // Get selected treatment data
  const getSelectedTreatment = () => {
    return treatments.find(t => t.id === formData.selectedTreatment);
  };

  // Get selected package data
  const getSelectedPackage = () => {
    const treatment = getSelectedTreatment();
    if (!treatment) return null;
    
    return treatment.packages.find(p => p.id === formData.selectedPackage);
  };

  // Render progress indicator
  const renderProgress = () => {
    const totalSteps = 10;
    
    return (
      <div className="progress-container">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <div 
            key={index} 
            className={`progress-dot ${index <= step ? 'active' : ''}`}
          />
        ))}
      </div>
    );
  };

  // Render form based on current step
  const renderForm = () => {
    switch (step) {
      case 0: // Welcome
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h1>Welcome to JoeyMed</h1>
            <p>Please click below to begin your intake form.</p>
            <button onClick={nextStep}>Get Started</button>
          </motion.div>
        );
      
      case 1: // Basic info
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Tell us about you</h2>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="firstName">First Name</label>
                <input 
                  type="text" 
                  id="firstName" 
                  name="firstName" 
                  value={formData.firstName} 
                  onChange={handleChange} 
                  required 
                />
                {errors.firstName && <p className="error-text">{errors.firstName}</p>}
              </div>
              
              <div className="form-group half">
                <label htmlFor="lastName">Last Name</label>
                <input 
                  type="text" 
                  id="lastName" 
                  name="lastName" 
                  value={formData.lastName} 
                  onChange={handleChange} 
                  required 
                />
                {errors.lastName && <p className="error-text">{errors.lastName}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                required 
              />
              {errors.email && <p className="error-text">{errors.email}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="confirmEmail">Confirm Email Address</label>
              <input 
                type="email" 
                id="confirmEmail" 
                name="confirmEmail" 
                value={formData.confirmEmail} 
                onChange={handleChange} 
                required 
              />
              {errors.confirmEmail && <p className="error-text">{errors.confirmEmail}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="dob">Date of Birth</label>
              <input 
                type="date" 
                id="dob" 
                name="dob" 
                value={formData.dob} 
                onChange={handleChange} 
                required 
              />
              {errors.dob && <p className="error-text">{errors.dob}</p>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input 
                type="tel" 
                id="phone" 
                name="phone" 
                value={formData.phone} 
                onChange={handleChange} 
                required 
              />
              {errors.phone && <p className="error-text">{errors.phone}</p>}
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 2: // Address
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Your Address</h2>
            <p className="helper-text">We can only provide treatment to Florida residents.</p>
            
            <div className="form-group">
              <label htmlFor="address">Street Address</label>
              <AddressAutocomplete
                value={formData.address}
                onChange={(address) => {
                  setFormData(prev => ({
                    ...prev,
                    address: address.street,
                    city: address.city,
                    state: address.state,
                    zipCode: address.zipCode
                  }));
                }}
              />
              {errors.address && <p className="error-text">{errors.address}</p>}
            </div>
            
            <div className="form-row">
              <div className="form-group half">
                <label htmlFor="city">City</label>
                <input 
                  type="text" 
                  id="city" 
                  name="city" 
                  value={formData.city} 
                  onChange={handleChange} 
                  required 
                />
                {errors.city && <p className="error-text">{errors.city}</p>}
              </div>
              
              <div className="form-group half">
                <label htmlFor="state">State</label>
                <select 
                  id="state" 
                  name="state" 
                  value={formData.state} 
                  onChange={handleChange} 
                  required
                >
                  <option value="FL">Florida</option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  {/* Add other states */}
                </select>
                {errors.state && <p className="error-text">{errors.state}</p>}
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input 
                type="text" 
                id="zipCode" 
                name="zipCode" 
                value={formData.zipCode} 
                onChange={handleChange} 
                required 
              />
              {errors.zipCode && <p className="error-text">{errors.zipCode}</p>}
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 3: // Treatment selection
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="question-text">What treatment are you interested in?</h2>
            <p className="helper-text">Select one option to continue.</p>
            
            {treatments.map((treatment) => (
              <div 
                key={treatment.id} 
                className={`treatment-option ${formData.selectedTreatment === treatment.id ? 'selected' : ''}`}
                onClick={() => selectTreatment(treatment.id)}
              >
                <div className="option-content">
                  <h3>{treatment.name}</h3>
                  <p className="price">${treatment.price.toFixed(2)}</p>
                </div>
              </div>
            ))}
            
            {errors.selectedTreatment && <p className="error-text">{errors.selectedTreatment}</p>}
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 4: // Treatment info
        const selectedTreatment = getSelectedTreatment();
        
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>{selectedTreatment?.name}</h2>
            <p>{selectedTreatment?.description}</p>
            
            <TreatmentInfographic treatment={selectedTreatment} />
            
            <div className="info-container">
              <h3>Free Consultation Included</h3>
              <p>After your purchase, you'll receive a free consultation with our healthcare providers. If you're not prescribed the medication, we'll issue a full refund.</p>
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 5: // Health questions
        const treatment = getSelectedTreatment();
        const healthQuestions = treatment?.healthQuestions || [];
        
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="question-text">Are you currently experiencing any of the following?</h2>
            <p className="helper-text">Please select all that apply.</p>
            
            {healthQuestions.map((question) => (
              <div 
                key={question.id} 
                className={`health-option ${formData.healthIssues.includes(question.id) ? 'selected' : ''}`}
                onClick={() => toggleHealthIssue(question.id)}
              >
                <div className="option-content">
                  <h3>{question.text}</h3>
                </div>
              </div>
            ))}
            
            <div 
              className={`health-option ${formData.healthIssues.includes('none') ? 'selected' : ''}`}
              onClick={selectNoneHealthIssue}
            >
              <div className="option-content">
                <h3>None of the above</h3>
              </div>
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 6: // Package selection
        const treatmentData = getSelectedTreatment();
        const packages = treatmentData?.packages || [];
        
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2 className="question-text">Select your preferred package</h2>
            <p className="helper-text">Choose the option that best fits your needs.</p>
            
            {packages.map((pkg) => (
              <div 
                key={pkg.id} 
                className={`package-option ${formData.selectedPackage === pkg.id ? 'selected' : ''}`}
                onClick={() => selectPackage(pkg.id)}
              >
                <div className="package-header">
                  <h3>{pkg.name}</h3>
                  <span className="package-price">${pkg.price.toFixed(2)}</span>
                </div>
                <p>{pkg.description}</p>
                
                <div className="package-features">
                  {pkg.features.map((feature, index) => (
                    <div key={index} className="package-feature">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            
            {errors.selectedPackage && <p className="error-text">{errors.selectedPackage}</p>}
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 7: // Additional info (BMI, etc.)
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Additional Information</h2>
            
            {formData.selectedTreatment === 'weight-loss' && (
              <>
                <BMICalculator 
                  height={formData.height}
                  weight={formData.weight}
                  onHeightChange={(height) => setFormData(prev => ({ ...prev, height }))}
                  onWeightChange={(weight) => setFormData(prev => ({ ...prev, weight }))}
                />
                
                <div className="form-group">
                  <label htmlFor="targetWeight">Target Weight (lbs)</label>
                  <input 
                    type="number" 
                    id="targetWeight" 
                    name="targetWeight" 
                    value={formData.targetWeight} 
                    onChange={handleChange} 
                  />
                </div>
                
                <WeightLossGraph 
                  currentWeight={formData.weight}
                  targetWeight={formData.targetWeight}
                />
                
                <BodyVisualization 
                  height={formData.height}
                  currentWeight={formData.weight}
                  targetWeight={formData.targetWeight}
                />
              </>
            )}
            
            <div className="form-group">
              <label htmlFor="allergies">Do you have any allergies?</label>
              <textarea 
                id="allergies" 
                name="allergies" 
                value={formData.allergies} 
                onChange={handleChange} 
                placeholder="Please list any allergies you have"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="medications">Current Medications</label>
              <textarea 
                id="medications" 
                name="medications" 
                value={formData.medications} 
                onChange={handleChange} 
                placeholder="Please list any medications you are currently taking"
              />
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 8: // Consent
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Consent Forms</h2>
            <p className="helper-text">Please review and agree to the following consent forms to continue.</p>
            
            <div className="consent-section">
              <div className="consent-item">
                <input 
                  type="checkbox" 
                  id="privacyConsent" 
                  name="privacyConsent" 
                  checked={formData.privacyConsent} 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="privacyConsent">
                  I agree to the <a href="/privacy-policy" target="_blank">Privacy Policy</a>
                </label>
              </div>
              {errors.privacyConsent && <p className="error-text">{errors.privacyConsent}</p>}
              
              <div className="consent-item">
                <input 
                  type="checkbox" 
                  id="telehealthConsent" 
                  name="telehealthConsent" 
                  checked={formData.telehealthConsent} 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="telehealthConsent">
                  I agree to the <a href="/telehealth-consent" target="_blank">Telehealth Consent</a>
                </label>
              </div>
              {errors.telehealthConsent && <p className="error-text">{errors.telehealthConsent}</p>}
              
              <div className="consent-item">
                <input 
                  type="checkbox" 
                  id="hipaaConsent" 
                  name="hipaaConsent" 
                  checked={formData.hipaaConsent} 
                  onChange={handleChange} 
                  required 
                />
                <label htmlFor="hipaaConsent">
                  I agree to the <a href="/hipaa-authorization" target="_blank">HIPAA Authorization</a>
                </label>
              </div>
              {errors.hipaaConsent && <p className="error-text">{errors.hipaaConsent}</p>}
              
              <div className="consent-item">
                <input 
                  type="checkbox" 
                  id="marketingOptIn" 
                  name="marketingOptIn" 
                  checked={formData.marketingOptIn} 
                  onChange={handleChange} 
                />
                <label htmlFor="marketingOptIn">
                  I would like to receive marketing emails about new treatments and promotions
                </label>
              </div>
            </div>
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
              <button onClick={nextStep}>Continue</button>
            </div>
          </motion.div>
        );
      
      case 9: // Review and checkout
        const selectedPackage = getSelectedPackage();
        
        return (
          <motion.div 
            className="card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <h2>Review Your Order</h2>
            
            <div className="order-summary">
              <h3>Order Summary</h3>
              <div className="order-item">
                <span>{selectedPackage?.name}</span>
                <span>${selectedPackage?.price.toFixed(2)}</span>
              </div>
              
              <div className="order-total">
                <span>Total</span>
                <span>${selectedPackage?.price.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="info-container">
              <h3>Free Consultation Included</h3>
              <p>After your purchase, you'll receive a free consultation with our healthcare providers. If you're not prescribed the medication, we'll issue a full refund.</p>
            </div>
            
            <TrustpilotReviews businessUrl="https://www.trustpilot.com/review/joeymed.com" />
            
            <SquareCheckout 
              packageData={selectedPackage}
              customerData={{
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
                phone: formData.phone,
                address: {
                  street: formData.address,
                  city: formData.city,
                  state: formData.state,
                  zipCode: formData.zipCode
                }
              }}
            />
            
            <div className="button-group">
              <button onClick={prevStep}>Back</button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  // Check if user is disqualified
  useEffect(() => {
    if (step > 2 && (!isFloridaResident || !isOver18())) {
      setStep(10); // Disqualification step
    }
  }, [step, isFloridaResident]);

  // Render disqualification message
  const renderDisqualification = () => {
    return (
      <motion.div 
        className="card"
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <h2>We're Sorry</h2>
        <p>
          {!isFloridaResident 
            ? "We can only provide treatment to Florida residents at this time." 
            : "You must be at least 18 years old to use our services."}
        </p>
        <p>Thank you for your interest in JoeyMed.</p>
      </motion.div>
    );
  };

  return (
    <div className="intake-form-container">
      {step < 10 && renderProgress()}
      
      <AnimatePresence mode="wait">
        {step === 10 ? renderDisqualification() : renderForm()}
      </AnimatePresence>
    </div>
  );
};

export default IntakeForm;
