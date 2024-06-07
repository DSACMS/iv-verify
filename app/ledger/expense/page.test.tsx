import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('List Income in Ledger Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/ledger/income/add')
        store = makeStore()
        render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        expect(screen.getByTestId('expenses_landing_what_counts_heading')).toBeDefined()
    })

    it('shows add button', () => {
        expect(screen.getByTestId('add_expenses_button')).toBeDefined()
    })

    it('shows summary button', () => {
        expect(screen.getByTestId('no_expenses_link')).toBeDefined()
    })
})