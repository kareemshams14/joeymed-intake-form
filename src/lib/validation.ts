/**
 * Validation utilities for the JoeyMed healthcare intake form
 */

// Validate email format
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validate phone number format
export const isValidPhone = (phone: string): boolean => {
  // Allow formats like (123) 456-7890, 123-456-7890, 1234567890
  const phoneRegex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
  return phoneRegex.test(phone);
};

// Validate Florida ZIP codes
export const isValidFloridaZip = (zip: string): boolean => {
  // Florida ZIP codes range from 32000 to 34999 (primary) and some 
  // secondary ranges like 30000-30999
  const floridaZipRegex = /^(3[0-4][0-9]{3})$/;
  return floridaZipRegex.test(zip);
};

// Validate age (must be 18 or older)
export const isValidAge = (dateOfBirth: string): boolean => {
  const dob = new Date(dateOfBirth);
  const today = new Date();
  
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  // If birthday hasn't occurred yet this year, subtract a year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age >= 18;
};

// Validate date range for travel dates
export const isValidTravelDates = (startDate: string, endDate: string): boolean => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const today = new Date();
  
  // Start date must be in the future
  if (start < today) {
    return false;
  }
  
  // End date must be after start date
  if (end < start) {
    return false;
  }
  
  return true;
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Get Square product link
export const getSquareProductLink = (productId: string): string => {
  // This would be replaced with actual Square product links
  return `https://joey-med.square.site/product/${productId}`;
};

// Create Square checkout URL with multiple products
export const createSquareCheckoutUrl = (products: Array<{id: string, name: string, price: number}>): string => {
  // In a real implementation, this would construct the proper Square checkout URL
  // with all the selected products and their IDs
  const baseUrl = 'https://joey-med.square.site/checkout/';
  
  // For demo purposes, we'll just append product IDs
  const productIds = products.map(p => p.id).join(',');
  return `${baseUrl}?products=${productIds}`;
};

// Get recommended upsell products based on selected treatment
export const getRecommendedUpsells = (selectedTreatment: string | null, gender: string | null): Array<{id: string, name: string, price: number}> => {
  if (!selectedTreatment) return [];
  
  switch (selectedTreatment) {
    case 'weight-loss':
      return [
        { id: 'vitamin-b12', name: 'Vitamin B12 Injections', price: 49 },
        { id: 'appetite-suppressant', name: 'Appetite Suppressant', price: 79 }
      ];
    case 'erectile-dysfunction':
      return [
        { id: 'testosterone-booster', name: 'Testosterone Booster', price: 59 },
        { id: 'libido-enhancer', name: 'Libido Enhancer', price: 39 }
      ];
    case 'sexual-health':
      if (gender === 'female') {
        return [
          { id: 'hormone-test', name: 'Hormone Test Kit', price: 99 },
          { id: 'libido-enhancer-female', name: 'Female Libido Enhancer', price: 49 }
        ];
      }
      return [];
    case 'anti-aging':
      return [
        { id: 'collagen-supplement', name: 'Collagen Supplement', price: 39 },
        { id: 'antioxidant-complex', name: 'Antioxidant Complex', price: 45 }
      ];
    case 'travel-kit':
      return [
        { id: 'immune-booster', name: 'Immune Booster', price: 29 },
        { id: 'jet-lag-remedy', name: 'Jet Lag Remedy', price: 19 }
      ];
    default:
      return [];
  }
};
