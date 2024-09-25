import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface PaymentItem {
  idx: number
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

export const selectPaymentTotal = (state: RootState) => {
  
}