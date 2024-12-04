"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Progress } from "./components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card"
import Question from './Question'
import Results from './Results'

interface QuizQuestion {
  id: number
  question: string
  options: string[]
  correctAnswer: number
}

const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Jupiter", "Venus", "Saturn"],
    correctAnswer: 0
  },
  {
    id: 3,
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Leonardo da Vinci", "Pablo Picasso", "Claude Monet"],
    correctAnswer: 1
  }
]

export default function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [score, setScore] = useState(0)
  const [showResults, setShowResults] = useState(false)

  const handleAnswer = (selectedAnswer: number) => {
    if (selectedAnswer === quizData[currentQuestion].correctAnswer) {
      setScore(score + 1)
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowResults(true)
    }
  }

  const restartQuiz = () => {
    setCurrentQuestion(0)
    setScore(0)
    setShowResults(false)
  }

  const progress = ((currentQuestion + 1) / quizData.length) * 100

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-600 via-blue-500 to-teal-400 p-4">
      <Card className="w-full max-w-2xl bg-white shadow-2xl">
        <CardHeader className="bg-yellow-400 text-blue-900">
          <CardTitle className="text-4xl font-bold text-center mb-2">Quiz Master</CardTitle>
          <p className="text-center text-blue-800 text-lg font-semibold">Test Your Knowledge!</p>
        </CardHeader>
        <CardContent className="p-6">
          <Progress value={progress} className="mb-6 h-3" indicatorClassName="bg-green-500" />
          <AnimatePresence mode="wait">
            {showResults ? (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                <Results score={score} totalQuestions={quizData.length} onRestart={restartQuiz} />
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <Question
                  question={quizData[currentQuestion].question}
                  options={quizData[currentQuestion].options}
                  onAnswer={handleAnswer}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between text-sm text-blue-600 mt-6 font-semibold">
            <div>Question {currentQuestion + 1} of {quizData.length}</div>
            <div>Score: {score}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

