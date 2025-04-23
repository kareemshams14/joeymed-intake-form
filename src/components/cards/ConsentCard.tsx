'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';
import { getRecommendedUpsells, formatCurrency } from '@/lib/validation';

interface ConsentCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onSubmit: () => void;
  onPrev: () => void;
}

const ConsentCard = ({ 
  formData, 
  updateFormData, 
  onSubmit, 
  onPrev 
}: ConsentCardProps) => {
  const [showSummary, setShowSummary] = useState(true);
  const [showUpsells, setShowUpsells] = useState(false);
  const [showConsent, setShowConsent] = useState(false);
  
  // Handle checkbox change
  const handleCheckboxChange = (field: string, checked: boolean) => {
    updateFormData({ [field]: checked });
  };
  
  // Handle upsell selection
  const handleUpsellSelect = (product: {id: string, name: string, price: number}, isSelected: boolean) => {
    let updatedUpsells = [...formData.upsellProducts];
    
    if (isSelected) {
      // Add product if not already in the list
      if (!updatedUpsells.some(p => p.id === product.id)) {
        updatedUpsells.push(product);
      }
    } else {
      // Remove product if in the list
      updatedUpsells = updatedUpsells.filter(p => p.id !== product.id);
    }
    
    updateFormData({ upsellProducts: updatedUpsells });
  };
  
  // Check if product is selected
  const isUpsellSelected = (productId: string) => {
    return formData.upsellProducts.some(p => p.id === productId);
  };
  
  // Calculate total price
  const calculateTotal = () => {
    const selectedProductsTotal = formData.selectedProducts.reduce((sum, product) => sum + product.price, 0);
    const upsellProductsTotal = formData.upsellProducts.reduce((sum, product) => sum + product.price, 0);
    
    return selectedProductsTotal + upsellProductsTotal;
  };
  
  // Get recommended upsell products
  const recommendedUpsells = getRecommendedUpsells(formData.selectedTreatment, formData.gender);
  
  // Check if all consents are checked
  const isComplete = () => {
    return formData.termsConsent && formData.medicalConsent;
  };
  
  // Handle continue to next section
  const handleContinue = () => {
    if (showSummary) {
      setShowSummary(false);
      setShowUpsells(true);
    } else if (showUpsells) {
      setShowUpsells(false);
      setShowConsent(true);
    }
  };
  
  // Render order summary
  const renderOrderSummary = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold mb-4">Selected Products</h4>
          
          {formData.selectedProducts.length > 0 ? (
            <div className="space-y-3">
              {formData.selectedProducts.map((product, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{product.name}</span>
                  <span className="font-semibold">{formatCurrency(product.price)}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products selected</p>
          )}
        </div>
      </div>
    );
  };
  
  // Render upsell recommendations
  const renderUpsellRecommendations = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-6">Recommended Add-ons</h3>
        <p className="text-gray-600 mb-6">
          Based on your selections, we recommend these additional products to enhance your treatment.
        </p>
        
        {recommendedUpsells.length > 0 ? (
          <div className="space-y-4 mb-6">
            {recommendedUpsells.map((product, index) => (
              <div 
                key={index}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  isUpsellSelected(product.id) 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleUpsellSelect(product, !isUpsellSelected(product.id))}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isUpsellSelected(product.id)}
                      onChange={(e) => handleUpsellSelect(product, e.target.checked)}
                      className="w-5 h-5 mr-3"
                    />
                    <span>{product.name}</span>
                  </div>
                  <span className="text-joey-blue font-semibold">{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 mb-6">No recommendations available for your selected treatment.</p>
        )}
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center font-semibold">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
        </div>
      </div>
    );
  };
  
  // Render consent form
  const renderConsentForm = () => {
    return (
      <div>
        <h3 className="text-xl font-semibold mb-6">Final Consent</h3>
        
        <div className="space-y-6 mb-6">
          <div className="space-y-2">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="terms-consent"
                checked={formData.termsConsent}
                onChange={(e) => handleCheckboxChange('termsConsent', e.target.checked)}
                className="w-5 h-5 mt-1 mr-3"
              />
              <label htmlFor="terms-consent" className="text-gray-700">
                I agree to the <a href="#" className="text-joey-blue hover:underline">Terms and Conditions</a> and <a href="#" className="text-joey-blue hover:underline">Privacy Policy</a>.
              </label>
            </div>
            {!formData.termsConsent && (
              <p className="text-red-500 text-sm ml-8">You must agree to the terms and conditions to continue.</p>
            )}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="medical-consent"
                checked={formData.medicalConsent}
                onChange={(e) => handleCheckboxChange('medicalConsent', e.target.checked)}
                className="w-5 h-5 mt-1 mr-3"
              />
              <label htmlFor="medical-consent" className="text-gray-700">
                I confirm that the information provided is accurate and complete to the best of my knowledge.
              </label>
            </div>
            {!formData.medicalConsent && (
              <p className="text-red-500 text-sm ml-8">You must confirm the accuracy of your information to continue.</p>
            )}
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex justify-between items-center font-semibold mb-2">
            <span>Total</span>
            <span>{formatCurrency(calculateTotal())}</span>
          </div>
          <p className="text-sm text-gray-500">
            By clicking "Submit & Checkout", you will be redirected to our secure payment processor.
          </p>
        </div>
      </div>
    );
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">Review & Checkout</h2>
      
      <motion.div
        key={showSummary ? 'summary' : showUpsells ? 'upsells' : 'consent'}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        {showSummary && renderOrderSummary()}
        {showUpsells && renderUpsellRecommendations()}
        {showConsent && renderConsentForm()}
      </motion.div>
      
      <div className="flex justify-between mt-8">
        <Button 
          onClick={showSummary ? onPrev : showUpsells ? () => {
            setShowUpsells(false);
            setShowSummary(true);
          } : () => {
            setShowConsent(false);
            setShowUpsells(true);
          }} 
          variant="secondary"
        >
          Back
        </Button>
        
        {(showSummary || showUpsells) ? (
          <Button onClick={handleContinue}>
            Continue
          </Button>
        ) : (
          <Button 
            onClick={onSubmit} 
            disabled={!isComplete()}
          >
            Submit & Checkout
          </Button>
        )}
      </div>
    </div>
  );
};

export default ConsentCard;
