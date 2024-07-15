import { beforeEach, describe, expect, it } from 'vitest'

import reducer, {IncomeItem, addIncome, removeIncome, initialState, selectIncomeItems, selectIncomeTotal} from './incomeSlice'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('IncomeSlice', () => {
    const item: IncomeItem = {
        name: 'Name',
        description: 'A description',
        amount: 45.33
    }

    const item2: IncomeItem = {
        name: 'Name2',
        description: 'A description2',
        amount: 49.44
    }

    describe('actions', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unkown' })).toEqual({items:[]})
        })

        it('should handle adding income items', () => {
            expect(reducer(initialState, addIncome(item))).toEqual({items:[item]})
        })

        it('should handle removing income items', () => {
            expect(reducer({items: [item]}, removeIncome(0))).toEqual({items:[]})
        })
    })

    describe('selectors', () => {
        let store: EnhancedStore
        beforeEach(() => {
            store = makeStore()
            store.dispatch(addIncome(item))
            store.dispatch(addIncome(item2))
        })

        it('can select all income items', () => {
            expect(selectIncomeItems(store.getState())).toEqual([item, item2])
        })

        it('can total the income items', () => {
            expect(selectIncomeTotal(store.getState())).toEqual(item.amount+item2.amount)
        })
    })
})