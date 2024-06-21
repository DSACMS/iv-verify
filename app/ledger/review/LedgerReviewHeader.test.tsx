import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import LedgerReviewHeader from './LedgerReviewHeader'
import { BenefitsState } from '@/lib/features/benefits/benefitsSlice'
import TestWrapper from '@/app/TestWrapper'

describe('Ledger Review Header', async () => {
    const SNAP_INCOME = 350.00
    const MEDICAID_INCOME = 412.00

    afterEach(cleanup)

    describe('Medicaid and Snap', () => {
        let benefits: BenefitsState
        beforeEach(() => {
            benefits = {
                standardDeduction: true,
                deductionAmount: 50,
                medicaid: true,
                snap: true,
            }

            render (<TestWrapper><LedgerReviewHeader benefits={benefits} snapIncomeTotal={SNAP_INCOME} medicaidIncomeTotal={MEDICAID_INCOME} /></TestWrapper>)
        })

        it('Displays SNAP and Medicaid header', () => {
            expect(screen.getByTestId('review-header')).toBeDefined()
        })

        it('Displays SNAP Income', () => {
            expect(screen.getByText(`SNAP Income: $${SNAP_INCOME}`)).toBeDefined()
        })

        it('Displays Medicaid Income', () => {
            expect(screen.getByText(`Medicaid Income: $${MEDICAID_INCOME}`)).toBeDefined()
        })

        it('Does not display Medicaid only header', () => {
            expect(screen.queryByTestId("medicaid-only-header")).toBeNull()
        })

        it('Does not display SNAP only header', () => {
            expect(screen.queryByTestId("snap-only-header")).toBeNull()
        })
    })

    describe('Medicaid Only', () => {
        let benefits: BenefitsState
        beforeEach(() => {
            benefits = {
                medicaid: true,
                snap: false,
            }

            render (<TestWrapper><LedgerReviewHeader benefits={benefits} snapIncomeTotal={SNAP_INCOME} medicaidIncomeTotal={MEDICAID_INCOME} /></TestWrapper>)
        })

        it('Displays Medicaid only header', () => {
            expect(screen.getByTestId('medicaid-only-header')).toBeDefined()
        })

        it('Does not display SNAP and Medicaid header', () => {
            expect(screen.queryByTestId('review-header')).toBeNull()
        })

        it('Does not display SNAP Income', () => {
            const header = screen.getByTestId('medicaid-only-header')
            expect(header.firstChild?.textContent?.indexOf(`${SNAP_INCOME}`)).toEqual(-1)
        })

        it('Displays Medicaid Income', () => {
            const header = screen.getByTestId('medicaid-only-header')
            expect(header.firstChild?.textContent?.indexOf(`${MEDICAID_INCOME}`)).toBeGreaterThanOrEqual(0)
        })

        it('Does not display SNAP only header', () => {
            expect(screen.queryByTestId("snap-only-header")).toBeNull()
        })
    })

    describe('SNAP Only', () => {
        let benefits: BenefitsState
        beforeEach(() => {
            benefits = {
                standardDeduction: true,
                deductionAmount: 50,
                medicaid: false,
                snap: true,
            }

            render (<TestWrapper><LedgerReviewHeader benefits={benefits} snapIncomeTotal={SNAP_INCOME} medicaidIncomeTotal={MEDICAID_INCOME} /></TestWrapper>)
        })

        it('Does not display Medicaid only header', () => {
            expect(screen.queryByTestId('medicaid-only-header')).toBeNull()
        })

        it('Does not display SNAP and Medicaid header', () => {
            expect(screen.queryByTestId('review-header')).toBeNull()
        })

        it('Does display SNAP Income', () => {
            const header = screen.getByTestId('snap-only-header')
            expect(header.firstChild?.textContent?.indexOf(`${SNAP_INCOME}`)).toBeGreaterThanOrEqual(0)
        })

        it('Does not display Medicaid Income', () => {
            const header = screen.getByTestId('snap-only-header')
            expect(header.firstChild?.textContent?.indexOf(`${MEDICAID_INCOME}`)).toEqual(-1)
        })

        it('Does display SNAP only header', () => {
            expect(screen.queryByTestId("snap-only-header")).toBeDefined()
        })
    })
})