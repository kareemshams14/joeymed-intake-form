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
        src="https://joey-med.square.site/uploads/b/3c0b68a0-e7ad-11ed-8d29-c1c0c15a5c4e/joey-med-logo.png" 
        alt="JoeyMed Logo" 
        className="h-full"
      />
    </motion.div>
  );
};

export default Logo;
