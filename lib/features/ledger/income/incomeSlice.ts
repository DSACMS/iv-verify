import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export interface IncomeItem {
    name: string
    description: string
    amount: number
}

interface IncomeState {
    items: IncomeItem[]
}

const initialState: IncomeState = {
    items: []
}

export const incomeSlice = createSlice({
    name: 'ledger/income',
    initialState,
    reducers: {
        addIncome: (state, action: PayloadAction<IncomeItem>) => {
            state.items.push(action.payload)
        }
    }
})

export const { addIncome } = incomeSlice.actions
export const selectIcomeItems = (state: RootState) => state.incomeLedger.items

export default incomeSlice.reducer