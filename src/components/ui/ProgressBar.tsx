'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar = ({ 
  currentStep, 
  totalSteps 
}: ProgressBarProps) => {
  // Calculate progress percentage
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="flex items-center gap-3">
      <div className="w-40 h-2 bg-gray-200 rounded-full overflow-hidden">
        <motion.div 
          className="h-full bg-joey-blue"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
      </div>
      <div className="text-sm text-gray-600 font-medium">
        {currentStep}/{totalSteps}
      </div>
    </div>
  );
};

export default ProgressBar;
