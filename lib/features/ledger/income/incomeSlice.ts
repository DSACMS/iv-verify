import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface JobItem {
    description: string
    business: string
    taxesFiled: boolean
    payments?: Array<PaymentItem>
}
export interface PaymentItem {
    idx: number
    amount: number
    date: string
    payer: string
}

export interface SetIncomePayload {
    item: JobItem
    idx: number
}

interface IncomeState {
    items: Array<JobItem>
}

export const initialState: IncomeState = {
    items: []
}

export const incomeSlice = createSlice({
    name: 'ledger/income',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<JobItem>) => {
            action.payload.payments=[]
            state.items.push(action.payload)
        },  
        addPayment: (state, action: PayloadAction<PaymentItem>) => {
            if (!state.items[action.payload.idx].payments) {
                state.items[action.payload.idx].payments = []
            }
            
            state.items[action.payload.idx].payments.push(action.payload)
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

export const { addJob, addPayment, removeIncome, setIncomeItem } = incomeSlice.actions
export const selectIncomeItems = (state: RootState) => state.incomeLedger.items
export const selectIncomeTotal = (state: RootState) => state.incomeLedger.items.reduce((val: number, item: JobItem) => item.amount + val, 0)
export const selectIncomeItemAt = (state: RootState, idx: number) => state.incomeLedger.items.at(idx)

export default incomeSlice.reducer