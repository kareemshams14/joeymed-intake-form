'use client';

import { motion } from 'framer-motion';
import { FormData } from '../IntakeForm';
import Button from '../ui/Button';

interface DisqualificationCardProps {
  reason: string;
}

const DisqualificationCard = ({ 
  reason 
}: DisqualificationCardProps) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 md:p-10 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <div className="w-20 h-20 mx-auto mb-6">
          <img 
            src="https://img.icons8.com/fluency/96/cancel.png" 
            alt="Disqualification Icon" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <h2 className="text-3xl font-bold text-deep-blue mb-4">We're Sorry</h2>
        
        <p className="text-red-500 text-xl mb-4">{reason}</p>
        
        <p className="text-gray-600 mb-8">
          JoeyMed services are currently only available to Florida residents who are 18 years of age or older.
        </p>
        
        <a 
          href="https://joey-med.square.site/" 
          className="inline-block bg-joey-blue text-white font-semibold py-3 px-6 rounded-lg hover:bg-deep-blue transition-colors"
        >
          Return to JoeyMed
        </a>
      </motion.div>
    </div>
  );
};

export default DisqualificationCard;
