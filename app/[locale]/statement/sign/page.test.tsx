import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { selectSignedStatement } from '@/lib/features/statement/statementSlice'

describe('Sign Statement', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/statement/sign')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('Shows Inputs', async () => {
        expect(screen.getByTestId("understood")).toBeDefined()
        expect(screen.getByTestId("signedName")).toBeDefined()
    })

    it('Displays error messages when fields are not complete', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/statement/sign"
        })
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.click(screen.getByTestId('understood'))
        fireEvent.change(screen.getByTestId("signedName"), {
            target: { value: 'John Doe' }
        })

        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/statement/confirmation"
            })
        })

        const statement = selectSignedStatement(store.getState())
        expect(statement.understood).toBeTruthy()
        expect(statement.signedName).toEqual("John Doe")
    })
})