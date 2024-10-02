import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { addJob, JobItem, SetJobPayload } from '@/lib/features/job/jobSlice'
import { BenefitsState, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { createUuid } from '@/lib/store'

describe('List Income in Ledger Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/job/add')
        store = makeStore()
    })
    afterEach(cleanup)

    it('shows navigation buttons', () => {
        render (<Provider store={store}><Page /></Provider>)
        expect(screen.getByTestId('add_another_button')).toBeDefined()
        expect(screen.getByTestId('done_button')).toBeDefined()
    })
    
    it('shows items in list', () => {
        const job1: SetJobPayload = {
            id: createUuid(),
            item: {
                description: 'desc1',
                business: 'business!',
                taxesFiled: false
            }
        }
        const job2: SetJobPayload = {
            id: createUuid(),
            item: {
                description: 'desc2',
                business : 'foo bar',
                taxesFiled: true
            }
        }
        const jobs = [job1, job2]
        store.dispatch(addJob(job1))
        store.dispatch(addJob(job2))
        render (<Provider store={store}><Page /></Provider>)

        for (let job of jobs) {
            expect(screen.getByText(job.item.description))
            expect(screen.getByText(job.item.business))
        }
    })

    it('navigates to self employment expenses screen for SNAP only flow', () => {
        const benefits: BenefitsState = {
            snap: true,
            medicaid: false,
            standardDeduction: false,
            deductionAmount: 0
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job/expense/snap"
            })
        })
    })

    it('navigates to expenses ledger landing screen for Medicaid only flow', () => {
        const benefits: BenefitsState = {
            snap: false,
            medicaid: true,
            standardDeduction: false,
            deductionAmount: 0
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job/expense"
            })
        })
    })

    it('navigates to expenses ledger landing screen for Medicaid+SNAP flow', () => {
        const benefits: BenefitsState = {
            snap: false,
            medicaid: true,
            standardDeduction: false,
            deductionAmount: 0
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job/expense"
            })
        })
    })
})