'use client'

import { useState } from 'react'
import { TransactionForm } from './components/transaction-form'
import { BalanceDisplay } from './components/balance-display'
import { TransactionList } from './components/transaction-list'
import { Card, CardContent, CardHeader, CardTitle } from "../src/components/ui/card"
import { motion } from "framer-motion"
import { Transaction } from './types'

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const addTransaction = (amount: number, description: string, type: 'income' | 'expense') => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount,
      description,
      type,
      date: new Date(),
    }
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions])
  }

  const onDeleteTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id))
  }

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount
    }, 0)
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 to-gray-800 text-white fixed inset-0 overflow-x-hidden overflow-y-auto">
      <div className="container mx-auto px-4 sm:px-6 py-6">
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expense Tracker
        </motion.h1>
        <div className="grid gap-6 sm:gap-8 lg:gap-10 grid-cols-1 lg:grid-cols-2 max-w-[1200px] mx-auto">
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100">Current Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 max-h-24 overflow-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                  <BalanceDisplay balance={calculateBalance()} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100">Add Transaction</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  <TransactionForm onAddTransaction={addTransaction} />
                </CardContent>
              </Card>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 w-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
