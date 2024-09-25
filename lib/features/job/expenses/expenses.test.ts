import { beforeEach, describe, expect, it } from "vitest";
import reducer, { ExpenseItem, initialState, addExpense, removeExpense, selectExpenseItems, selectExpenseTotal } from "./expensesSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { makeStore } from "@/lib/store";

describe('ExpenseSlice', () => {
    const item1: ExpenseItem = {
        name: 'Gas',
        amount: 44.55,
        date: new Date().toString(),
        expenseType: 'Gas',
        isMileage: false
    }

    const item2: ExpenseItem = {
        name: 'Supplies',
        amount: 77.88,
        date: new Date().toString(),
        expenseType: 'Supplies',
        isMileage: false
    }

    describe('actions', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual({items: []})
        })

        it('should add expense items to the state', () => {
            expect(reducer(initialState, addExpense(item1))).toEqual({items: [item1]})
        })

        it('should remove expense items from the state', () => {
            expect(reducer({items: [item1, item2]}, removeExpense(0))).toEqual({items: [item2]})
        })
    })

    describe('selectors', () => {
        let store: EnhancedStore
        beforeEach(() => {
            store = makeStore()
            store.dispatch(addExpense(item1))
            store.dispatch(addExpense(item2))
        })
        
        it('should return full list of items', () => {
            expect(selectExpenseItems(store.getState())).toEqual([item1, item2])
        })

        it('should return the total of expense items', () => {
            expect(selectExpenseTotal(store.getState())).toEqual(item1.amount+item2.amount)
        })
    })
})