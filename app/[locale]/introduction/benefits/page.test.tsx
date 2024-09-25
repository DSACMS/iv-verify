import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { selectBenefits } from '@/lib/features/benefits/benefitsSlice'

describe('Choose Benefits', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/benefits')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('Shows Inputs', async () => {
        expect(screen.getByTestId("medicaid")).toBeDefined()
        expect(screen.getByTestId("snap")).toBeDefined()
    })

    it('Displays error messages when no checkbox is selected', async () => {
        fireEvent.click(screen.getByTestId('continue_button'))

        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(mockRouter).toMatchObject({
            asPath: "/benefits"
        })
    })

    it('Navigates when just medicaid checkbox is checked', async() => {
        const checkbox = screen.getByTestId('medicaid') as HTMLInputElement
        fireEvent.click(checkbox)
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job"
            })
        })

        expect(checkbox.checked).toBeTruthy()
        
        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeTruthy()
        expect(benefits.snap).toBeFalsy()
    })

    it('Navigates when just snap checkbox is checked', async() => {
        const checkbox = screen.getByTestId('snap') as HTMLInputElement
        fireEvent.click(checkbox)
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job"
            })
        })

        expect(checkbox.checked).toBeTruthy()
        
        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeFalsy()
        expect(benefits.snap).toBeTruthy()
    })

    it('Navigates when two checkboxes are checked', async () => {
        fireEvent.click(screen.getByTestId('medicaid'))
        fireEvent.click(screen.getByTestId('snap'))
        fireEvent.click(screen.getByTestId("continue_button"))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job"
            })
        })

        const benefits = selectBenefits(store.getState())
        expect(benefits.medicaid).toBeTruthy()
        expect(benefits.snap).toBeTruthy()
    })
})