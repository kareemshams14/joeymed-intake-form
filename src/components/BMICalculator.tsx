import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BMICalculatorProps {
  height: { feet: number; inches: number };
  weight: number;
  onBMICalculated?: (bmi: number, category: string) => void;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({
  height,
  weight,
  onBMICalculated
}) => {
  const [bmi, setBMI] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('#10b981');

  useEffect(() => {
    calculateBMI();
  }, [height, weight]);

  const calculateBMI = () => {
    // Convert height to inches
    const totalInches = (height.feet * 12) + height.inches;
    
    // BMI formula: (weight in pounds) / (height in inches)^2 * 703
    const calculatedBMI = (weight / (totalInches * totalInches)) * 703;
    const roundedBMI = Math.round(calculatedBMI * 10) / 10;
    
    setBMI(roundedBMI);
    
    // Determine BMI category
    let bmiCategory = '';
    let color = '';
    
    if (roundedBMI < 18.5) {
      bmiCategory = 'Underweight';
      color = '#3b82f6'; // blue
    } else if (roundedBMI >= 18.5 && roundedBMI < 25) {
      bmiCategory = 'Healthy Weight';
      color = '#10b981'; // green
    } else if (roundedBMI >= 25 && roundedBMI < 30) {
      bmiCategory = 'Overweight';
      color = '#f59e0b'; // yellow/amber
    } else {
      bmiCategory = 'Obesity';
      color = '#ef4444'; // red
    }
    
    setCategory(bmiCategory);
    setCategoryColor(color);
    
    // Call the callback if provided
    if (onBMICalculated) {
      onBMICalculated(roundedBMI, bmiCategory);
    }
  };

  const getBMIRecommendation = () => {
    switch (category) {
      case 'Underweight':
        return 'Consider consulting with our healthcare providers about healthy weight gain strategies.';
      case 'Healthy Weight':
        return 'Great job maintaining a healthy weight! Our providers can help you maintain your current health.';
      case 'Overweight':
        return 'Our weight management program can help you achieve a healthier weight through personalized treatment.';
      case 'Obesity':
        return 'Our comprehensive weight loss program can significantly improve your health outcomes with medical supervision.';
      default:
        return '';
    }
  };

  return (
    <div className="bmi-calculator">
      <div className="bmi-result">
        <h3>Your BMI</h3>
        <motion.div 
          className="bmi-value"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ color: categoryColor }}
        >
          {bmi.toFixed(1)}
        </motion.div>
        <div className="bmi-category" style={{ color: categoryColor }}>
          {category}
        </div>
      </div>
      
      <div className="bmi-visualization">
        <div className="bmi-scale">
          <div className="bmi-range underweight">
            <span className="range-label">Underweight</span>
            <span className="range-value">&lt;18.5</span>
          </div>
          <div className="bmi-range healthy">
            <span className="range-label">Healthy</span>
            <span className="range-value">18.5-24.9</span>
          </div>
          <div className="bmi-range overweight">
            <span className="range-label">Overweight</span>
            <span className="range-value">25-29.9</span>
          </div>
          <div className="bmi-range obese">
            <span className="range-label">Obesity</span>
            <span className="range-value">30+</span>
          </div>
        </div>
        
        <motion.div 
          className="bmi-indicator"
          initial={{ left: '0%' }}
          animate={{ left: `${Math.min(Math.max((bmi / 40) * 100, 0), 100)}%` }}
          transition={{ type: "spring", stiffness: 100 }}
          style={{ backgroundColor: categoryColor }}
        />
      </div>
      
      <div className="bmi-recommendation">
        <p>{getBMIRecommendation()}</p>
      </div>
    </div>
  );
};

export default BMICalculator;
