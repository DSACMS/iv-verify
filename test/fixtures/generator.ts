import { createUuid } from "@/lib/store"

import { SetExpensePayload, ExpenseItem } from "@/lib/features/job/expenses/expensesSlice"
import { SetJobPayload, JobItem } from "@/lib/features/job/jobSlice"
import { SetPaymentPayload, PaymentItem } from "@/lib/features/job/payment/paymentSlice"

export const emptyStateObject = {
  byId: {},
  allIds: []
}

export const generateExpense = (jobId: string, payload?: ExpenseItem) => {
  const defaultPayload = {
    job: jobId,
    name: 'Gas',
    amount: 10,
    date: new Date().toString(),
    expenseType: 'Gas',
    isMileage: false
  } as ExpenseItem

  return {
      id: createUuid(),
      item: payload ? payload : defaultPayload
  } as SetExpensePayload
}

export const generateJob = (payload?: JobItem) => {
  const defaultPayload = {
    description: 'A description2',
    business: '',
    taxesFiled: false
  } as JobItem

  return {
      id: createUuid(),
      item: payload ? payload : defaultPayload
  } as SetJobPayload
}

export const generatePayment = (jobId: string, payload?: PaymentItem) => {
  const defaultPayload = {
    job: jobId,
    amount: 10,
    date: '',
    payer: 'Someone'
  } as PaymentItem

  return {
      id: createUuid(),
      item: payload ? payload : defaultPayload
  } as SetPaymentPayload
}