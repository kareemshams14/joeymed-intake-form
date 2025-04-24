'use client'

import React, { useState, useEffect, ChangeEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import AddressAutocomplete from './AddressAutocomplete'
import BMICalculator from './BMICalculator'
import WeightLossGraph from './WeightLossGraph'
import TreatmentInfographic from './TreatmentInfographic'
import TrustpilotReviews from './TrustpilotReviews'
import BodyVisualization from './BodyVisualization'
import SquareCheckout from './checkout/SquareCheckout'

/* ------------------------------------------------------------------
  ✓  TYPES
------------------------------------------------------------------- */
interface Treatment {
  id: string
  name: string
  price: number
}

/* ------------------------------------------------------------------
  ✓  CONSTANTS & ANIMATION
------------------------------------------------------------------- */
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
} as const

/* ------------------------------------------------------------------
  ✓  COMPONENT
------------------------------------------------------------------- */
const IntakeForm: React.FC = () => {
  /* --------------------------------------------------  state  */
  const [step, setStep] = useState(1)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    state: 'FL',
    zipCode: '',
    selectedTreatment: '',
    selectedPackage: '',
    bmi: undefined as number | undefined,
    weight: undefined as number | undefined,
    targetWeight: undefined as number | undefined,
    weightUnit: 'lb',
    height: undefined as number | undefined,
    heightUnit: 'in',
    healthQuestions: {} as Record<string, string>,
  })

  const treatments: Treatment[] = [
    { id: 'weight-loss', name: 'Weight‑Loss Program', price: 299 },
    { id: 'ed', name: 'ED Treatment', price: 159 },
  ]

  const weeksToTarget = 12 // stub

  /* --------------------------------------------------  helpers  */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target as HTMLInputElement
    const checked = (e.target as HTMLInputElement).checked
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const prevStep = () => setStep((s) => Math.max(1, s - 1))
  const nextStep = () => setStep((s) => s + 1)

  const handleHealthQuestionChange = (id: string, value: string) =>
    setFormData((prev) => ({
      ...prev,
      healthQuestions: { ...prev.healthQuestions, [id]: value },
    }))

  const isFloridaResident = formData.state === 'FL'
  const isOver18 = () => {
    if (!formData.dob) return false
    const birthDate = new Date(formData.dob)
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
    return age >= 18
  }

  /* --------------------------------------------------  redirect guard  */
  useEffect(() => {
    if (
      step > 2 &&
      formData.dob && // 👉 wait until DOB entered
      (!isFloridaResident || !isOver18())
    ) {
      setStep(10) // disqualification
    }
  }, [step, isFloridaResident, formData.dob])

  /* --------------------------------------------------  selected helpers */
  const getSelectedTreatment = () =>
    treatments.find((t) => t.id === formData.selectedTreatment)

  /* --------------------------------------------------  renderers  */
  const renderStep = () => {
    switch (step) {
      /* ---------- Step 1 • Welcome ---------- */
      case 1:
        return (
          <motion.div
            key="step1"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Welcome to JoeyMed</h2>
            <p className="text-gray-700 mb-6">
              Click below to begin your intake.
            </p>
            <button
              onClick={nextStep}
              className="py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Get Started
            </button>
          </motion.div>
        )

      /* ---------- Step 2 • Basic Info ---------- */
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
            <h2 className="text-2xl font-bold mb-6">Tell us about you</h2>

            <label className="block mb-4">
              <span className="text-sm text-gray-700">Full Name</span>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </label>

            <label className="block mb-6">
              <span className="text-sm text-gray-700">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border rounded-md"
              />
            </label>

            <div className="flex justify-between">
              <button
                onClick={prevStep}
                className="py-2 px-4 border rounded-md text-gray-700 hover:bg-gray-50"
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
        )

      /* ---------- Step 3 onwards (placeholder) ---------- */
      case 3:
        return (
          <motion.div
            key="step3"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center"
          >
            <h2 className="text-xl font-semibold">Step 3 placeholder</h2>
            <p className="text-gray-600">Hook your existing flow here.</p>
            <button
              onClick={prevStep}
              className="mt-6 py-2 px-4 border rounded-md"
            >
              Back
            </button>
          </motion.div>
        )

      /* ---------- Step 10 • Disqualified ---------- */
      case 10:
        return (
          <motion.div
            key="disqualified"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center"
          >
            <h2 className="text-2xl font-bold mb-4">Service Requirements</h2>
            <p className="text-gray-700">
              You must be a Florida resident and at least 18 years old to
              continue.
            </p>
            <button
              onClick={() => setStep(2)}
              className="mt-6 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Go Back
            </button>
          </motion.div>
        )

      default:
        return null
    }
  }

  /* --------------------------------------------------  JSX  */
  return <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>
}

export default IntakeForm
