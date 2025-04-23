'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';
import { isValidEmail, isValidPhone, isValidFloridaZip, isValidAge } from '@/lib/validation';

interface BasicInfoCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
  onDisqualify: (reason: string) => void;
}

const BasicInfoCard = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev,
  onDisqualify 
}: BasicInfoCardProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentField, setCurrentField] = useState<string>('fullName');
  
  // Handle input change
  const handleInputChange = (field: string, value: string) => {
    updateFormData({ [field]: value });
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };
  
  // Handle gender selection
  const handleGenderSelect = (value: string) => {
    updateFormData({ gender: value });
    
    // Clear error for this field
    if (errors.gender) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.gender;
        return newErrors;
      });
    }
  };
  
  // Validate current field and move to next
  const validateAndProceed = (nextField: string) => {
    let isValid = true;
    const newErrors: Record<string, string> = {};
    
    // Validate current field
    switch (currentField) {
      case 'fullName':
        if (!formData.fullName.trim()) {
          newErrors.fullName = 'Please enter your full name';
          isValid = false;
        }
        break;
      case 'email':
        if (!formData.email.trim()) {
          newErrors.email = 'Please enter your email address';
          isValid = false;
        } else if (!isValidEmail(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        }
        break;
      case 'phone':
        if (!formData.phone.trim()) {
          newErrors.phone = 'Please enter your phone number';
          isValid = false;
        } else if (!isValidPhone(formData.phone)) {
          newErrors.phone = 'Please enter a valid phone number';
          isValid = false;
        }
        break;
      case 'address':
        if (!formData.address.trim()) {
          newErrors.address = 'Please enter your street address';
          isValid = false;
        }
        break;
      case 'city':
        if (!formData.city.trim()) {
          newErrors.city = 'Please enter your city';
          isValid = false;
        }
        break;
      case 'zipCode':
        if (!formData.zipCode.trim()) {
          newErrors.zipCode = 'Please enter your ZIP code';
          isValid = false;
        } else if (!isValidFloridaZip(formData.zipCode)) {
          newErrors.zipCode = 'Please enter a valid Florida ZIP code';
          isValid = false;
          onDisqualify('We apologize, but JoeyMed services are only available to Florida residents.');
          return;
        }
        break;
      case 'dateOfBirth':
        if (!formData.dateOfBirth) {
          newErrors.dateOfBirth = 'Please enter your date of birth';
          isValid = false;
        } else if (!isValidAge(formData.dateOfBirth)) {
          newErrors.dateOfBirth = 'You must be 18 years or older to use JoeyMed services';
          isValid = false;
          onDisqualify('We apologize, but JoeyMed services are only available to individuals 18 years of age or older.');
          return;
        }
        break;
      case 'gender':
        if (!formData.gender) {
          newErrors.gender = 'Please select your gender';
          isValid = false;
        }
        break;
    }
    
    // Update errors
    setErrors(newErrors);
    
    // If valid, move to next field
    if (isValid) {
      setCurrentField(nextField);
    }
  };
  
  // Check if all required fields are filled and valid
  const isComplete = () => {
    return (
      formData.fullName.trim() !== '' &&
      formData.email.trim() !== '' && isValidEmail(formData.email) &&
      formData.phone.trim() !== '' && isValidPhone(formData.phone) &&
      formData.address.trim() !== '' &&
      formData.city.trim() !== '' &&
      formData.zipCode.trim() !== '' && isValidFloridaZip(formData.zipCode) &&
      formData.dateOfBirth !== '' && isValidAge(formData.dateOfBirth) &&
      formData.gender !== null
    );
  };
  
  // Handle next button click
  const handleNext = () => {
    if (isComplete()) {
      onNext();
    } else {
      // Find the first incomplete field and focus on it
      if (!formData.fullName.trim()) {
        setCurrentField('fullName');
      } else if (!formData.email.trim() || !isValidEmail(formData.email)) {
        setCurrentField('email');
      } else if (!formData.phone.trim() || !isValidPhone(formData.phone)) {
        setCurrentField('phone');
      } else if (!formData.address.trim()) {
        setCurrentField('address');
      } else if (!formData.city.trim()) {
        setCurrentField('city');
      } else if (!formData.zipCode.trim() || !isValidFloridaZip(formData.zipCode)) {
        setCurrentField('zipCode');
      } else if (!formData.dateOfBirth || !isValidAge(formData.dateOfBirth)) {
        setCurrentField('dateOfBirth');
      } else if (!formData.gender) {
        setCurrentField('gender');
      }
    }
  };
  
  // Render the current field
  const renderCurrentField = () => {
    switch (currentField) {
      case 'fullName':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your full name?</h3>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.fullName ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="text-red-500 mt-2 text-sm">{errors.fullName}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={onPrev} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('email')} 
                disabled={!formData.fullName.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'email':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your email address?</h3>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your email address"
            />
            {errors.email && (
              <p className="text-red-500 mt-2 text-sm">{errors.email}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('fullName')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('phone')} 
                disabled={!formData.email.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'phone':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your phone number?</h3>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your phone number"
            />
            {errors.phone && (
              <p className="text-red-500 mt-2 text-sm">{errors.phone}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('email')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('address')} 
                disabled={!formData.phone.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'address':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your street address?</h3>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.address ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your street address"
            />
            {errors.address && (
              <p className="text-red-500 mt-2 text-sm">{errors.address}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('phone')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('city')} 
                disabled={!formData.address.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'city':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your city?</h3>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.city ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your city"
            />
            {errors.city && (
              <p className="text-red-500 mt-2 text-sm">{errors.city}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('address')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('zipCode')} 
                disabled={!formData.city.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'zipCode':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your ZIP code?</h3>
            <input
              type="text"
              value={formData.zipCode}
              onChange={(e) => handleInputChange('zipCode', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.zipCode ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Enter your ZIP code"
            />
            {errors.zipCode && (
              <p className="text-red-500 mt-2 text-sm">{errors.zipCode}</p>
            )}
            <p className="text-gray-500 mt-2 text-sm italic">
              JoeyMed services are only available to Florida residents.
            </p>
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('city')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('dateOfBirth')} 
                disabled={!formData.zipCode.trim()}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'dateOfBirth':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your date of birth?</h3>
            <input
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
              className={`w-full p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-joey-blue ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-200'
              }`}
            />
            {errors.dateOfBirth && (
              <p className="text-red-500 mt-2 text-sm">{errors.dateOfBirth}</p>
            )}
            <p className="text-gray-500 mt-2 text-sm italic">
              You must be 18 years or older to use JoeyMed services.
            </p>
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('zipCode')} variant="secondary">Back</Button>
              <Button 
                onClick={() => validateAndProceed('gender')} 
                disabled={!formData.dateOfBirth}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      case 'gender':
        return (
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-4">What is your gender?</h3>
            <div className="space-y-3">
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.gender === 'male' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleGenderSelect('male')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.gender === 'male' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.gender === 'male' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>Male</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.gender === 'female' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleGenderSelect('female')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.gender === 'female' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.gender === 'female' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>Female</span>
                </div>
              </div>
              
              <div 
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  formData.gender === 'other' 
                    ? 'border-joey-blue bg-blue-50' 
                    : 'border-gray-200 hover:border-joey-blue'
                }`}
                onClick={() => handleGenderSelect('other')}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    formData.gender === 'other' ? 'border-joey-blue' : 'border-gray-300'
                  }`}>
                    {formData.gender === 'other' && (
                      <div className="w-3 h-3 rounded-full bg-joey-blue"></div>
                    )}
                  </div>
                  <span>Other</span>
                </div>
              </div>
            </div>
            {errors.gender && (
              <p className="text-red-500 mt-2 text-sm">{errors.gender}</p>
            )}
            <div className="flex justify-between mt-8">
              <Button onClick={() => setCurrentField('dateOfBirth')} variant="secondary">Back</Button>
              <Button 
                onClick={handleNext} 
                disabled={!formData.gender}
              >
                Continue
              </Button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">Basic Information</h2>
      <p className="text-gray-600 mb-10 text-center">
        Please provide your personal information.
      </p>
      
      <motion.div
        key={currentField}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {renderCurrentField()}
      </motion.div>
    </div>
  );
};

export default BasicInfoCard;
