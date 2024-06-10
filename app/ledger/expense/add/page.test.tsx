import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('Add Income To Ledger Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/ledger/expense/add')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('Shows Inputs', () => {
        expect(screen.getByTestId("name")).toBeDefined()
        expect(screen.getByTestId("isMileage")).toBeDefined()
        expect(screen.getByTestId("date-picker-external-input")).toBeDefined()
        expect(screen.getByTestId("amount")).toBeDefined()
        expect(screen.getByTestId("combo-box-option-list")).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/ledger/expense/add"
        })
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.change(screen.getByTestId("name"), {
            target: { value: 'Gas' }
        })

        // Open date picker and click on '10'
        await fireEvent.click(screen.getByTestId('date-picker-button'))
        await fireEvent.click(screen.getByText('10'))

        fireEvent.change(screen.getByTestId("amount"), {
            target: { value: '33.44' }
        })

        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/expense/list"
            })
        })
    })
})