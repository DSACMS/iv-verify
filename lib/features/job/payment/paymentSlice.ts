import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

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

// payments by job need job id
// way to iterate
// return state object
export const selectPaymentsByJob = (state: RootState, jobId: string) => {
  let selectedPayments: PaymentState = initialState

  for (const paymentId in state.payment.byId) {
    const currentPayment = state.payment.byId[paymentId]
    if (currentPayment.job === jobId) {
      selectedPayments = PaymentSlice.reducer(
        selectedPayments, 
        addPayment({
          id: paymentId,
          item: currentPayment
      } as SetPaymentPayload))
    }
  }
  return selectedPayments

}

export default PaymentSlice.reducer