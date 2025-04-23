'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

interface WeightLossGraphProps {
  currentWeight: number;
  targetWeight: number;
  weightUnit: 'lb' | 'kg';
  weeksToTarget: number;
  className?: string;
}

const WeightLossGraph: React.FC<WeightLossGraphProps> = ({
  currentWeight,
  targetWeight,
  weightUnit,
  weeksToTarget,
  className = ""
}) => {
  // Generate weight loss projection data
  const generateWeightLossData = () => {
    if (!currentWeight || !targetWeight || !weeksToTarget || currentWeight <= targetWeight) {
      return [];
    }

    const weightDifference = currentWeight - targetWeight;
    const weeklyLoss = weightDifference / weeksToTarget;
    
    const data = [];
    
    // Start with current weight at week 0
    data.push({
      week: 0,
      weight: currentWeight,
      goal: null
    });
    
    // Generate weekly projections
    for (let week = 1; week <= weeksToTarget; week++) {
      const projectedWeight = currentWeight - (weeklyLoss * week);
      data.push({
        week,
        weight: Math.round(projectedWeight * 10) / 10,
        goal: week === weeksToTarget ? targetWeight : null
      });
    }
    
    return data;
  };

  const data = generateWeightLossData();
  
  if (data.length === 0) {
    return (
      <div className={`p-4 bg-gray-50 rounded-lg text-center ${className}`}>
        <p className="text-gray-500">Please enter valid current and target weights to see your weight loss projection.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 bg-white rounded-lg border border-gray-200 ${className}`}
    >
      <h3 className="font-medium text-lg mb-4">Weight Loss Projection</h3>
      
      <div className="mb-4">
        <p className="text-sm text-gray-700">
          This graph shows your projected weight loss journey from {currentWeight} {weightUnit} to {targetWeight} {weightUnit} over {weeksToTarget} weeks, 
          based on a steady rate of {((currentWeight - targetWeight) / weeksToTarget).toFixed(1)} {weightUnit} per week.
        </p>
      </div>
      
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              label={{ value: 'Weeks', position: 'insideBottomRight', offset: -5 }} 
            />
            <YAxis 
              label={{ value: `Weight (${weightUnit})`, angle: -90, position: 'insideLeft' }}
              domain={[Math.floor(targetWeight * 0.95), Math.ceil(currentWeight * 1.05)]}
            />
            <Tooltip 
              formatter={(value) => [`${value} ${weightUnit}`, 'Weight']}
              labelFormatter={(label) => `Week ${label}`}
            />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="#3b82f6" 
              strokeWidth={2}
              activeDot={{ r: 8 }}
              name="Projected Weight"
            />
            <Line 
              type="monotone" 
              dataKey="goal" 
              stroke="#10b981" 
              strokeWidth={2}
              dot={{ r: 6 }}
              name="Goal Weight"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        <div className="p-2 bg-blue-50 rounded">
          <p className="text-xs text-gray-500">Starting Weight</p>
          <p className="font-bold text-blue-600">{currentWeight} {weightUnit}</p>
        </div>
        <div className="p-2 bg-green-50 rounded">
          <p className="text-xs text-gray-500">Target Weight</p>
          <p className="font-bold text-green-600">{targetWeight} {weightUnit}</p>
        </div>
        <div className="p-2 bg-purple-50 rounded">
          <p className="text-xs text-gray-500">Weekly Loss</p>
          <p className="font-bold text-purple-600">{((currentWeight - targetWeight) / weeksToTarget).toFixed(1)} {weightUnit}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default WeightLossGraph;
