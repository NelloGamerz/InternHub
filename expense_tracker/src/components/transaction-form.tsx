'use client'

import { useState } from 'react'
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"

interface TransactionFormProps {
    onAddTransaction: (amount: number, description: string, type: 'income' | 'expense') => void
  }
  
  export function TransactionForm({ onAddTransaction }: TransactionFormProps) {
    const [amount, setAmount] = useState('')
    const [description, setDescription] = useState('')
    const [type, setType] = useState<'income' | 'expense'>('expense')
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault()
      if (amount && description) {
        onAddTransaction(parseFloat(amount), description, type)
        setAmount('')
        setDescription('')
      }
    }
  
    return (
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="amount" className="text-sm font-medium text-gray-200">Amount</Label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </motion.div>
          </div>
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-200">Description</Label>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Input
                id="description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description"
                required
                className="mt-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
            </motion.div>
          </div>
        </div>
        <RadioGroup value={type} onValueChange={(value) => setType(value as 'income' | 'expense')} className="flex space-x-4">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" />
            <Label htmlFor="income" className="text-sm font-medium text-gray-200">Income</Label>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" />
            <Label htmlFor="expense" className="text-sm font-medium text-gray-200">Expense</Label>
          </motion.div>
        </RadioGroup>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
            Add Transaction
          </Button>
        </motion.div>
      </motion.form>
    )
  }