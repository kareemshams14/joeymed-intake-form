'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface BMICalculatorProps {
  onBMICalculated: (bmi: number, category: string) => void;
  className?: string;
}

const BMICalculator: React.FC<BMICalculatorProps> = ({
  onBMICalculated,
  className = ""
}) => {
  const [height, setHeight] = useState<number | ''>('');
  const [weight, setWeight] = useState<number | ''>('');
  const [heightUnit, setHeightUnit] = useState<'in' | 'cm'>('in');
  const [weightUnit, setWeightUnit] = useState<'lb' | 'kg'>('lb');
  const [bmi, setBMI] = useState<number | null>(null);
  const [bmiCategory, setBMICategory] = useState<string>('');
  const [targetWeight, setTargetWeight] = useState<number | ''>('');
  const [weeksToTarget, setWeeksToTarget] = useState<number | null>(null);

  // Calculate BMI when height or weight changes
  useEffect(() => {
    if (height && weight) {
      calculateBMI();
    } else {
      setBMI(null);
      setBMICategory('');
    }
  }, [height, weight, heightUnit, weightUnit]);

  // Calculate weeks to target weight when target weight changes
  useEffect(() => {
    if (weight && targetWeight && typeof weight === 'number' && typeof targetWeight === 'number' && weight > targetWeight) {
      // Calculate weeks based on 1-2 pounds per week (using 1.5 as average)
      const weightDiff = weightUnit === 'lb' ? weight - targetWeight : (weight - targetWeight) * 2.20462;
      const weeks = Math.ceil(weightDiff / 1.5);
      setWeeksToTarget(weeks);
    } else {
      setWeeksToTarget(null);
    }
  }, [weight, targetWeight, weightUnit]);

  const calculateBMI = () => {
    if (typeof height !== 'number' || typeof weight !== 'number') return;
    
    let bmiValue: number;
    
    // Convert to metric for BMI calculation if needed
    if (heightUnit === 'in' && weightUnit === 'lb') {
      // BMI = (weight in pounds * 703) / (height in inches)²
      bmiValue = (weight * 703) / (height * height);
    } else if (heightUnit === 'in' && weightUnit === 'kg') {
      // Convert height to meters: inches * 0.0254 = meters
      const heightInMeters = height * 0.0254;
      bmiValue = weight / (heightInMeters * heightInMeters);
    } else if (heightUnit === 'cm' && weightUnit === 'lb') {
      // Convert height to meters and weight to kg
      const heightInMeters = height / 100;
      const weightInKg = weight / 2.20462;
      bmiValue = weightInKg / (heightInMeters * heightInMeters);
    } else {
      // Both are metric (cm and kg)
      const heightInMeters = height / 100;
      bmiValue = weight / (heightInMeters * heightInMeters);
    }
    
    // Round to 1 decimal place
    bmiValue = Math.round(bmiValue * 10) / 10;
    
    // Determine BMI category
    let category = '';
    if (bmiValue < 18.5) {
      category = 'Underweight';
    } else if (bmiValue >= 18.5 && bmiValue < 25) {
      category = 'Normal weight';
    } else if (bmiValue >= 25 && bmiValue < 30) {
      category = 'Overweight';
    } else {
      category = 'Obese';
    }
    
    setBMI(bmiValue);
    setBMICategory(category);
    onBMICalculated(bmiValue, category);
  };

  const getBMICategoryColor = () => {
    if (!bmiCategory) return 'bg-gray-200';
    
    switch (bmiCategory) {
      case 'Underweight':
        return 'bg-yellow-400';
      case 'Normal weight':
        return 'bg-green-500';
      case 'Overweight':
        return 'bg-orange-500';
      case 'Obese':
        return 'bg-red-500';
      default:
        return 'bg-gray-200';
    }
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Height</label>
          <div className="flex">
            <input
              type="number"
              value={height}
              onChange={(e) => setHeight(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder={heightUnit === 'in' ? "Height in inches" : "Height in centimeters"}
            />
            <select
              value={heightUnit}
              onChange={(e) => setHeightUnit(e.target.value as 'in' | 'cm')}
              className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50"
            >
              <option value="in">in</option>
              <option value="cm">cm</option>
            </select>
          </div>
        </div>
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Weight</label>
          <div className="flex">
            <input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value ? parseFloat(e.target.value) : '')}
              className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
              placeholder={weightUnit === 'lb' ? "Weight in pounds" : "Weight in kilograms"}
            />
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value as 'lb' | 'kg')}
              className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50"
            >
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
          </div>
        </div>
      </div>
      
      {bmi !== null && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-medium text-lg mb-2">Your BMI Results</h3>
          
          <div className="flex items-center mb-4">
            <div className="text-3xl font-bold mr-3">{bmi}</div>
            <div className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getBMICategoryColor()}`}>
              {bmiCategory}
            </div>
          </div>
          
          <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full flex">
              <div className="h-full bg-yellow-400" style={{ width: '18.5%' }}></div>
              <div className="h-full bg-green-500" style={{ width: '6.5%' }}></div>
              <div className="h-full bg-orange-500" style={{ width: '5%' }}></div>
              <div className="h-full bg-red-500" style={{ width: '70%' }}></div>
            </div>
          </div>
          
          <div className="flex justify-between text-xs mt-1 text-gray-600">
            <span>16</span>
            <span>18.5</span>
            <span>25</span>
            <span>30</span>
            <span>40+</span>
          </div>
          
          <div className="mt-4">
            <p className="text-sm text-gray-700">
              {bmiCategory === 'Underweight' && 'You are underweight. Consider consulting with a healthcare provider about healthy weight gain strategies.'}
              {bmiCategory === 'Normal weight' && 'Your weight is within the normal range. Maintain your healthy habits!'}
              {bmiCategory === 'Overweight' && 'You are overweight. Consider our weight loss program to help you reach a healthier weight.'}
              {bmiCategory === 'Obese' && 'Your BMI indicates obesity. Our weight loss program can help you achieve a healthier weight under medical supervision.'}
            </p>
          </div>
        </motion.div>
      )}
      
      {bmi !== null && (bmiCategory === 'Overweight' || bmiCategory === 'Obese') && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 rounded-lg border border-blue-100"
        >
          <h3 className="font-medium text-lg mb-3">Weight Loss Planning</h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Target Weight</label>
              <div className="flex">
                <input
                  type="number"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(e.target.value ? parseFloat(e.target.value) : '')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder={`Target weight in ${weightUnit}`}
                />
                <span className="px-3 py-2 border border-l-0 border-gray-300 rounded-r-md bg-gray-50">
                  {weightUnit}
                </span>
              </div>
            </div>
            
            {weeksToTarget && (
              <div className="bg-white p-3 rounded-md border border-gray-200">
                <p className="text-sm text-gray-700">
                  Based on a healthy weight loss rate of 1-2 pounds per week, it would take approximately <span className="font-bold text-blue-600">{weeksToTarget} weeks</span> to reach your target weight of {targetWeight} {weightUnit}.
                </p>
                
                <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500 rounded-full" 
                    style={{ 
                      width: typeof weight === 'number' && typeof targetWeight === 'number' ? 
                        `${100 - (((weight - targetWeight) / weight) * 100)}%` : '0%' 
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-gray-600">Target: {targetWeight} {weightUnit}</span>
                  <span className="text-gray-600">Current: {weight} {weightUnit}</span>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BMICalculator;
