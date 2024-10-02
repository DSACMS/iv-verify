import { beforeEach, describe, expect, it } from 'vitest'

import reducer, {
    addJob, 
    removeJob, 
    initialState, 
    selectJobItems, 
    selectJobCount,
    selectTotalPaymentsByJob,
    selectTotalPaymentsByAllJobs,
    SetJobPayload
} from './jobSlice'
import { makeStore, createUuid } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { create } from 'domain'

describe('JobSlice', () => {
    const emptyJobObject = {
        byId: {},
        allIds: []
    }
    const job1: SetJobPayload = {
        id: createUuid(),
        item: {
            description: 'A description',
            business: 'A business name',
            taxesFiled: true
        }
    }
    const job2: SetJobPayload = {
        id: createUuid(),
        item: {
            description: 'A description2',
            business: '',
            taxesFiled: false
        }
    }

    describe('actions', () => {
        const id = job1.id
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual({items:[]})
        })

        it('should handle adding job items', () => {
            expect(reducer(initialState, addJob(job1))).toEqual({
                byId:{
                    id: job1.item
                },
                allIds: [id]
            })
        })


        it('should handle removing income items', () => {
            const jobToRemove = {
                byId:{
                    id: job1.item
                },
                allIds: [id]
            }
            expect(reducer(jobToRemove, removeJob(id))).toEqual(emptyJobObject)
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
                expect(selectJobItems(store.getState())).toEqual(0)
            })
        });

        // not yet; gotta add payments in here yet
        describe('selectTotalPaymentsByJob', () => {
            it.skip('can total the income items', () => {
                expect(selectTotalPaymentsByJob(store.getState(), job1.id)).toEqual(50)
            })
        });

        describe('selectTotalPaymentsByAllJobs', () => {
            it.skip('can total the income items', () => {
                expect(selectTotalPaymentsByAllJobs(store.getState())).toEqual(50)
            })
        });
    })
})