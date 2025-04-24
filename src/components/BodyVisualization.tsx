import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface BodyVisualizationProps {
  height: { feet: number; inches: number };
  currentWeight: number;
  targetWeight: number;
  gender?: 'male' | 'female';
}

const BodyVisualization: React.FC<BodyVisualizationProps> = ({
  height,
  currentWeight,
  targetWeight,
  gender = 'male'
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showTarget, setShowTarget] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);

  // Calculate BMI for both current and target weights
  const calculateBMI = (weight: number) => {
    const totalInches = (height.feet * 12) + height.inches;
    return (weight / (totalInches * totalInches)) * 703;
  };

  const currentBMI = calculateBMI(currentWeight);
  const targetBMI = calculateBMI(targetWeight);

  // Determine body type based on BMI
  const getBodyType = (bmi: number) => {
    if (bmi < 18.5) return 'underweight';
    if (bmi >= 18.5 && bmi < 25) return 'normal';
    if (bmi >= 25 && bmi < 30) return 'overweight';
    return 'obese';
  };

  const currentBodyType = getBodyType(currentBMI);
  const targetBodyType = getBodyType(targetBMI);

  // Handle mouse/touch events for rotation
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsRotating(true);
    startX.current = e.clientX;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsRotating(true);
    startX.current = e.touches[0].clientX;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isRotating) return;
    const deltaX = e.clientX - startX.current;
    setRotationAngle(prev => (prev + deltaX * 0.5) % 360);
    startX.current = e.clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isRotating) return;
    const deltaX = e.touches[0].clientX - startX.current;
    setRotationAngle(prev => (prev + deltaX * 0.5) % 360);
    startX.current = e.touches[0].clientX;
  };

  const handleMouseUp = () => {
    setIsRotating(false);
  };

  const handleTouchEnd = () => {
    setIsRotating(false);
  };

  // Add and remove event listeners
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseLeave = () => {
      setIsRotating(false);
    };

    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Get body silhouette based on body type and gender
  const getBodySilhouette = (bodyType: string, gender: string) => {
    // In a real implementation, these would be actual SVG paths or 3D models
    // For this example, we'll use placeholder representations
    
    const silhouettes = {
      male: {
        underweight: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C40,50 35,60 35,70 L35,120 C35,130 30,140 25,150 L20,200 L30,200 L35,250 L40,250 L45,300 L55,300 L60,250 L65,250 L70,200 L80,200 L75,150 C70,140 65,130 65,120 L65,70 C65,60 60,50 50,50 Z" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
          </svg>
        `,
        normal: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C38,50 32,60 32,70 L32,120 C32,130 27,140 22,150 L17,200 L27,200 L32,250 L37,250 L42,300 L58,300 L63,250 L68,250 L73,200 L83,200 L78,150 C73,140 68,130 68,120 L68,70 C68,60 62,50 50,50 Z" fill="#10b981" stroke="#059669" stroke-width="2"/>
          </svg>
        `,
        overweight: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C35,50 25,60 25,70 L25,120 C25,130 20,140 15,150 L10,200 L20,200 L25,250 L30,250 L35,300 L65,300 L70,250 L75,250 L80,200 L90,200 L85,150 C80,140 75,130 75,120 L75,70 C75,60 65,50 50,50 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
          </svg>
        `,
        obese: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C30,50 20,60 20,70 L20,120 C20,130 15,140 10,150 L5,200 L15,200 L20,250 L25,250 L30,300 L70,300 L75,250 L80,250 L85,200 L95,200 L90,150 C85,140 80,130 80,120 L80,70 C80,60 70,50 50,50 Z" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
          </svg>
        `
      },
      female: {
        underweight: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C42,50 38,60 38,70 L38,100 C38,110 45,120 50,125 C55,120 62,110 62,100 L62,70 C62,60 58,50 50,50 Z M38,100 L38,120 C38,130 33,140 28,150 L23,200 L33,200 L38,250 L43,250 L48,300 L52,300 L57,250 L62,250 L67,200 L77,200 L72,150 C67,140 62,130 62,120 L62,100 Z" fill="#3b82f6" stroke="#2563eb" stroke-width="2"/>
          </svg>
        `,
        normal: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C40,50 35,60 35,70 L35,100 C35,110 42,120 50,125 C58,120 65,110 65,100 L65,70 C65,60 60,50 50,50 Z M35,100 L35,120 C35,130 30,140 25,150 L20,200 L30,200 L35,250 L40,250 L45,300 L55,300 L60,250 L65,250 L70,200 L80,200 L75,150 C70,140 65,130 65,120 L65,100 Z" fill="#10b981" stroke="#059669" stroke-width="2"/>
          </svg>
        `,
        overweight: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C37,50 30,60 30,70 L30,100 C30,110 40,120 50,125 C60,120 70,110 70,100 L70,70 C70,60 63,50 50,50 Z M30,100 L30,120 C30,130 25,140 20,150 L15,200 L25,200 L30,250 L35,250 L40,300 L60,300 L65,250 L70,250 L75,200 L85,200 L80,150 C75,140 70,130 70,120 L70,100 Z" fill="#f59e0b" stroke="#d97706" stroke-width="2"/>
          </svg>
        `,
        obese: `
          <svg viewBox="0 0 100 300" xmlns="http://www.w3.org/2000/svg">
            <path d="M50,50 C35,50 25,60 25,70 L25,100 C25,110 35,120 50,125 C65,120 75,110 75,100 L75,70 C75,60 65,50 50,50 Z M25,100 L25,120 C25,130 20,140 15,150 L10,200 L20,200 L25,250 L30,250 L35,300 L65,300 L70,250 L75,250 L80,200 L90,200 L85,150 C80,140 75,130 75,120 L75,100 Z" fill="#ef4444" stroke="#dc2626" stroke-width="2"/>
          </svg>
        `
      }
    };
    
    return silhouettes[gender][bodyType];
  };

  return (
    <div className="body-visualization">
      <div className="visualization-header">
        <h3>Body Visualization</h3>
        <p className="visualization-subtitle">
          Interactive 3D model based on your measurements
        </p>
      </div>
      
      <div className="visualization-controls">
        <button 
          className={`control-button ${!showTarget ? 'active' : ''}`}
          onClick={() => setShowTarget(false)}
        >
          Current
        </button>
        <button 
          className={`control-button ${showTarget ? 'active' : ''}`}
          onClick={() => setShowTarget(true)}
        >
          Target
        </button>
      </div>
      
      <motion.div 
        className="visualization-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div 
          className="body-model"
          style={{ 
            transform: `rotateY(${rotationAngle}deg)`,
            cursor: isRotating ? 'grabbing' : 'grab'
          }}
          dangerouslySetInnerHTML={{ 
            __html: showTarget 
              ? getBodySilhouette(targetBodyType, gender) 
              : getBodySilhouette(currentBodyType, gender) 
          }}
        />
        
        <div className="rotation-instructions">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 12a9 9 0 1 0 18 0 9 9 0 0 0-18 0z"></path>
            <path d="M17 12H3"></path>
            <path d="m11 6-4 6 4 6"></path>
          </svg>
          <span>Drag to rotate</span>
        </div>
      </motion.div>
      
      <div className="visualization-details">
        <div className="detail-row">
          <div className="detail-label">Height:</div>
          <div className="detail-value">{height.feet}'{height.inches}"</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Current Weight:</div>
          <div className="detail-value">{currentWeight} lbs</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Current BMI:</div>
          <div className="detail-value">{currentBMI.toFixed(1)}</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Target Weight:</div>
          <div className="detail-value">{targetWeight} lbs</div>
        </div>
        <div className="detail-row">
          <div className="detail-label">Target BMI:</div>
          <div className="detail-value">{targetBMI.toFixed(1)}</div>
        </div>
      </div>
      
      <div className="visualization-note">
        <p>This visualization is an approximation based on height, weight, and BMI. Individual body compositions may vary.</p>
      </div>
    </div>
  );
};

export default BodyVisualization;
