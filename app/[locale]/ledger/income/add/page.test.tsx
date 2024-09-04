import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'
import TestWrapper from '@/app/TestWrapper'

describe('Add Income To Ledger Page', async () => {
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/ledger/income/add')
        render (<TestWrapper><Page /></TestWrapper>)
    })
    afterEach(cleanup)

    it('Shows Inputs', () => {
        expect(screen.getByTestId("description")).toBeDefined()
    })

    it('Displays error messages when fields are empty', async () => {           
        fireEvent.change(screen.getByTestId("description"), {
            target: {
                value: ''
            }
        })

        fireEvent.click(screen.getByText('Add income'))
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/ledger/income/add"
        })
    })

    it('Navigates when fields are filled in', async () => {           
        fireEvent.change(screen.getByTestId("description"), {
            target: {
                value: 'Landscaping'
            }
        })

        fireEvent.click(screen.getByText('Add income'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/income/add/payment"
            })
        })
    })
})