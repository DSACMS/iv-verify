import { beforeEach, describe, expect, it } from 'vitest'

import reducer, {
    addJob, 
    removeJob,
    setJobItem,
    initialState, 
    selectJobItems, 
    selectJobCount,
    selectTotalPaymentsByJob,
    selectTotalPaymentsByAllJobs,
    SetJobPayload
} from './jobSlice'
import { addPayment, SetPaymentPayload } from './payment/paymentSlice'
import { makeStore, createUuid } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('JobSlice', () => {
    const emptyStateObject = {
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
                 emptyStateObject)
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
            expect(reducer(state, removeJob(job1['id']))).toEqual(emptyStateObject)
        })

        it('setJobItem should update a job', () => {
            let state = reducer(initialState, addJob(job2))
            const modifiedDescription = 'Modified description'
            
            state = reducer(state, setJobItem({
                id: job2.id,
                item: {
                    description: modifiedDescription,
                    business: '',
                    taxesFiled: false
                }
            }))

            expect(state.byId[job2['id']].description).toEqual(modifiedDescription)
        })
    })

    describe('selectors', () => {
        let store: EnhancedStore
        const generatePayment = (jobId: string) => {
            return {
                id: createUuid(),
                item: {
                    job: jobId,
                    amount: 10,
                    date: '',
                    payer: 'Someone'
                } 
            } as SetPaymentPayload
        }

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
    })
})