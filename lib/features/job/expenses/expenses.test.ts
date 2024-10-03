import { beforeEach, describe, expect, it } from "vitest";
import reducer, { 
    SetExpensePayload, 
    initialState, 
    addExpense, 
    removeExpense, 
    selectExpenseItemAt } from "./expensesSlice";
import { EnhancedStore } from "@reduxjs/toolkit";
import { makeStore, createUuid } from "@/lib/store";

describe('ExpenseSlice', () => {
    const emptyStateObject = {
        byId: {},
        allIds: []
    }

    const item1: SetExpensePayload = {
        id: createUuid(),
        item: {
            job: createUuid(),
            name: 'Gas',
            amount: 44.55,
            date: new Date().toString(),
            expenseType: 'Gas',
            isMileage: false
        }
    }

    const item2: SetExpensePayload = {
        id: createUuid(),
        item: {
            job: createUuid(),
            name: 'Supplies',
            amount: 77.88,
            date: new Date().toString(),
            expenseType: 'Supplies',
            isMileage: false
        }
    }

    describe('actions', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual(emptyStateObject)
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
            expect(reducer(state, removeExpense(item1['id']))).toEqual(emptyStateObject)
        })

        it.skip('setExpenseItem should update an expense')
    })

    describe('selectors', () => {
        let store: EnhancedStore
        beforeEach(() => {
            store = makeStore()
            store.dispatch(addExpense(item1))
            store.dispatch(addExpense(item2))
        })
        
        it('selectExpenseItemAt', () => {
            expect(selectExpenseItemAt(store.getState(), item1.id)).toEqual([item1])
        })

        it.skip('selectExpensesByJob')

    })
})