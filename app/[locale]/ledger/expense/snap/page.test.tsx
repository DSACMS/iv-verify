import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('SNAP Expense Screen', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/ledger/expense/snap')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('expense-snap-header')).toBeDefined()
    })

    it('navigates to review screen if no is selected', async () => {
        fireEvent.click(screen.getByTestId("no_radio"))
        fireEvent.click(screen.getByTestId("continue-button"))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/review"
            })
        })
    })

    it('navigates to ledger builder if yes is selected', async () => {
        fireEvent.click(screen.getByTestId("yes_radio"))
        fireEvent.click(screen.getByTestId("continue-button"))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/expense"
            })
        })
    })
})