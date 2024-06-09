import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

export interface SignedStatementState {
    name?: string
    lastDayOfWork?: string
    amount?: number
    lastPayment?: string
}

export const initialState: SignedStatementState = { }


export const statementSlice = createSlice({
    name: 'statement/set',
    initialState,
    reducers: {
        setSignedStatement: (state, action: PayloadAction<SignedStatementState>) => {
            state = action.payload
        }
    }
})

export const { setSignedStatement } = statementSlice.actions
export const selectSignedStatement = (state: RootState) => state.statement

export default statementSlice.reducer
