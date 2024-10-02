import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface PaymentItem {
  job: number
  amount: number
  date: string
  payer: string
}

interface PaymentState {
  items: Array<PaymentItem>
}

export const initialState: PaymentState = {
  items: []
}

export const PaymentSlice = createSlice({
  name: 'job/payment',
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<PaymentItem>) => {
      state.items.push(action.payload)
    }
  }
})

export const { addPayment } = PaymentSlice.actions

export const selectPaymentTotal = (state: RootState) => {
  
}

export default PaymentSlice.reducer