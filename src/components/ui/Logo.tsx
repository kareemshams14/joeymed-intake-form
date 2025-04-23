'use client';

import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-12"
    >
      <img 
        src="https://www.joeymed.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo2.7dd72441.png&w=1080&q=100" 
        alt="JoeyMed Logo" 
        className="h-full"
      />
    </motion.div>
  );
};

export default Logo;
