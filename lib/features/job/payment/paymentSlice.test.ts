import { beforeEach, describe, expect, it } from 'vitest'

import { generatePayment, emptyStateObject } from "@/test/fixtures/generator";

import reducer, { 
  initialState,
  addPayment, 
  removePayment, 
  setPaymentItem,
  selectPaymentItemAt,
  selectPaymentsByJob
} from './paymentSlice'

import { makeStore, createUuid } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('PaymentSlice', () => {
  const emptyObject = emptyStateObject
  const jobId = createUuid()

  const payment = generatePayment(jobId)
  const payment2 = generatePayment(jobId)

  describe('actions', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(emptyObject)
    })
    it('addPayment should handle adding payment items', () => {
        expect(reducer(initialState, addPayment(payment))).toEqual({
        byId: {
          [payment['id']]: payment.item
        },
        allIds: [payment['id']]
      })
    })

    it('removePayment should handle removing payment items', () => {
      const state = reducer(initialState, addPayment(payment))
      expect(reducer(state, removePayment(payment['id']))).toEqual(emptyObject)
    })

    it('setPaymentItem should handle editing payment items', () => {
      const payment = generatePayment(jobId)
      let state = reducer(initialState, addPayment(payment))
      const modified = 15
      const payload = {
        job: jobId,
        amount: modified,
        date: '',
        payer: 'Someone'
      }

      state = reducer(state, setPaymentItem(generatePayment('', payload, payment.id)))

      expect(state.byId[payment['id']].amount).toEqual(modified)
    })
  })

  describe('selectors', () => {
    let store: EnhancedStore
    beforeEach(() => {
      store = makeStore()
      store.dispatch(addPayment(payment))
      store.dispatch(addPayment(payment2))
    })

    it('can select a single payment item', () => {
      expect(selectPaymentItemAt(store.getState(), payment.id)).toEqual(payment.item)
    })
    it('can select all payment items for a job', () => {
      const secondJobId = createUuid()

      store.dispatch(addPayment(generatePayment(secondJobId)))

      expect(selectPaymentsByJob(store.getState(), secondJobId).keys().length).toBe(1)
    })
  })
})