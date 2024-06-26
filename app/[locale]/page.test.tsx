import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('Intro Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => ({
            useRouter: () =>  mockRouter,
            usePathname: () => mockRouter.asPath,
        }))
        mockRouter.push('/')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('intro_header')).toBeDefined()
    })

    it('shows add button', () => {
        expect(screen.getByTestId('get_started_button')).toBeDefined()
    })

    it('navigates when clicked', async () => {
        fireEvent.click(screen.getByTestId('get_started_button'))
        await waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/benefits"
            })
        })
    })
})