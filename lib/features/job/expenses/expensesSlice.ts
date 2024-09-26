import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface ExpenseItem {
    name: string
    expenseType: string
    amount: number
    date: string
    isMileage: boolean
}

interface ExpenseState {
    items: ExpenseItem[]
}

export const initialState: ExpenseState = {
    items: []
}

export const expenseSlice = createSlice({
    name: 'job/expense',
    initialState,
    reducers: {
        addExpense: (state, action: PayloadAction<ExpenseItem>) => {
            state.items.push(action.payload)
        },
        removeExpense: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1)
        }
    }
})

export const { addExpense, removeExpense } = expenseSlice.actions
export const selectExpenseItems = (state: RootState) => state.expenses.items
export const selectExpenseTotal = (state: RootState) => state.expenses.items.reduce((val: number, item: ExpenseItem) => item.amount + val, 0)

export default expenseSlice.reducer