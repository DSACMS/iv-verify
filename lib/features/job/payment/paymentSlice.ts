import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'
import { Root } from 'react-dom/client'

export interface PaymentItem {
  job: string
  amount: number
  date: string
  payer: string
}

export interface SetPaymentPayload {
  item: PaymentItem, 
  id: string
}

interface PaymentState {
  byId: {
    [id: string]: PaymentItem
  },
  allIds: Array<string>
}

export const initialState: PaymentState = {
  byId:  {},
  allIds: []
}

export const PaymentSlice = createSlice({
  name: 'job/payment',
  initialState,
  reducers: {
    addPayment: (state, action: PayloadAction<SetPaymentPayload>) => {
      const id = action.payload.id

      state.byId[id] = action.payload.item
      state.allIds.push(id)
    },
    removePayment: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload]
      state.allIds = state.allIds.filter(id => id !== action.payload)
    },
    setPaymentItem: (state, action: PayloadAction<SetPaymentPayload>) => {
      const id = action.payload.id
      state.byId[id] = action.payload.item
    }
  }
})

export const { addPayment, removePayment, setPaymentItem } = PaymentSlice.actions

export const selectPaymentItemAt = (state: RootState, id: string) => state.payment.byId[id]
export const selectPaymentsByJob = (state: RootState, jobId: string) => {
  const selectedPayments: Array<PaymentItem> = []

  for (const paymentId in state.payment.byId) {
    const currentPayment = selectPaymentItemAt(state, paymentId)
    if (currentPayment.job === jobId)
      selectedPayments.push(currentPayment)
  }

  return selectedPayments
}

export default PaymentSlice.reducer