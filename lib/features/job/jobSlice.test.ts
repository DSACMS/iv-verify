
import { beforeEach, describe, expect, it } from 'vitest'
import { generateExpense, generateJob, generatePayment, emptyStateObject } from '@/test/fixtures/generator'

import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

import reducer, {
  addJob, 
  removeJob,
  setJobItem,
  initialState, 
  selectJobItems, 
  selectJobCount,
  selectTotalPaymentsByJob,
  selectTotalPaymentsByAllJobs,
  selectTotalExpensesByJob,
  selectTotalExpensesByAllJobs
} from './jobSlice'
import { addExpense } from './expenses/expensesSlice'
import { addPayment } from './payment/paymentSlice'

describe('JobSlice', () => {
  const emptyObject = emptyStateObject
  const job1 = generateJob()
  const job2 = generateJob({
    description: 'A description2',
    business: '',
    taxesFiled: false
  })

  describe('actions', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(       
         emptyObject)
    })

    it('addJob should work', () => {
      expect(reducer(initialState, addJob(job1))).toEqual({
        byId:{
          [job1['id']]: job1.item
        },
        allIds: [job1['id']]
      })
    })


    it('removeJob should work', () => {
      const state = reducer(initialState, addJob(job1))
      expect(reducer(state, removeJob(job1['id']))).toEqual(emptyObject)
    })

    it('setJobItem should update a job', () => {
      let state = reducer(initialState, addJob(job2))
      const modified = 'Modified description'
      const payload = {
        description: modified,
        business: '',
        taxesFiled: false
      }
      
      state = reducer(state, setJobItem(generateJob(payload, job2.id)))

      expect(state.byId[job2['id']].description).toEqual(modified)
    })
  })

  describe('selectors', () => {
    let store: EnhancedStore

    beforeEach(() => {
      store = makeStore()
      store.dispatch(addJob(job1))
      store.dispatch(addJob(job2))
    })

    describe('selectJobItems and selectJobCount', () => {
      it('can select all income items', () => {
        expect(selectJobCount(store.getState())).toEqual(2)
        
        const jobs = selectJobItems(store.getState())

        expect(jobs[job1['id']]).toEqual(job1['item']);
        expect(jobs[job2['id']]).toEqual(job2['item']);
        expect(Object.keys(jobs).length).toEqual(2)
      })
    });

    describe('selectTotalPaymentsByJob', () => {
      it('can total the income items', () => {
        store.dispatch(addPayment(generatePayment(job1.id)))
        store.dispatch(addPayment(generatePayment(job1.id)))
        expect(selectTotalPaymentsByJob(store.getState(), job1.id)).toEqual(20)
      })
    });

    describe('selectTotalPaymentsByAllJobs', () => {
      it('can total the income items', () => {
        store.dispatch(addPayment(generatePayment(job1.id)))
        store.dispatch(addPayment(generatePayment(job2.id)))
        store.dispatch(addPayment(generatePayment(job2.id)))
        expect(selectTotalPaymentsByAllJobs(store.getState())).toEqual(30)
      })
    });

    describe('selectTotalExpensesByJob', () => {
      it('can total the income items', () => {
        store.dispatch(addExpense(generateExpense(job1.id)))
        store.dispatch(addExpense(generateExpense(job1.id)))
        expect(selectTotalExpensesByJob(store.getState(), job1.id)).toEqual(20)
      })
    });

    describe('selectTotalExpensesByAllJobs', () => {
      it('can total the income items', () => {
        store.dispatch(addExpense(generateExpense(job1.id)))
        store.dispatch(addExpense(generateExpense(job2.id)))
        store.dispatch(addExpense(generateExpense(job2.id)))
        expect(selectTotalExpensesByAllJobs(store.getState())).toEqual(30)
      })
    });
  })
})