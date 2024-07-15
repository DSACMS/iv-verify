import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'
import TestWrapper from '@/app/TestWrapper'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'
import { IncomeItem, addIncome } from '@/lib/features/ledger/income/incomeSlice'

describe('Edit Income Item Page', async () => {
    let store: EnhancedStore
    const item1: IncomeItem = {
        name: 'fname lname',
        description: 'desc1',
        amount: 40
    }
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/ledger/income/edit/0')
        store = makeStore()
        store.dispatch(addIncome(item1))
        render (<TestWrapper store={store}><Page params={{idx: 0}} /></TestWrapper>)
    })
    afterEach(cleanup)

    it('Shows Inputs', () => {
        expect(screen.getByTestId("name")).toBeDefined()
        expect((screen.getByTestId("name") as HTMLInputElement).value).toBe(item1.name)
        expect(screen.getByTestId("description")).toBeDefined()
        expect((screen.getByTestId("description") as HTMLAreaElement).textContent).toBe(item1.description)
        expect(screen.getByTestId("amount")).toBeDefined()
        expect((screen.getByTestId("amount") as HTMLInputElement).value).toBe(item1.amount.toString())
    })

    it('Navigates when fields are filled in', async () => {
        const newName = "Jane"
        const newDescription = "Landscaping"
        const newAmount = 45.00
        fireEvent.change(screen.getByTestId("name"), { target: { value: newName } })
        fireEvent.change(screen.getByTestId("description"), { target: { value: newDescription } })
        fireEvent.change(screen.getByTestId("amount"), { target: { value: newAmount.toString() } })
        fireEvent.click(screen.getByText('Continue'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/income/list"
            })

            const items = store.getState().incomeLedger.items
            expect(items.length).toBe(1)
            expect(items[0].name).toBe(newName)
            expect(items[0].description).toBe(newDescription)
            expect(items[0].amount).toBe(newAmount)
        })
    })


    it('Displays error messages when fields are empty', async () => {
        ["name", "description", "amount"].forEach((field) => {
            fireEvent.change(screen.getByTestId(field), { target: { value: '' }})
        })

        fireEvent.click(screen.getByText('Continue'))
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: "/ledger/income/edit/0"
        })
    })
})
