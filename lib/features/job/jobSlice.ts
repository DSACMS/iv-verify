import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import type { PaymentItem } from './payment/paymentSlice'
import { ExpenseItem } from './expenses/expensesSlice'

export interface JobItem {
    description: string
    business: string
    taxesFiled: boolean
    payments: Array<PaymentItem>
    expenses?: Array<ExpenseItem>
}

export interface SetJobPayload {
    item: JobItem
    idx: number
}

interface JobState {
    items: Array<JobItem>
}

export const initialState: JobState = {
    items: []
}

export const JobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<JobItem>) => {
            state.items.push(action.payload)

        }, 
        // to deprecate 
        addPayment: (state, action: PayloadAction<PaymentItem>) => {
            if (!state.items[action.payload.idx].payments) {
                state.items[action.payload.idx].payments = []
            }
            state.items[action.payload.idx].payments.push(action.payload)
        },
        removeJob: (state, action: PayloadAction<number>) => {
            state.items.splice(action.payload, 1)
        },
        setJobItem: (state, action: PayloadAction<SetJobPayload>) => {
            if (action.payload.idx < state.items.length) {
                state.items[action.payload.idx].description = action.payload.item.description
                state.items[action.payload.idx].business = action.payload.item.business
                state.items[action.payload.idx].taxesFiled = action.payload.item.taxesFiled
            }
        },
    }
})

export const { addJob, addPayment, removeJob, setJobItem } = JobSlice.actions
export const selectJobItems = (state: RootState) => state.jobs.items

/**
 * TODO: needs tests and to be a little more clear what's happening
 * 
 * @param state 
 */
export const selectJobTotal = (state: RootState) => {
    return state.jobs.items.reduce((total: number, item: JobItem) => 
        total + item.payments.reduce((jobTotal: number, payment: PaymentItem) => jobTotal + payment.amount, 0)
    , 0)
}

export const selectJobItemAt = (state: RootState, idx: number) => state.jobs.items.at(idx)

export default JobSlice.reducer