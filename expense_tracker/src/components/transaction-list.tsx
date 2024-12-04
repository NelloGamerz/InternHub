'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table"
import { Button } from "./ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2 } from 'lucide-react'

interface Transaction {
  id: number
  amount: number
  description: string
  type: 'income' | 'expense'
  date: Date
}

interface TransactionListProps {
  transactions: Transaction[]
  onDeleteTransaction: (id: number) => void
}

export function TransactionList({ transactions, onDeleteTransaction }: TransactionListProps) {
  return (
    <div className="max-h-[calc(100vh-12rem)] overflow-auto custom-scrollbar">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-gray-300">Date</TableHead>
            <TableHead className="text-gray-300">Type</TableHead>
            <TableHead className="text-gray-300">Description</TableHead>
            <TableHead className="text-gray-300">Amount</TableHead>
            <TableHead className="text-gray-300">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <AnimatePresence>
            {transactions.map((transaction) => (
              <motion.tr
                key={transaction.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-700 transition-colors duration-200"
              >
                <TableCell className="text-gray-300">
                  {transaction.date.toLocaleString()}
                </TableCell>
                <TableCell className="font-medium text-gray-200">
                  {transaction.type === 'income' ? 
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mr-2 text-green-400">↑</motion.span> : 
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="inline-block mr-2 text-red-400">↓</motion.span>
                  }
                  {transaction.type}
                </TableCell>
                <TableCell className="text-gray-300">{transaction.description}</TableCell>
                <TableCell className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                  ${transaction.amount.toFixed(2)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDeleteTransaction(transaction.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete transaction</span>
                  </Button>
                </TableCell>
              </motion.tr>
            ))}
          </AnimatePresence>
        </TableBody>
      </Table>
    </div>
  )
}

