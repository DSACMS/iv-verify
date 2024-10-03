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
        it('should return the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual(       
                 emptyJobObject)
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
            expect(reducer(state, removeJob(job1['id']))).toEqual(emptyJobObject)
        })

        it.skip('setJobItem should update a job')
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