import { beforeEach, describe, expect, it } from 'vitest'

import reducer, {
    JobItem, 
    PaymentItem, 
    addJob,
    addPayment, 
    removeIncome, 
    initialState, 
    selectIncomeItems, 
    selectIncomeTotal
} from './incomeSlice'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('IncomeSlice', () => {
    const item: JobItem = {
        description: 'A description',
        business: 'A business name',
        taxesFiled: true,
        payments: [
            {
                idx: 0, 
                amount: 15,
                date: '09/09/2024',
                payer: 'Someone'
            }, {
                idx: 0, 
                amount: 25,
                date: '09/12/2024',
                payer: 'Someone' 
            }
        ]
    }

    const item2: JobItem = {
        description: 'A description2',
        business: '',
        taxesFiled: false,
        payments: [
            {
                idx: 0, 
                amount: 10,
                date: '09/30/2024',
                payer: 'Someone' 
            }
        ]
    }

    const payment: PaymentItem = {
        idx: 0, 
        amount: 10,
        date: '09/30/2024',
        payer: 'Someone' 
    }


    describe('actions', () => {
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual({items:[]})
        })

        it('should handle adding job items', () => {
            expect(reducer(initialState, addJob(item))).toEqual({items:[item]})
        })

        it.skip('should handle adding payment items', () => {
            expect(reducer(initialState, addPayment(payment))).toEqual({items:item.payments})
        })

        it('should handle removing income items', () => {
            expect(reducer({items: [item]}, removeIncome(0))).toEqual({items:[]})
        })
    })

    describe('selectors', () => {
        let store: EnhancedStore
        beforeEach(() => {
            store = makeStore()
            store.dispatch(addJob(item))
            store.dispatch(addJob(item2))
        })

        it('can select all income items', () => {
            expect(selectIncomeItems(store.getState())).toEqual([item, item2])
        })

        it('can total the income items', () => {
            expect(selectIncomeTotal(store.getState())).toEqual(50)
        })
    })
})