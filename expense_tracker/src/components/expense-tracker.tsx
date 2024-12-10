'use client';

import { useState } from 'react';
import { TransactionForm } from './transaction-form';
import { BalanceDisplay } from './balance-display';
import { TransactionList } from './transaction-list';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { motion } from "framer-motion";

interface Transaction {
  id: number;
  amount: number;
  description: string;
  type: 'income' | 'expense';
  date: Date;
}

export default function ExpenseTracker() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const addTransaction = (amount: number, description: string, type: 'income' | 'expense') => {
    const newTransaction: Transaction = {
      id: Date.now(),
      amount,
      description,
      type,
      date: new Date()
    };
    setTransactions(prevTransactions => [newTransaction, ...prevTransactions]);
  };

  const deleteTransaction = (id: number) => {
    setTransactions(prevTransactions => prevTransactions.filter(transaction => transaction.id !== id));
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => {
      return transaction.type === 'income' ? acc + transaction.amount : acc - transaction.amount;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 sm:px-6 py-4 sm:py-6 md:py-8 max-w-7xl">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 sm:mb-8 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Expense Tracker
        </motion.h1>
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-2">
          <div className="space-y-6 sm:space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100">Current Balance</CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
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
            initial={{ opacity: 0, y: 20, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="bg-gray-800 border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-xl sm:text-2xl font-semibold text-gray-100">Transaction History</CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                <TransactionList 
                  transactions={transactions} 
                  onDeleteTransaction={deleteTransaction} 
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}