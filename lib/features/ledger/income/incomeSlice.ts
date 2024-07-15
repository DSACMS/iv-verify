import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface IncomeItem {
    name: string
    description: string
    amount: number
}

export interface SetIncomePayload {
    item: IncomeItem
    idx: number
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
        },
        setIncomeItem: (state, action: PayloadAction<SetIncomePayload>) => {
            if (action.payload.idx < state.items.length) {
                state.items[action.payload.idx] = action.payload.item
            }
        }
    }
})

export const { addIncome, removeIncome, setIncomeItem } = incomeSlice.actions
export const selectIncomeItems = (state: RootState) => state.incomeLedger.items
export const selectIncomeTotal = (state: RootState) => state.incomeLedger.items.reduce((val: number, item: IncomeItem) => item.amount + val, 0)
export const selectIncomeItemAt = (state: RootState, idx: number) => state.incomeLedger.items.at(idx)

export default incomeSlice.reducer