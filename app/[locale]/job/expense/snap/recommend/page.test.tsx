import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { BenefitsState, selectBenefits, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { JobItem, addJob } from '@/lib/features/job/jobSlice'
import TestWrapper from '@/app/TestWrapper'

describe('SNAP Recommend Deduction Screen', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/job/expense/snap/recommend')
        store = makeStore()
        const benefits: BenefitsState = {
            deductionAmount: 50,
            snap: true,
            standardDeduction: false,
            medicaid: true,
        }
        store.dispatch(setBenefits(benefits))

        const incomeItem: JobItem = {
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
        store.dispatch(addJob(incomeItem))
        render(<TestWrapper store={store}><Page /></TestWrapper>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('expenses_snap_recommend_header')).toBeDefined()
    })

    it('navigates to review screen if take deduction selected', async () => {
        const radio: HTMLInputElement = screen.getByTestId("take_deduction_radio")
        fireEvent.click(screen.getByText(/Take the standard deduction/i))
        waitFor(() => {
            expect(radio.checked).toEqual(true)
        })
        fireEvent.click(screen.getByTestId("continue-button"))


        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job/review"
            })
        })

        const benefits = selectBenefits(store.getState())
        expect(benefits.standardDeduction).toBeTruthy()
    })
})