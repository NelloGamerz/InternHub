import React from 'react';
import { motion } from 'framer-motion';

interface SectionTitleProps {
  children: React.ReactNode;
}

const SectionTitle = ({ children }: SectionTitleProps) => {
  return (
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-3xl font-bold text-slate-100 mb-8 relative"
    >
      <span className="relative z-10">{children}</span>
      <span className="absolute -bottom-2 left-0 h-1 w-20 bg-gradient-to-r from-violet-600 to-pink-600" />
    </motion.h2>
  );
};

export default SectionTitle;