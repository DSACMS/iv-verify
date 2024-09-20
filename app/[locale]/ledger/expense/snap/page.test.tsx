import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { BenefitsState, selectBenefits, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { JobItem, addJob } from '@/lib/features/ledger/income/incomeSlice'
import TestWrapper from '@/app/TestWrapper'

describe('SNAP Recommend Deduction Screen', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/ledger/expense/snap')
        store = makeStore()
        const benefits: BenefitsState = {
            deductionAmount: 50,
            snap: true,
            standardDeduction: false,
            medicaid: true,
        }
        store.dispatch(setBenefits(benefits))

        const jobItem: JobItem = {
            description: "Yardwork",
            business: "Suzy",
            taxesFiled: false,
            payments: []
        }
        store.dispatch(addJob(jobItem))
        render(<TestWrapper store={store}><Page /></TestWrapper>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('snap_deduction_header')).toBeDefined()
    })

    it.each([
      { 
        text: 'Take the standard deduction', 
        selection: true, 
        expectedRoute: '/ledger/review'
      }, {
        text: 'Do not take the SNAP standard deduction, use my Medicaid expenses',
        selection: false,
        expectedRoute: '/ledger/expense'
      }
    ])('navigates to $expectedRoute if take deduction is $selection', async ({ text, selection, expectedRoute }) => {
        const radio: HTMLInputElement = screen.getByTestId("take_deduction_radio")
        fireEvent.click(screen.getByText(text))
        waitFor(() => {
            expect(radio.checked).toEqual(selection)
        })
        fireEvent.click(screen.getByTestId("continue-button"))


        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: expectedRoute
            })
        })

        const benefits = selectBenefits(store.getState())
        expect(benefits.standardDeduction).toBe(selection)
    })
})