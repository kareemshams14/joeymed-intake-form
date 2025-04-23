'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AddressAutocompleteProps {
  onAddressSelect: (address: string) => void;
  placeholder?: string;
  className?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  placeholder = "Enter your address",
  className = ""
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Simulated address suggestions - in a real implementation, this would call a geocoding API
  const fetchAddressSuggestions = async (input: string) => {
    if (!input || input.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Mock suggestions based on input
      // In a real implementation, you would use Google Places API, Mapbox, or similar
      const mockSuggestions = [
        `${input} Street, Miami, FL`,
        `${input} Avenue, Orlando, FL`,
        `${input} Boulevard, Tampa, FL`,
        `${input} Road, Jacksonville, FL`,
        `${input} Lane, Tallahassee, FL`
      ];

      setSuggestions(mockSuggestions);
    } catch (error) {
      console.error('Error fetching address suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  // Debounce function to limit API calls
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAddressSuggestions(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);
  };

  const handleSelectAddress = (address: string) => {
    setQuery(address);
    onAddressSelect(address);
    setShowSuggestions(false);
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        onFocus={() => setShowSuggestions(true)}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${className}`}
        aria-label="Address"
      />
      
      {isLoading && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 rounded-full border-t-transparent"></div>
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <motion.ul
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              onClick={() => handleSelectAddress(suggestion)}
              className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
            >
              {suggestion}
            </li>
          ))}
        </motion.ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;
