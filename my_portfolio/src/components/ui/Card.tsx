import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <motion.div
      className={`
        bg-slate-800/50 backdrop-blur-lg rounded-xl p-6
        border border-slate-700/50 shadow-xl
        relative overflow-hidden
        ${className}
      `}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600/5 to-pink-600/5" />
      <div className="absolute inset-0 bg-slate-900/20 backdrop-blur-[2px]" />
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default Card;