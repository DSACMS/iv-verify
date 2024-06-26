import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { setConfimationNumber } from '@/lib/features/statement/statementSlice'
import TestWrapper from '@/app/TestWrapper'

describe('Confirmation screen', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/statement/confirmation')
        store = makeStore()
        store.dispatch(setConfimationNumber("1234567890"))
        render (<TestWrapper store={store}><Page /></TestWrapper>)
    })
    afterEach(cleanup)

    it('Shows Confirmation Number', async () => {
        expect(screen.getByText("Your confirmation number is: 1234567890")).toBeDefined()
    })
})