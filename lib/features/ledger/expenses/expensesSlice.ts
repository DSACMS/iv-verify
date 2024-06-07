import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface ExpenseItem {
    name: string
    expenseType: string
    amount: number
    date: Date
    isMileage: boolean
}

interface ExpenseState {
    items: ExpenseItem[]
}

export const initialState: ExpenseState = {
    items: []
}

export const expenseSlice = createSlice({
    name: 'ledger/expense',
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
export const selectExpenseItems = (state: RootState) => state.expensesLedger.items

export default expenseSlice.reducer