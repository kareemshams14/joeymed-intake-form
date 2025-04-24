import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Gender = "male" | "female";
type BodyType = "underweight" | "normal" | "overweight" | "obese";

interface BodyVisualizationProps {
  height: { feet: number; inches: number };
  currentWeight: number;
  targetWeight: number;
  gender?: Gender;
}

const BodyVisualization: React.FC<BodyVisualizationProps> = ({
  height,
  currentWeight,
  targetWeight,
  gender = "male",
}) => {
  const [isRotating, setIsRotating] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showTarget, setShowTarget] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const startX = useRef<number>(0);

  /* ---------- helpers ---------- */
  const calculateBMI = (weight: number) => {
    const inches = height.feet * 12 + height.inches;
    return (weight / (inches * inches)) * 703;
  };

  const getBodyType = (bmi: number): BodyType => {
    if (bmi < 18.5) return "underweight";
    if (bmi < 25) return "normal";
    if (bmi < 30) return "overweight";
    return "obese";
  };

  const currentBMI = calculateBMI(currentWeight);
  const targetBMI = calculateBMI(targetWeight);
  const currentBodyType = getBodyType(currentBMI);
  const targetBodyType = getBodyType(targetBMI);

  /* ---------- rotation handlers (unchanged) ---------- */
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
    const dx = e.clientX - startX.current;
    setRotationAngle((a) => (a + dx * 0.5) % 360);
    startX.current = e.clientX;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isRotating) return;
    const dx = e.touches[0].clientX - startX.current;
    setRotationAngle((a) => (a + dx * 0.5) % 360);
    startX.current = e.touches[0].clientX;
  };
  const stopRotate = () => setIsRotating(false);

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    el.addEventListener("mouseleave", stopRotate);
    window.addEventListener("mouseup", stopRotate);
    window.addEventListener("touchend", stopRotate);
    return () => {
      el.removeEventListener("mouseleave", stopRotate);
      window.removeEventListener("mouseup", stopRotate);
      window.removeEventListener("touchend", stopRotate);
    };
  }, []);

  /* ---------- SVG lookup (typed) ---------- */
  const silhouettes: Record<
    Gender,
    Record<BodyType, string>
  > = {
    /* … your SVG strings (unchanged) … */
    male: {
      underweight: `<!-- svg -->`,
      normal: `<!-- svg -->`,
      overweight: `<!-- svg -->`,
      obese: `<!-- svg -->`,
    },
    female: {
      underweight: `<!-- svg -->`,
      normal: `<!-- svg -->`,
      overweight: `<!-- svg -->`,
      obese: `<!-- svg -->`,
    },
  };

  const getBodySilhouette = (type: BodyType, gen: Gender) =>
    silhouettes[gen][type];

  /* ---------- JSX ---------- */
  return (
    <div className="body-visualization">
      {/* header + controls omitted for brevity */}

      <motion.div
        ref={canvasRef}
        className="visualization-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      >
        <div
          className="body-model"
          style={{
            transform: `rotateY(${rotationAngle}deg)`,
            cursor: isRotating ? "grabbing" : "grab",
          }}
          dangerouslySetInnerHTML={{
            __html: showTarget
              ? getBodySilhouette(targetBodyType, gender)
              : getBodySilhouette(currentBodyType, gender),
          }}
        />
      </motion.div>

      {/* details & note (unchanged) */}
    </div>
  );
};

export default BodyVisualization;
