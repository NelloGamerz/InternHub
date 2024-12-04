'use client'

import { motion } from "framer-motion"

interface BalanceDisplayProps {
  balance: number
}

export function BalanceDisplay({ balance }: BalanceDisplayProps) {
  return (
    <motion.div 
      className="text-3xl md:text-4xl font-bold text-white"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      Balance: 
      <motion.span 
        key={balance}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={balance >= 0 ? "text-green-400 ml-2" : "text-red-400 ml-2"}
      >
        ${balance.toFixed(2)}
      </motion.span>
    </motion.div>
  )
}