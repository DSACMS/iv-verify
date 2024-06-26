import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { addIncome, IncomeItem } from '@/lib/features/ledger/income/incomeSlice'
import { BenefitsState, setBenefits } from '@/lib/features/benefits/benefitsSlice'

describe('List Income in Ledger Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/ledger/income/add')
        store = makeStore()
        // render (<Provider store={store}><Page /></Provider>)
    })
    afterEach(cleanup)

    it('shows header', () => {
        render (<Provider store={store}><Page /></Provider>)
        expect(screen.getByTestId('list_income_title')).toBeDefined()
    })

    it('shows navigation buttons', () => {
        render (<Provider store={store}><Page /></Provider>)
        expect(screen.getByTestId('add_another_button')).toBeDefined()
        expect(screen.getByTestId('done_button')).toBeDefined()
    })
    
    it('shows items in list', () => {
        const item1: IncomeItem = {
            name: 'fname lname',
            description: 'desc1',
            amount: 40
        }
        const item2: IncomeItem = {
            name : 'foo bar',
            description: 'desc2',
            amount: 75
        }
        const items = [item1, item2]
        store.dispatch(addIncome(item1))
        store.dispatch(addIncome(item2))
        render (<Provider store={store}><Page /></Provider>)

        for (let item of items) {
            expect(screen.getByText(item.name))
            expect(screen.getByText(item.description))
            expect(screen.getByText("$" + item.amount))
        }
    })

    it('navigates to self employment expenses screen for SNAP only flow', () => {
        const benefits: BenefitsState = {
            snap: true,
            medicaid: false,
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/expense/snap"
            })
        })
    })

    it('navigates to expenses ledger landing screen for Medicaid only flow', () => {
        const benefits: BenefitsState = {
            snap: false,
            medicaid: true,
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/expense"
            })
        })
    })

    it('navigates to expenses ledger landing screen for Medicaid+SNAP flow', () => {
        const benefits: BenefitsState = {
            snap: false,
            medicaid: true,
        }
        store.dispatch(setBenefits(benefits))
        render (<Provider store={store}><Page /></Provider>)
        fireEvent.click(screen.getByTestId('done_button'))
        
        waitFor(() => {
            expect(mockRouter).toMatchObject({
                asPath: "/ledger/expense"
            })
        })
    })
})