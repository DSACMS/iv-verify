import { createUuid } from "@/lib/store"

import { BenefitsState } from "@/lib/features/benefits/benefitsSlice"
import { SetExpensePayload, ExpenseItem } from "@/lib/features/job/expenses/expensesSlice"
import { SetJobPayload, JobItem } from "@/lib/features/job/jobSlice"
import { SetPaymentPayload, PaymentItem } from "@/lib/features/job/payment/paymentSlice"

/**
 * emptyStateObject
 * Object
 * 
 * returns an empty state object for normalized state [job, expense, payment]
 */
export const emptyStateObject = {
  byId: {},
  allIds: []
}


/**
 * generateBenefits
 * Generate benefits fixture
 * 
 * @param payload 
 * @returns BenefitsState
 */
export const generateBenefits = (payload?: BenefitsState) => {
  const defaultPayload = {
    snap: true,
    medicaid: false,
    standardDeduction: false,
    deductionAmount: 0
  } as BenefitsState

  return payload ? payload : defaultPayload
}

/**
 * generateExpense
 * Generates expenses with a new or existing job id, an optional custom payload, and new or existing expenseId
 * 
 * @param jobId UUID
 * @param payload? ExpenseItem
 * @param expenseId? UUID
 * @returns SetExpensePayload
 */
export const generateExpense = (jobId: string, payload?: ExpenseItem, expenseId?: string) => {
  const defaultPayload = {
    job: jobId,
    name: 'Gas',
    amount: 10,
    date: new Date().toString(),
    expenseType: 'Gas',
    isMileage: false
  } as ExpenseItem

  return {
      id: expenseId ? expenseId : createUuid(),
      item: payload ? payload : defaultPayload
  } as SetExpensePayload
}

/**
 * generateJob 
 * Generate new or existing job objects and an optional custom payload
 * 
 * @param payload? JobItem
 * @param jobId? UUID
 * @returns SetJobPayload
 */
export const generateJob = (payload?: JobItem, jobId?: string) => {
  const defaultPayload = {
    description: 'A description',
    business: '',
    taxesFiled: false
  } as JobItem

  return {
      id: jobId ? jobId : createUuid(),
      item: payload ? payload : defaultPayload
  } as SetJobPayload
}

/**
 * generatePayment
 * Generates payments with a new or existing job id, an optional custom payload, and new or existing paymentId
 * 
 * @param jobId UUID
 * @param payload? ExpenseItem
 * @param paymentId? UUID
 * @returns SetPaymentPayload
 */
export const generatePayment = (jobId: string, payload?: PaymentItem, paymentId?: string) => {
  const defaultPayload = {
    job: jobId,
    amount: 10,
    date: '',
    payer: 'Someone'
  } as PaymentItem

  return {
      id: paymentId ? paymentId : createUuid(),
      item: payload ? payload : defaultPayload
  } as SetPaymentPayload
}