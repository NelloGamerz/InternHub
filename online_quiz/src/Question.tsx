import { motion } from 'framer-motion'
import { Button } from "./components/ui/button"

interface QuestionProps {
  question: string
  options: string[]
  onAnswer: (selectedAnswer: number) => void
}

export default function Question({ question, options, onAnswer }: QuestionProps) {
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-8">{question}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {options.map((option, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Button
              className="w-full text-left py-6 h-auto text-lg font-medium bg-blue-100 hover:bg-blue-200 text-blue-800 border-2 border-blue-300 transition-all duration-300"
              variant="outline"
              onClick={() => onAnswer(index)}
            >
              <span className="font-bold mr-2 text-red-500">{String.fromCharCode(65 + index)}.</span> {option}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

