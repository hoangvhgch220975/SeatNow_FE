import React from 'react';
import { motion } from 'framer-motion';

/**
 * @file PageTransition.jsx
 * @description Component bọc để tạo hiệu ứng chuyển trang mượt mà (Fade & Slide).
 */
const PageTransition = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ 
        duration: 0.4, 
        ease: [0.22, 1, 0.36, 1] // Custom cubic-bezier for premium feel
      }}
      className="flex-1 flex flex-col w-full"
    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
