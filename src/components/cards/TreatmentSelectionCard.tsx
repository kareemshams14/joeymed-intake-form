'use client';

import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';

interface TreatmentSelectionCardProps {
  formData: FormData;
  updateFormData: (data: Partial<FormData>) => void;
  onNext: () => void;
  onPrev: () => void;
}

const TreatmentSelectionCard = ({ 
  formData, 
  updateFormData, 
  onNext, 
  onPrev 
}: TreatmentSelectionCardProps) => {
  
  // Handle treatment selection
  const handleTreatmentSelect = (value: string) => {
    updateFormData({ selectedTreatment: value });
  };
  
  // Check if treatment is selected
  const isComplete = () => {
    return formData.selectedTreatment !== null;
  };
  
  // Handle next button click
  const handleNext = () => {
    if (isComplete()) {
      onNext();
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10">
      <h2 className="text-3xl font-bold text-deep-blue mb-6 text-center">Treatment Selection</h2>
      <p className="text-gray-600 mb-10 text-center">
        Please select the treatment you're interested in.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        {/* Weight Loss */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.selectedTreatment === 'weight-loss' 
              ? 'border-joey-blue bg-blue-50' 
              : 'border-gray-200 hover:border-joey-blue'
          }`}
          onClick={() => handleTreatmentSelect('weight-loss')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <img 
                src="https://img.icons8.com/fluency/96/scale.png" 
                alt="Weight Loss Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Weight Loss</h3>
            <p className="text-sm text-gray-600">
              Personalized weight loss plans to help you achieve your goals.
            </p>
          </div>
        </motion.div>
        
        {/* Erectile Dysfunction */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.selectedTreatment === 'erectile-dysfunction' 
              ? 'border-joey-blue bg-blue-50' 
              : 'border-gray-200 hover:border-joey-blue'
          }`}
          onClick={() => handleTreatmentSelect('erectile-dysfunction')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <img 
                src="https://img.icons8.com/fluency/96/health-data.png" 
                alt="Erectile Dysfunction Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Erectile Dysfunction</h3>
            <p className="text-sm text-gray-600">
              Effective treatments for erectile dysfunction.
            </p>
          </div>
        </motion.div>
        
        {/* Sexual Health */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.selectedTreatment === 'sexual-health' 
              ? 'border-joey-blue bg-blue-50' 
              : 'border-gray-200 hover:border-joey-blue'
          }`}
          onClick={() => handleTreatmentSelect('sexual-health')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <img 
                src="https://img.icons8.com/fluency/96/heart-health.png" 
                alt="Sexual Health Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Sexual Health</h3>
            <p className="text-sm text-gray-600">
              Solutions for female sexual health concerns.
            </p>
          </div>
        </motion.div>
        
        {/* Anti-Aging & Wellness */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.selectedTreatment === 'anti-aging' 
              ? 'border-joey-blue bg-blue-50' 
              : 'border-gray-200 hover:border-joey-blue'
          }`}
          onClick={() => handleTreatmentSelect('anti-aging')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <img 
                src="https://img.icons8.com/fluency/96/anti-aging.png" 
                alt="Anti-Aging Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Anti-Aging & Wellness</h3>
            <p className="text-sm text-gray-600">
              Treatments to help you look and feel your best.
            </p>
          </div>
        </motion.div>
        
        {/* Travel Kits */}
        <motion.div 
          whileHover={{ y: -5 }}
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            formData.selectedTreatment === 'travel-kit' 
              ? 'border-joey-blue bg-blue-50' 
              : 'border-gray-200 hover:border-joey-blue'
          }`}
          onClick={() => handleTreatmentSelect('travel-kit')}
        >
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-4">
              <img 
                src="https://img.icons8.com/fluency/96/suitcase.png" 
                alt="Travel Kit Icon" 
                className="w-full h-full object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">Travel Kits</h3>
            <p className="text-sm text-gray-600">
              Comprehensive wellness kits for your travels.
            </p>
          </div>
        </motion.div>
      </div>
      
      <div className="flex justify-between mt-8">
        <Button onClick={onPrev} variant="secondary">Back</Button>
        <Button 
          onClick={handleNext} 
          disabled={!isComplete()}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default TreatmentSelectionCard;
