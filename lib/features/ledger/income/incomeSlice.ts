import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface IncomeItem {
    name: string
    description: string
    amount: number
}

interface IncomeState {
    items: IncomeItem[]
}

export const initialState: IncomeState = {
    items: []
}

export const incomeSlice = createSlice({
    name: 'ledger/income',
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<IncomeItem>) => {
            state.items.push(action.payload)
        },
        removeIncome: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1)
        }
    }
})

export const { addIncome, removeIncome } = incomeSlice.actions
export const selectIncomeItems = (state: RootState) => state.incomeLedger.items
export const selectIncomeTotal = (state: RootState) => state.incomeLedger.items.reduce((val: number, item: IncomeItem) => item.amount + val, 0)

export default incomeSlice.reducer