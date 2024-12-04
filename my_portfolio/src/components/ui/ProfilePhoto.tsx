import React from 'react';
import { motion } from 'framer-motion';
import My_Image from '../../../public/images/My_Imgae.png';

const ProfilePhoto: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="relative w-[400px] h-[500px] group"
    >
      {/* Decorative background elements */}
      <div className="absolute -inset-4 bg-gradient-to-r from-violet-600/20 to-pink-600/20 blur-2xl rounded-lg group-hover:from-violet-600/30 group-hover:to-pink-600/30 transition-colors duration-500" />
      <div className="absolute -inset-1 bg-gradient-to-r from-violet-600 to-pink-600 rounded-lg blur opacity-60 group-hover:opacity-80 transition duration-300" />
      
      {/* Main photo container */}
      <div className="relative h-full">
        {/* Border gradient */}
        <div className="absolute -inset-[3px] bg-gradient-to-r from-violet-600/50 to-pink-600/50 rounded-lg" />
        
        {/* Photo container */}
        <div className="relative h-full rounded-lg overflow-hidden border-2 border-slate-800 bg-slate-800/90 backdrop-blur-sm transform group-hover:scale-[1.02] transition duration-500">
          <motion.div
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="w-full h-full relative"
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
            
            {/* Profile image */}
            <img
              srcSet={My_Image}
              alt="Profile"
              className="w-full h-full object-cover transform group-hover:scale-110 transition duration-700 ease-out"
            />
          </motion.div>

          {/* Decorative corner accents */}
          {[
            'top-0 left-0 bg-gradient-to-br',
            'top-0 right-0 bg-gradient-to-bl',
            'bottom-0 left-0 bg-gradient-to-tr',
            'bottom-0 right-0 bg-gradient-to-tl'
          ].map((position, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.4 }}
              className={`absolute w-8 h-8 ${position} from-violet-600/20 to-transparent`}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePhoto;

