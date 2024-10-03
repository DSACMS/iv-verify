import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { PaymentItem, selectPaymentsByJob } from './payment/paymentSlice'
import { ExpenseItem } from './expenses/expensesSlice'
import { RootState } from '../../store'
import { selectExpensesByJob } from './expenses/expensesSlice'

export interface JobItem {
    description: string
    business: string
    taxesFiled: boolean
}

export interface SetJobPayload {
    item: JobItem
    id: string
}

interface JobState {
    byId: {
        [id: string]: JobItem
    },
    allIds: Array<string>
}

export const initialState: JobState = {
    byId: {},
    allIds: []
}

export const JobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<SetJobPayload>) => {
            const id = action.payload.id

            state.byId[id] = action.payload.item
            state.allIds.push(id)
        },
        removeJob: (state, action: PayloadAction<string>) => {
            delete state.byId[action.payload]

            state.allIds = state.allIds.filter(id => id !== action.payload )
        },
        setJobItem: (state, action: PayloadAction<SetJobPayload>) => {
            const id = action.payload.id
            state.byId[id] = action.payload.item
        },
    }
})

export const { addJob, removeJob, setJobItem } = JobSlice.actions
export const selectJobItems = (state: RootState) => state.jobs.byId
export const selectJobCount = (state: RootState) => state.jobs.allIds.length

/**
 * TODO: needs tests and to be a little more clear what's happening
 * 
 * @param state 
 */
export const selectTotalPaymentsByJob = (state: RootState, jobId: string) => 
    selectPaymentsByJob(state, jobId).reduce((total: number, payment: PaymentItem) => total + payment.amount, 0)

export const selectTotalPaymentsByAllJobs = (state: RootState) => 
    state.payment.allIds.reduce((total: number, paymentId: string) => total + state.payment.byId[paymentId].amount, 0)


export const selectTotalExpensesByJob = (state: RootState, jobId: string) =>
    selectExpensesByJob(state, jobId).reduce((total: number, expense: ExpenseItem) => expense.amount + total, 0)

export const selectTotalExpensesByAllJobs = (state: RootState) =>
    state.expenses.allIds.reduce((total: number, expenseId: string) => total + state.expenses.byId[expenseId].amount, 0 )

export const selectJobItemAt = (state: RootState, id: string) => state.jobs.byId[id]

export default JobSlice.reducer