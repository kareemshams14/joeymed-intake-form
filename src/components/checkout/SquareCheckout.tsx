'use client'
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"

/* ---------- types ---------------------------------------------------- */
export interface Package {
  id: string
  name: string
  price: number
  description?: string
  features?: string[]
}

export interface Treatment {
  id: string
  name: string
  packages: Package[]
}

interface SquareCheckoutProps {
  formData: {
    firstName: string
    lastName: string
    email: string
    selectedTreatment: string
    selectedPackage: string
  }
  treatments: Treatment[]
  onBack: () => void
}

/* ---------- component ------------------------------------------------ */
const SquareCheckout: React.FC<SquareCheckoutProps> = ({
  formData,
  treatments,
  onBack,
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [orderSummary, setOrderSummary] = useState<{
    packageName: string
    packagePrice: number
    treatmentName: string
  } | null>(null)

  /* ---------- build summary whenever selection changes --------------- */
  useEffect(() => {
    const selectedTreatment = treatments.find(
      (t) => t.id === formData.selectedTreatment
    )

    if (!selectedTreatment) return

    const selectedPackage = selectedTreatment.packages.find(
      (p: Package) => p.id === formData.selectedPackage
    )

    if (!selectedPackage) return

    setOrderSummary({
      packageName: selectedPackage.name,
      packagePrice: selectedPackage.price,
      treatmentName: selectedTreatment.name,
    })
  }, [formData, treatments])

  /* ---------- handlers ---------------------------------------------- */
  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // 🔗 TODO: call your backend endpoint that creates a Square Checkout link
      // const { url } = await fetch("/api/checkout", { method: "POST", body: JSON.stringify({ ... })}).then(r=>r.json())

      // -- demo redirect
      const url = `https://joey-med.square.site/?name=${encodeURIComponent(
        `${formData.firstName} ${formData.lastName}`
      )}&email=${encodeURIComponent(formData.email)}&package=${encodeURIComponent(
        orderSummary?.packageName ?? ""
      )}`

      window.location.href = url
    } catch (err) {
      console.error("create-checkout error", err)
      setError("Failed to create checkout. Please try again.")
      setIsLoading(false)
      return
    }

    setIsLoading(false)
  }

  /* ---------- render -------------------------------------------------- */
  if (!orderSummary) return <p className="text-sm text-gray-600">Loading…</p>

  return (
    <motion.div
      className="checkout-container space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      {/* summary */}
      <h2 className="text-xl font-semibold">Order Summary</h2>

      <div className="border rounded-lg p-4 divide-y">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="font-medium">{orderSummary.treatmentName}</p>
            <p className="text-sm text-gray-500">{orderSummary.packageName}</p>
          </div>
          <p className="font-semibold">${orderSummary.packagePrice.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between pt-2">
          <span>Total</span>
          <span className="font-semibold">
            ${orderSummary.packagePrice.toFixed(2)}
          </span>
        </div>
      </div>

      <p className="text-sm text-gray-600">
        Free consultation with our healthcare providers is included after
        purchase. If you're not prescribed the medication, we'll issue a full
        refund.
      </p>

      {/* actions */}
      <div className="flex justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isLoading}
          className="px-4 py-2 border rounded-md hover:bg-gray-50"
        >
          Back
        </button>

        <button
          type="button"
          onClick={handleCheckout}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {isLoading ? (
            <svg
              className="animate-spin h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 2a10 10 0 0 0 0 20" />
            </svg>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              Proceed to Payment
            </>
          )}
        </button>
      </div>

      {error && <p className="text-red-600 text-sm">{error}</p>}

      <p className="flex items-center gap-1 text-xs text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Secure checkout powered by Square
      </p>
    </motion.div>
  )
}

export default SquareCheckout
