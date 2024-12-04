// types.ts
export interface Transaction {
  id: number
  amount: number
  description: string
  type: 'income' | 'expense'
  date: Date
}
