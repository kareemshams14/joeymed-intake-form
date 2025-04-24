import React, { useState, useEffect } from 'react';
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
}

const WeightLossGraph: React.FC<WeightLossGraphProps> = ({
  currentWeight,
  targetWeight
}) => {
  const [weightData, setWeightData] = useState<any[]>([]);
  const [weeksTillTarget, setWeeksTillTarget] = useState<number>(0);
  
  useEffect(() => {
    generateWeightLossProjection();
  }, [currentWeight, targetWeight]);
  
  const generateWeightLossProjection = () => {
    // Safety check
    if (currentWeight <= targetWeight) {
      setWeightData([
        { week: 0, weight: currentWeight, target: targetWeight }
      ]);
      setWeeksTillTarget(0);
      return;
    }
    
    // Calculate weight difference
    const weightDifference = currentWeight - targetWeight;
    
    // Calculate weeks needed based on 1-2 pounds per week (using 1.5 as average)
    // 1 pound = 0.45359237 kg
    const weeksTillTargetCalc = Math.ceil(weightDifference / 1.5);
    setWeeksTillTarget(weeksTillTargetCalc);
    
    // Generate weekly projection data
    const data = [];
    const weeklyLoss = weightDifference / weeksTillTargetCalc;
    
    for (let week = 0; week <= weeksTillTargetCalc; week++) {
      const projectedWeight = currentWeight - (weeklyLoss * week);
      data.push({
        week: week,
        weight: Math.round(projectedWeight * 10) / 10,
        target: targetWeight
      });
    }
    
    setWeightData(data);
  };
  
  const formatDate = (weeksFromNow: number) => {
    const date = new Date();
    date.setDate(date.getDate() + (weeksFromNow * 7));
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };
  
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="weight-tooltip">
          <p className="tooltip-date">{formatDate(label)}</p>
          <p className="tooltip-weight">
            Projected Weight: <span>{payload[0].value} lbs</span>
          </p>
          <p className="tooltip-target">
            Target: <span>{payload[1].value} lbs</span>
          </p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <div className="weight-loss-graph">
      <div className="graph-header">
        <h3>Your Weight Loss Journey</h3>
        <p className="graph-subtitle">
          Based on a healthy rate of 1-2 pounds per week
        </p>
      </div>
      
      <div className="graph-stats">
        <div className="stat-item">
          <span className="stat-label">Current</span>
          <span className="stat-value">{currentWeight} lbs</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Target</span>
          <span className="stat-value">{targetWeight} lbs</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">To Lose</span>
          <span className="stat-value">{currentWeight - targetWeight} lbs</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Timeline</span>
          <span className="stat-value">{weeksTillTarget} weeks</span>
        </div>
      </div>
      
      <motion.div 
        className="graph-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={weightData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="week" 
              label={{ value: 'Weeks', position: 'insideBottomRight', offset: -10 }}
              tickFormatter={(week) => formatDate(week)}
            />
            <YAxis 
              domain={[
                Math.min(targetWeight - 5, Math.floor(targetWeight * 0.95)),
                Math.max(currentWeight + 5, Math.ceil(currentWeight * 1.05))
              ]}
              label={{ value: 'Weight (lbs)', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
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
              dataKey="target" 
              stroke="#10b981" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Target Weight"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
      
      <div className="weight-milestones">
        <h4>Key Milestones</h4>
        <div className="milestones-list">
          {weightData.filter((data, index) => 
            index > 0 && index % 4 === 0 && index < weightData.length - 1
          ).map((data, index) => (
            <div key={index} className="milestone-item">
              <div className="milestone-date">{formatDate(data.week)}</div>
              <div className="milestone-weight">{data.weight} lbs</div>
              <div className="milestone-progress">
                {Math.round(((currentWeight - data.weight) / (currentWeight - targetWeight)) * 100)}% complete
              </div>
            </div>
          ))}
          {weightData.length > 1 && (
            <div className="milestone-item target">
              <div className="milestone-date">{formatDate(weightData[weightData.length - 1].week)}</div>
              <div className="milestone-weight">{targetWeight} lbs</div>
              <div className="milestone-progress">Goal achieved!</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeightLossGraph;
