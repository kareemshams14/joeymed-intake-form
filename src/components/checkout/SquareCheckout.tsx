'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

// Define the FormData interface to match what's used in IntakeForm
interface FormData {
  isFloridaResident: boolean;
  isOver18: boolean;
  name: string;
  email: string;
  phone: string;
  selectedTreatment: string;
  healthQuestions: {
    [key: string]: string | boolean;
  };
  consent: boolean;
}

interface SquareCheckoutProps {
  formData: FormData;
  selectedUpsells: string[];
  treatments: { id: string; name: string; price: number }[];
  treatmentUpsells: { [key: string]: { id: string; name: string; price: number }[] };
  onBack: () => void;
}

const SquareCheckout: React.FC<SquareCheckoutProps> = ({
  formData,
  selectedUpsells,
  treatments,
  treatmentUpsells,
  onBack
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Calculate total based on selections
  const calculateTotal = () => {
    let total = 0;
    
    // Add treatment price
    const treatment = treatments.find(t => t.id === formData.selectedTreatment);
    if (treatment) {
      total += treatment.price;
    }
    
    // Add upsell prices
    if (formData.selectedTreatment && selectedUpsells.length > 0) {
      const upsells = treatmentUpsells[formData.selectedTreatment] || [];
      selectedUpsells.forEach(upsellId => {
        const upsell = upsells.find(u => u.id === upsellId);
        if (upsell) {
          total += upsell.price;
        }
      });
    }
    
    return total.toFixed(2);
  };

  // Get selected treatment name
  const getSelectedTreatmentName = () => {
    const treatment = treatments.find(t => t.id === formData.selectedTreatment);
    return treatment ? treatment.name : '';
  };

  // Get selected upsell names
  const getSelectedUpsellNames = () => {
    if (!formData.selectedTreatment || selectedUpsells.length === 0) {
      return [];
    }
    
    const upsells = treatmentUpsells[formData.selectedTreatment] || [];
    return selectedUpsells.map(upsellId => {
      const upsell = upsells.find(u => u.id === upsellId);
      return upsell ? upsell.name : '';
    }).filter(name => name !== '');
  };

  // Initialize Square Web Payments SDK
  useEffect(() => {
    const initializeSquare = async () => {
      try {
        setIsLoading(true);
        
        // In a real implementation, you would load the Square Web Payments SDK
        // and initialize it with your app ID and location ID
        // For example:
        /*
        const payments = window.Square.payments(process.env.NEXT_PUBLIC_SQUARE_APP_ID, process.env.NEXT_PUBLIC_SQUARE_LOCATION_ID);
        
        const card = await payments.card();
        await card.attach('#card-container');
        */
        
        // For demo purposes, we'll simulate the initialization
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error initializing Square:', err);
        setError('Failed to initialize payment system. Please try again.');
        setIsLoading(false);
      }
    };
    
    initializeSquare();
    
    // Add Square script to the page
    const script = document.createElement('script');
    script.src = 'https://sandbox.web.squarecdn.com/v1/square.js';
    script.async = true;
    document.body.appendChild(script);
    
    return () => {
      // Clean up script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  // Handle payment submission
  const handlePaymentSubmission = async () => {
    try {
      setIsLoading(true);
      
      // In a real implementation, you would use the Square Web Payments SDK
      // to tokenize the payment method and send it to your server
      // For example:
      /*
      const result = await card.tokenize();
      if (result.status === 'OK') {
        // Send the token to your server to complete the payment
        const response = await fetch('/api/process-payment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sourceId: result.token,
            amount: calculateTotal(),
            formData,
            selectedUpsells,
          }),
        });
        
        const data = await response.json();
        if (data.success) {
          // Payment successful, redirect to success page
          window.location.href = '/success';
        } else {
          setError(data.error || 'Payment failed. Please try again.');
        }
      } else {
        setError(result.errors[0].message);
      }
      */
      
      // For demo purposes, we'll simulate the payment process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to a success page or show success message
      window.location.href = '/success';
      
      setIsLoading(false);
    } catch (err) {
      console.error('Payment error:', err);
      setError('Payment processing failed. Please try again.');
      setIsLoading(false);
    }
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md"
    >
      <h2 className="text-2xl font-bold text-blue-600 mb-6">Checkout</h2>
      
      <div className="space-y-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="font-medium text-gray-900 mb-2">Order Summary</h3>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>{getSelectedTreatmentName()}</span>
              <span>${treatments.find(t => t.id === formData.selectedTreatment)?.price.toFixed(2)}</span>
            </div>
            
            {getSelectedUpsellNames().map((name, index) => {
              const upsellId = selectedUpsells[index];
              const upsell = treatmentUpsells[formData.selectedTreatment]?.find(u => u.id === upsellId);
              
              return (
                <div key={upsellId} className="flex justify-between text-sm">
                  <span>{name}</span>
                  <span>${upsell?.price.toFixed(2)}</span>
                </div>
              );
            })}
            
            <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-medium">
              <span>Total</span>
              <span>${calculateTotal()}</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium text-gray-900">Payment Information</h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Initializing payment system...</span>
            </div>
          ) : error ? (
            <div className="bg-red-50 text-red-600 p-4 rounded-md">
              {error}
            </div>
          ) : (
            <>
              <div className="border border-gray-300 rounded-md p-4">
                <div id="card-container" className="min-h-[100px] flex items-center justify-center">
                  <p className="text-gray-500">
                    In a real implementation, the Square payment form would appear here.
                  </p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500">
                Your payment information is securely processed by Square. We do not store your card details.
              </p>
            </>
          )}
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <button
          onClick={onBack}
          disabled={isLoading}
          className="py-2 px-4 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50"
        >
          Back
        </button>
        
        <button
          onClick={handlePaymentSubmission}
          disabled={isLoading || !!error}
          className={`py-2 px-4 rounded-md text-white ${
            isLoading || error
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 'Complete Payment'}
        </button>
      </div>
    </motion.div>
  );
};

export default SquareCheckout;
