import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface AddressAutocompleteProps {
  onAddressSelect: (address: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
  }) => void;
  initialAddress?: string;
}

interface AddressSuggestion {
  address: string;
  city: string;
  state: string;
  zipCode: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
  onAddressSelect,
  initialAddress = '',
}) => {
  const [inputValue, setInputValue] = useState(initialAddress);
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  // Florida cities with zip codes
  const floridaCities = [
    { city: 'Miami', state: 'FL', zipCodes: ['33101', '33125', '33126', '33127', '33128', '33129', '33130', '33131', '33132', '33133', '33134', '33135'] },
    { city: 'Orlando', state: 'FL', zipCodes: ['32801', '32802', '32803', '32804', '32805', '32806', '32807', '32808', '32809', '32810'] },
    { city: 'Tampa', state: 'FL', zipCodes: ['33601', '33602', '33603', '33604', '33605', '33606', '33607', '33608', '33609', '33610'] },
    { city: 'Jacksonville', state: 'FL', zipCodes: ['32099', '32201', '32202', '32203', '32204', '32205', '32206', '32207', '32208', '32209'] },
    { city: 'Fort Lauderdale', state: 'FL', zipCodes: ['33301', '33302', '33303', '33304', '33305', '33306', '33307', '33308', '33309', '33310'] },
    { city: 'St. Petersburg', state: 'FL', zipCodes: ['33701', '33702', '33703', '33704', '33705', '33706', '33707', '33708', '33709', '33710'] },
    { city: 'Tallahassee', state: 'FL', zipCodes: ['32301', '32302', '32303', '32304', '32305', '32306', '32307', '32308', '32309', '32310'] },
    { city: 'Gainesville', state: 'FL', zipCodes: ['32601', '32602', '32603', '32604', '32605', '32606', '32607', '32608', '32609', '32610'] },
    { city: 'Clearwater', state: 'FL', zipCodes: ['33755', '33756', '33757', '33758', '33759', '33760', '33761', '33762', '33763', '33764'] },
    { city: 'Palm Beach', state: 'FL', zipCodes: ['33401', '33402', '33403', '33404', '33405', '33406', '33407', '33408', '33409', '33410'] },
  ];

  // Common street types
  const streetTypes = ['St', 'Ave', 'Blvd', 'Dr', 'Ln', 'Rd', 'Way', 'Pl', 'Ct', 'Ter'];

  // Generate address suggestions based on input
  const generateSuggestions = (input: string): AddressSuggestion[] => {
    if (!input || input.length < 3) return [];
    
    const inputLower = input.toLowerCase();
    const suggestions: AddressSuggestion[] = [];
    
    // Check if input contains numbers (likely a street address)
    const containsNumbers = /\d/.test(input);
    
    if (containsNumbers) {
      // Generate street address suggestions
      for (const cityData of floridaCities) {
        for (let i = 0; i < 3; i++) { // Limit to 3 suggestions per city
          const streetNumber = Math.floor(Math.random() * 9000) + 1000;
          const streetName = `${getRandomStreetName()} ${streetTypes[Math.floor(Math.random() * streetTypes.length)]}`;
          const zipCode = cityData.zipCodes[Math.floor(Math.random() * cityData.zipCodes.length)];
          
          const address = `${streetNumber} ${streetName}`;
          
          // Only add if it matches the input in some way
          if (address.toLowerCase().includes(inputLower) || 
              cityData.city.toLowerCase().includes(inputLower) ||
              zipCode.includes(input)) {
            suggestions.push({
              address,
              city: cityData.city,
              state: cityData.state,
              zipCode
            });
          }
        }
      }
    } else {
      // Generate city-based suggestions
      for (const cityData of floridaCities) {
        if (cityData.city.toLowerCase().includes(inputLower)) {
          for (let i = 0; i < 3; i++) { // Limit to 3 suggestions per matching city
            const streetNumber = Math.floor(Math.random() * 9000) + 1000;
            const streetName = `${getRandomStreetName()} ${streetTypes[Math.floor(Math.random() * streetTypes.length)]}`;
            const zipCode = cityData.zipCodes[Math.floor(Math.random() * cityData.zipCodes.length)];
            
            suggestions.push({
              address: `${streetNumber} ${streetName}`,
              city: cityData.city,
              state: cityData.state,
              zipCode
            });
          }
        }
      }
    }
    
    // If we have too few suggestions, add some random ones
    if (suggestions.length < 3) {
      const randomCity = floridaCities[Math.floor(Math.random() * floridaCities.length)];
      for (let i = suggestions.length; i < 3; i++) {
        const streetNumber = Math.floor(Math.random() * 9000) + 1000;
        const streetName = `${getRandomStreetName()} ${streetTypes[Math.floor(Math.random() * streetTypes.length)]}`;
        const zipCode = randomCity.zipCodes[Math.floor(Math.random() * randomCity.zipCodes.length)];
        
        suggestions.push({
          address: `${streetNumber} ${streetName}`,
          city: randomCity.city,
          state: randomCity.state,
          zipCode
        });
      }
    }
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions total
  };

  // Random street name generator
  const getRandomStreetName = (): string => {
    const streetNames = [
      'Oak', 'Maple', 'Pine', 'Cedar', 'Elm', 'Main', 'Park', 'Lake', 'Hill', 'River',
      'Washington', 'Jefferson', 'Lincoln', 'Adams', 'Madison', 'Monroe', 'Jackson',
      'Sunset', 'Sunrise', 'Ocean', 'Beach', 'Bay', 'Harbor', 'Island', 'Palm',
      'Magnolia', 'Cypress', 'Willow', 'Birch', 'Aspen'
    ];
    
    return streetNames[Math.floor(Math.random() * streetNames.length)];
  };

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length >= 3) {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        try {
          const newSuggestions = generateSuggestions(value);
          setSuggestions(newSuggestions);
          setShowSuggestions(true);
          setLoading(false);
        } catch (err) {
          console.error('Error generating address suggestions:', err);
          setError('Failed to get address suggestions. Please try again.');
          setLoading(false);
        }
      }, 300);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: AddressSuggestion) => {
    setInputValue(suggestion.address);
    setSuggestions([]);
    setShowSuggestions(false);
    onAddressSelect(suggestion);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current && 
        !inputRef.current.contains(event.target as Node) && 
        suggestionsRef.current && 
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="address-autocomplete">
      <input
        ref={inputRef}
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Start typing your address..."
        className="address-input"
        onFocus={() => inputValue.length >= 3 && setShowSuggestions(true)}
      />
      
      {loading && (
        <div className="loading-indicator">
          <span>Loading suggestions...</span>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <span>{error}</span>
        </div>
      )}
      
      {showSuggestions && suggestions.length > 0 && (
        <motion.div 
          ref={suggestionsRef}
          className="suggestions-container"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              className="suggestion-item"
              onClick={() => handleSuggestionClick(suggestion)}
            >
              <div className="suggestion-address">{suggestion.address}</div>
              <div className="suggestion-details">
                {suggestion.city}, {suggestion.state} {suggestion.zipCode}
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default AddressAutocomplete;
