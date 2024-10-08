import { beforeEach, describe, expect, it } from "vitest";
import { generateExpense, emptyStateObject } from "@/test/fixtures/generator";

import { EnhancedStore } from "@reduxjs/toolkit";
import { makeStore, createUuid } from "@/lib/store";

import reducer, { 
  initialState, 
  addExpense, 
  removeExpense, 
  setExpenseItem,
  selectExpenseItemAt, 
  selectExpensesByJob 
} from "./expensesSlice";

describe('ExpenseSlice', () => {
  
  const emptyObject = emptyStateObject
  
  const jobId = createUuid()
  const item1 = generateExpense(jobId)
  const item2 = generateExpense(jobId, {
    job: jobId,
    name: 'Supplies',
    amount: 77.88,
    date: new Date().toString(),
    expenseType: 'Supplies',
    isMileage: false
  })

  describe('actions', () => {
    it('should return the initial state', () => {
      expect(reducer(undefined, { type: 'unknown' })).toEqual(emptyObject)
    })

    it('addExpense should work', () => {
      expect(reducer(initialState, addExpense(item1))).toEqual({
        byId: {
          [item1['id']]: item1.item
        },
        allIds: [item1['id']]
      })
    })

    it('removeJob should work', () => {
      const state = reducer(initialState, addExpense(item1))
      expect(reducer(state, removeExpense(item1['id']))).toEqual(emptyObject)
    })

    it('setExpenseItem should update an expense', () => {
      let state = reducer(initialState, addExpense(item1))
      const modified = 15
      const payload = {
        job: jobId,
        name: 'Modified Gas',
        amount: modified,
        date: new Date().toString(),
        expenseType: 'Gas',
        isMileage: false
      }

      state = reducer(state, setExpenseItem(generateExpense('', payload, item1.id)))

      expect(state.byId[item1['id']].amount).toEqual(modified)
    })
  })

  describe('selectors', () => {
    let store: EnhancedStore
    beforeEach(() => {
      store = makeStore()
      store.dispatch(addExpense(item1))
      store.dispatch(addExpense(item2))
    })
    
    it('selectExpenseItemAt', () => {
      expect(selectExpenseItemAt(store.getState(), item1.id)).toEqual(item1.item)
    })

    it('selectExpensesByJob', () => {
      const secondJobId = createUuid()       
      store.dispatch(addExpense(generateExpense(secondJobId)))

      expect(selectExpensesByJob(store.getState(), secondJobId).length).toBe(1)

    })

  })
})