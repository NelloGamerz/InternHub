import React from 'react';
import { motion } from 'framer-motion';

interface GlowingButtonProps {
  children: React.ReactNode;
  href: string;
  primary?: boolean;
}

const GlowingButton = ({ children, href, primary = false }: GlowingButtonProps) => {
  return (
    <motion.a
      href={href}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`
        relative px-6 py-3 rounded-lg font-medium
        ${primary 
          ? 'bg-gradient-to-r from-violet-600 to-pink-600 text-white' 
          : 'border-2 border-violet-600 text-violet-400'}
        overflow-hidden group
      `}
    >
      <span className="relative z-10">{children}</span>
      <div className={`
        absolute inset-0 opacity-50 group-hover:opacity-100 transition-opacity duration-300
        ${primary 
          ? 'bg-gradient-to-r from-violet-600 to-pink-600 blur-lg' 
          : 'bg-violet-600/30 blur-lg'}
      `} />
    </motion.a>
  );
}

export default GlowingButton;