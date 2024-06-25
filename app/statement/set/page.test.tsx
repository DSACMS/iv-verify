import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('Set Signed Statment', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/statement/set')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('Shows Inputs', async () => {
        expect(screen.getByTestId("name")).toBeDefined()
        expect(screen.getByTestId("amount")).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/statement/set"
        })
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.change(screen.getByTestId("name"), {
            target: { value: 'Suzy' }
        })

        for (const button of screen.getAllByTestId('date-picker-button')) {
            fireEvent.click(button)
            fireEvent.click(screen.getByText('10'))
        }

        fireEvent.change(screen.getByTestId("amount"), {
            target: { value: '23.00' }
        })

        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/statement/sign"
            })
        })
    })
})