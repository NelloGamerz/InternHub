import { motion } from 'framer-motion'
import { Button } from "./components/ui/button"
import { CheckCircle, XCircle } from 'lucide-react'

interface ResultsProps {
  score: number
  totalQuestions: number
  onRestart: () => void
}

export default function Results({ score, totalQuestions, onRestart }: ResultsProps) {
  const percentage = Math.round((score / totalQuestions) * 100)

  return (
    <div className="text-center space-y-8">
      <motion.h2 
        className="text-4xl font-bold text-blue-900"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Quiz Completed!
      </motion.h2>
      <motion.div
        className="text-8xl font-bold text-yellow-400"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
      >
        {percentage}%
      </motion.div>
      <motion.p 
        className="text-2xl text-blue-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Your score: {score} out of {totalQuestions}
      </motion.p>
      <div className="flex justify-center space-x-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <CheckCircle className="text-green-500" size={64} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <XCircle className="text-red-500" size={64} />
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <Button 
          onClick={onRestart} 
          size="lg"
          className="bg-yellow-400 text-blue-900 hover:bg-yellow-300 text-lg font-semibold px-8 py-6 rounded-full transition-all duration-300"
        >
          Play Again!
        </Button>
      </motion.div>
    </div>
  )
}

