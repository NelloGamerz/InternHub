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
      date: new Date(), // Ensure the date field matches the type
    }
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions])
  }

  // Function to delete a transaction
  const onDeleteTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id))
  }

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount
    }, 0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto p-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-bold text-center my-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expense Tracker
        </motion.h1>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100">Current Balance</CardTitle>
                </CardHeader>
                <CardContent>
                  <BalanceDisplay balance={calculateBalance()} />
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl font-semibold text-gray-100">Add Transaction</CardTitle>
                </CardHeader>
                <CardContent>
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
            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold text-gray-100">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <TransactionList transactions={transactions} onDeleteTransaction={onDeleteTransaction} />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
