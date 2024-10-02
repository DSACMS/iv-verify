import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../../store'

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

            state.allIds = state.allIds.filter((id) => id !== action.payload )
        },
        setJobItem: (state, action: PayloadAction<SetJobPayload>) => {
            const id = action.payload.id
            state.byId[id] = action.payload.item
        },
    }
})

// where do i add the payments and expenses in here?

export const { addJob, removeJob, setJobItem } = JobSlice.actions
export const selectJobItems = (state: RootState) => state.jobs.byId
export const selectJobCount = (state: RootState) => state.jobs.allIds.length

/**
 * TODO: needs tests and to be a little more clear what's happening
 * 
 * @param state 
 */
export const selectJobTotal = (state: RootState) => {
    return 0
    // state.jobs.byId.reduce((total: number, item: JobItem) => 
    //     // move payments total to payment slice
    //     // total + item.payments.reduce((jobTotal: number, payment: PaymentItem) => jobTotal + payment.amount, 0)
    //     0
    // , 0)
}

// iterate until you find the id
export const selectJobItemAt = (state: RootState, id: string) => state.jobs.byId[id]

export default JobSlice.reducer