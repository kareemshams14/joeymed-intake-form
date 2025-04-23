'use client';

import { useEffect } from 'react';
import { FormData } from '../IntakeForm';

interface SquareCheckoutProps {
  formData: FormData;
  onCheckoutComplete: () => void;
}

const SquareCheckout = ({ 
  formData, 
  onCheckoutComplete 
}: SquareCheckoutProps) => {
  useEffect(() => {
    // Create a function to handle the Square checkout integration
    const initiateSquareCheckout = () => {
      // Combine selected products and upsell products
      const allProducts = [...formData.selectedProducts, ...formData.upsellProducts];
      
      // Create the Square checkout URL based on the selected products
      const createSquareCheckoutUrl = () => {
        // Base URL for JoeyMed Square site
        const baseUrl = 'https://joey-med.square.site/checkout/';
        
        // For a real implementation, we would use the actual product IDs from Square
        // and construct the proper checkout URL with all selected products
        
        // Get product IDs for the URL
        const productIds = allProducts.map(p => p.id).join(',');
        
        // Create a simple URL with product IDs as query parameters
        // In a production environment, this would be replaced with the actual Square checkout URL format
        return `${baseUrl}?products=${productIds}`;
      };
      
      // Get the checkout URL
      const checkoutUrl = createSquareCheckoutUrl();
      
      // In a real implementation, we might want to save the form data to a database
      // before redirecting to Square checkout
      
      // Log the checkout URL for debugging
      console.log('Redirecting to Square checkout:', checkoutUrl);
      
      // Redirect to Square checkout
      window.location.href = checkoutUrl;
      
      // Notify parent component that checkout has been initiated
      onCheckoutComplete();
    };
    
    // Initiate the checkout process
    initiateSquareCheckout();
  }, [formData, onCheckoutComplete]);
  
  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-2xl font-bold mb-4">Redirecting to Checkout...</h2>
      <p className="text-gray-600 mb-6">Please wait while we redirect you to our secure payment processor.</p>
      <div className="w-16 h-16 border-4 border-joey-blue border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default SquareCheckout;
