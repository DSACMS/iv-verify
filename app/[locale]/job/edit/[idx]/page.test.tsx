import { afterEach, beforeAll, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'
import TestWrapper from '@/app/TestWrapper'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'
import { SetJobPayload, addJob } from '@/lib/features/job/jobSlice'
import { createUuid } from '@/lib/store'

describe('Edit Income Item Page', async () => {
    let store: EnhancedStore
    const id = createUuid()
    const item1: SetJobPayload = {
        id: id,
        item: {
            description: 'desc1',
            business: 'business!',
            taxesFiled: false
        }
    }
    beforeAll(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        store = makeStore()
        store.dispatch(addJob(item1))
    })
    beforeEach(() => {
        mockRouter.push(`/job/edit/${id}`)
        render (<TestWrapper store={store}><Page params={{idx: id}} /></TestWrapper>)
    })
    afterEach(cleanup)

    it('Shows Inputs', () => {
        expect(screen.getByTestId("description")).toBeDefined()
        expect((screen.getByTestId("description") as HTMLInputElement).value).toBe(item1.item.description)
    })

    it('Edits the values correctly', async () => {
        const newDescription = "Landscaping"

        expect((screen.getByTestId("description") as HTMLInputElement).value).toBe(item1.item.description)
        fireEvent.change(screen.getByTestId("description"), { target: { value: newDescription } })
        expect((screen.getByTestId("description") as HTMLInputElement).value).toBe(newDescription)
        expect((screen.getByTestId("business") as HTMLInputElement).value).toBe(item1.item.business)
        fireEvent.click(screen.getByText('Add income'))

        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/job/list"
            })

            const jobs = store.getState().jobs

            expect(jobs.allIds.length).toBe(1)
            expect(jobs.byId[item1.id].description).toBe(newDescription)
        })
    })


    it('Displays error messages when fields are empty', async () => {
        ["description"].forEach((field) => {
            fireEvent.change(screen.getByTestId(field), { target: { value: '' }})
        })

        fireEvent.click(screen.getByText('Add income'))
        await waitFor(() => {
            expect(screen.getByTestId("alert")).toBeDefined()
        })

        expect(screen.getAllByTestId("errorMessage")).toBeDefined()

        expect(mockRouter).toMatchObject({
            asPath: `/job/edit/${id}`
        })
    })
})
