import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SquareCheckoutProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    selectedTreatment: string;
    selectedPackage: string;
  };
  treatments: any[];
  onBack: () => void;
}

const SquareCheckout: React.FC<SquareCheckoutProps> = ({
  formData,
  treatments,
  onBack
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderSummary, setOrderSummary] = useState<{
    packageName: string;
    packagePrice: number;
    treatmentName: string;
  } | null>(null);

  useEffect(() => {
    // Generate order summary based on selected treatment and package
    const selectedTreatment = treatments.find(t => t.id === formData.selectedTreatment);
    if (selectedTreatment) {
      const selectedPackage = selectedTreatment.packages.find(p => p.id === formData.selectedPackage);
      if (selectedPackage) {
        setOrderSummary({
          packageName: selectedPackage.name,
          packagePrice: selectedPackage.price,
          treatmentName: selectedTreatment.name
        });
      }
    }
  }, [formData, treatments]);

  const handleCheckout = () => {
    setIsLoading(true);
    setError(null);

    // Simulate API call to create Square checkout
    setTimeout(() => {
      try {
        // In a real implementation, this would call your backend to create a Square checkout
        // and redirect the user to the Square checkout page
        
        // For demonstration purposes, we'll simulate a successful checkout
        window.location.href = `https://joey-med.square.site/?name=${encodeURIComponent(formData.firstName + ' ' + formData.lastName)}&email=${encodeURIComponent(formData.email)}&package=${encodeURIComponent(orderSummary?.packageName || '')}`;
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error creating Square checkout:', err);
        setError('Failed to create checkout. Please try again.');
        setIsLoading(false);
      }
    }, 1500);
  };

  if (!orderSummary) {
    return <div className="loading">Loading order summary...</div>;
  }

  return (
    <motion.div 
      className="checkout-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Order Summary</h2>
      
      <div className="order-details">
        <div className="order-item">
          <div className="item-name">{orderSummary.treatmentName}</div>
          <div className="item-package">{orderSummary.packageName}</div>
          <div className="item-price">${orderSummary.packagePrice.toFixed(2)}</div>
        </div>
        
        <div className="order-total">
          <div className="total-label">Total</div>
          <div className="total-price">${orderSummary.packagePrice.toFixed(2)}</div>
        </div>
      </div>
      
      <div className="checkout-info">
        <div className="info-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
        </div>
        <div className="info-text">
          <p>Free consultation with our healthcare providers is included after purchase. If you're not prescribed the medication, we'll issue a full refund.</p>
        </div>
      </div>
      
      <div className="checkout-actions">
        <button 
          className="back-button"
          onClick={onBack}
          disabled={isLoading}
        >
          Back
        </button>
        
        <button 
          className="checkout-button"
          onClick={handleCheckout}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading-spinner"></span>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                <line x1="1" y1="10" x2="23" y2="10"></line>
              </svg>
              Proceed to Payment
            </>
          )}
        </button>
      </div>
      
      {error && (
        <div className="checkout-error">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <span>{error}</span>
        </div>
      )}
      
      <div className="secure-checkout">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
        <span>Secure checkout powered by Square</span>
      </div>
    </motion.div>
  );
};

export default SquareCheckout;
