'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface BodyVisualizationProps {
  currentWeight?: number;
  targetWeight?: number;
  weightUnit?: 'lb' | 'kg';
  height?: number;
  heightUnit?: 'in' | 'cm';
  className?: string;
}

const BodyVisualization: React.FC<BodyVisualizationProps> = ({
  currentWeight,
  targetWeight,
  weightUnit = 'lb',
  height,
  heightUnit = 'in',
  className = ""
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [viewMode, setViewMode] = useState<'current' | 'target' | 'comparison'>('comparison');

  // Convert height to inches for calculations
  const getHeightInInches = (): number => {
    if (!height) return 70; // Default height (5'10")
    
    if (heightUnit === 'cm') {
      return height / 2.54;
    }
    return height;
  };

  // Convert weight to pounds for calculations
  const getWeightInPounds = (weight: number | undefined): number => {
    if (!weight) return 180; // Default weight
    
    if (weightUnit === 'kg') {
      return weight * 2.20462;
    }
    return weight;
  };

  // Calculate BMI
  const calculateBMI = (weightLbs: number, heightInches: number): number => {
    return (weightLbs * 703) / (heightInches * heightInches);
  };

  // Draw body shape based on height and weight
  const drawBody = (
    ctx: CanvasRenderingContext2D, 
    heightInches: number, 
    weightLbs: number, 
    color: string,
    alpha: number = 1
  ) => {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    
    // Calculate body proportions based on BMI
    const bmi = calculateBMI(weightLbs, heightInches);
    
    // Scale height to fit canvas
    const scaleFactor = canvas.height / (heightInches * 1.2);
    const scaledHeight = heightInches * scaleFactor;
    
    // Calculate body width based on BMI
    let bodyWidthFactor = 0.2;
    if (bmi < 18.5) {
      bodyWidthFactor = 0.15; // Underweight
    } else if (bmi >= 18.5 && bmi < 25) {
      bodyWidthFactor = 0.2; // Normal weight
    } else if (bmi >= 25 && bmi < 30) {
      bodyWidthFactor = 0.25; // Overweight
    } else {
      bodyWidthFactor = 0.3; // Obese
    }
    
    // Apply 3D effect with rotation
    const bodyWidth = scaledHeight * bodyWidthFactor;
    const perspectiveWidth = bodyWidth * Math.abs(Math.cos(rotation));
    
    ctx.save();
    ctx.globalAlpha = alpha;
    
    // Draw head
    const headRadius = scaledHeight * 0.07;
    ctx.beginPath();
    ctx.arc(centerX, headRadius + 20, headRadius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
    
    // Draw body
    ctx.beginPath();
    
    // Neck
    const neckY = headRadius * 2 + 20;
    const neckWidth = headRadius * 0.8;
    
    // Shoulders
    const shoulderY = neckY + scaledHeight * 0.05;
    const shoulderWidth = perspectiveWidth * 1.2;
    
    // Waist
    const waistY = shoulderY + scaledHeight * 0.25;
    const waistWidth = perspectiveWidth * 0.9;
    
    // Hips
    const hipY = waistY + scaledHeight * 0.1;
    const hipWidth = perspectiveWidth * (bmi >= 25 ? 1.1 : 1.0);
    
    // Legs
    const legY = hipY + scaledHeight * 0.1;
    const legBottom = scaledHeight;
    const legWidth = perspectiveWidth * 0.5;
    
    // Draw torso (trapezoid shape)
    ctx.beginPath();
    ctx.moveTo(centerX - neckWidth, neckY);
    ctx.lineTo(centerX - shoulderWidth, shoulderY);
    ctx.lineTo(centerX - waistWidth, waistY);
    ctx.lineTo(centerX - hipWidth, hipY);
    ctx.lineTo(centerX - legWidth, legY);
    ctx.lineTo(centerX + legWidth, legY);
    ctx.lineTo(centerX + hipWidth, hipY);
    ctx.lineTo(centerX + waistWidth, waistY);
    ctx.lineTo(centerX + shoulderWidth, shoulderY);
    ctx.lineTo(centerX + neckWidth, neckY);
    ctx.closePath();
    ctx.fill();
    
    // Draw legs
    ctx.beginPath();
    ctx.moveTo(centerX - legWidth, legY);
    ctx.lineTo(centerX - legWidth, legBottom);
    ctx.lineTo(centerX - legWidth/3, legBottom);
    ctx.lineTo(centerX - legWidth/3, legY);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX + legWidth/3, legY);
    ctx.lineTo(centerX + legWidth/3, legBottom);
    ctx.lineTo(centerX + legWidth, legBottom);
    ctx.lineTo(centerX + legWidth, legY);
    ctx.closePath();
    ctx.fill();
    
    // Draw arms
    const armTop = shoulderY + scaledHeight * 0.02;
    const armBottom = waistY + scaledHeight * 0.1;
    const armWidth = perspectiveWidth * 0.2;
    
    ctx.beginPath();
    ctx.moveTo(centerX - shoulderWidth, armTop);
    ctx.lineTo(centerX - shoulderWidth - armWidth, armTop + scaledHeight * 0.05);
    ctx.lineTo(centerX - shoulderWidth - armWidth, armBottom);
    ctx.lineTo(centerX - shoulderWidth + armWidth, armBottom);
    ctx.lineTo(centerX - shoulderWidth + armWidth, armTop + scaledHeight * 0.05);
    ctx.closePath();
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(centerX + shoulderWidth, armTop);
    ctx.lineTo(centerX + shoulderWidth + armWidth, armTop + scaledHeight * 0.05);
    ctx.lineTo(centerX + shoulderWidth + armWidth, armBottom);
    ctx.lineTo(centerX + shoulderWidth - armWidth, armBottom);
    ctx.lineTo(centerX + shoulderWidth - armWidth, armTop + scaledHeight * 0.05);
    ctx.closePath();
    ctx.fill();
    
    ctx.restore();
  };

  // Draw the 3D visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const heightInches = getHeightInInches();
    const currentWeightLbs = getWeightInPounds(currentWeight);
    const targetWeightLbs = getWeightInPounds(targetWeight);
    
    // Apply zoom
    ctx.save();
    ctx.scale(zoom, zoom);
    ctx.translate((canvas.width * (1 - zoom)) / (2 * zoom), (canvas.height * (1 - zoom)) / (2 * zoom));
    
    // Draw body based on view mode
    if (viewMode === 'current' || !targetWeight) {
      drawBody(ctx, heightInches, currentWeightLbs, '#3b82f6');
    } else if (viewMode === 'target') {
      drawBody(ctx, heightInches, targetWeightLbs, '#10b981');
    } else {
      // Comparison view
      drawBody(ctx, heightInches, currentWeightLbs, '#3b82f6', 0.6);
      drawBody(ctx, heightInches, targetWeightLbs, '#10b981', 0.6);
    }
    
    ctx.restore();
  }, [rotation, zoom, viewMode, currentWeight, targetWeight, height, heightUnit, weightUnit]);

  // Handle mouse/touch events for rotation
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setStartX(e.clientX);
  };
  
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startX;
    setRotation(rotation + deltaX * 0.01);
    setStartX(e.clientX);
  };
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleMouseLeave = () => {
    setIsDragging(false);
  };
  
  // Handle touch events
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    
    const deltaX = e.touches[0].clientX - startX;
    setRotation(rotation + deltaX * 0.01);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Handle zoom
  const handleZoomIn = () => {
    setZoom(Math.min(zoom + 0.1, 2));
  };
  
  const handleZoomOut = () => {
    setZoom(Math.max(zoom - 0.1, 0.5));
  };
  
  // Handle view mode change
  const handleViewModeChange = (mode: 'current' | 'target' | 'comparison') => {
    setViewMode(mode);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-white rounded-lg border border-gray-200 overflow-hidden ${className}`}
    >
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">Interactive Body Visualization</h3>
        <p className="text-sm text-gray-600">Rotate the model to view from different angles</p>
      </div>
      
      <div className="p-4">
        <div className="flex justify-center mb-4">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => handleViewModeChange('current')}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === 'current'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200`}
            >
              Current
            </button>
            {targetWeight && (
              <button
                type="button"
                onClick={() => handleViewModeChange('target')}
                className={`px-4 py-2 text-sm font-medium ${
                  viewMode === 'target'
                    ? 'bg-green-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border-t border-b border-gray-200`}
              >
                Target
              </button>
            )}
            {targetWeight && (
              <button
                type="button"
                onClick={() => handleViewModeChange('comparison')}
                className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                  viewMode === 'comparison'
                    ? 'bg-purple-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                } border border-gray-200`}
              >
                Compare
              </button>
            )}
          </div>
        </div>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={300}
            height={400}
            className="mx-auto border border-gray-200 rounded-lg cursor-move"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          />
          
          <div className="absolute bottom-4 right-4 flex space-x-2">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Zoom out"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4"></path>
              </svg>
            </button>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
              aria-label="Zoom in"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Drag to rotate • Use buttons to zoom</p>
          {currentWeight && targetWeight && (
            <div className="mt-2 flex justify-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded-full mr-1"></div>
                <span>Current: {currentWeight} {weightUnit}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-1"></div>
                <span>Target: {targetWeight} {weightUnit}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BodyVisualization;
