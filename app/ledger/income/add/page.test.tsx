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
        mockRouter.push('/ledger/income/add')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('Shows Inputs', () => {
        expect(screen.getByLabelText('What is the name of the person, client, or company that you worked for?')).toBeDefined()
        expect(screen.getByLabelText('In your own words, describe the type of work you did')).toBeDefined()
        expect(screen.getByLabelText('Total amount paid to you in the last 30 days.')).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {
        fireEvent.change(screen.getByLabelText('What is the name of the person, client, or company that you worked for?'), {
            target: {
                value: ''
            }
        })
           
        fireEvent.change(screen.getByLabelText('In your own words, describe the type of work you did'), {
            target: {
                value: ''
            }
        })

        fireEvent.change(screen.getByLabelText('Total amount paid to you in the last 30 days.'), {
            target: {
                value: ''
            }
        })

        fireEvent.click(screen.getByText('Continue'))
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/ledger/income/add"
        })
    })

    it('Navigates when fields are filled in', async () => {
        fireEvent.change(screen.getByLabelText('What is the name of the person, client, or company that you worked for?'), {
            target: {
                value: 'Jane'
            }
        })
           
        fireEvent.change(screen.getByLabelText('In your own words, describe the type of work you did'), {
            target: {
                value: 'Landscaping'
            }
        })

        fireEvent.change(screen.getByLabelText('Total amount paid to you in the last 30 days.'), {
            target: {
                value: '40.00'
            }
        })

        fireEvent.click(screen.getByText('Continue'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/income/list"
            })
        })
    })
})