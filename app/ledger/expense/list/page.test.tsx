import { afterEach, beforeEach, describe, expect, it, test } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { ExpenseItem, addExpense } from '@/lib/features/ledger/expenses/expensesSlice'

describe('List Income in Ledger Page', async () => {
    let store: EnhancedStore
    beforeEach(() => {
        vi.mock('next/navigation', () => require('next-router-mock'))
        mockRouter.push('/ledger/expense/add')
        store = makeStore()
    })
    afterEach(cleanup)

    it('shows header', () => {
        render (<Provider store={store}><Page /></Provider>)
        expect(screen.getByTestId('list_expense_title')).toBeDefined()
    })

    it('shows navigation buttons', () => {
        render (<Provider store={store}><Page /></Provider>)
        expect(screen.getByTestId('add_another_button')).toBeDefined()
        expect(screen.getByTestId('continue_button')).toBeDefined()
    })

    it('shows expenses in a list', () => {
        const expense1: ExpenseItem = {
            name: "Supplies: Gas",
            date: "2024/11/07",
            amount: 20,
            isMileage: true,
            expenseType: "Other"
        }

        const expense2: ExpenseItem = {
            name: "Clothing for work",
            date: "2024/11/09",
            amount: 49,
            isMileage: false,
            expenseType: "Other"
        }
        const items = [expense1, expense2]
        for (const item of items) {
            store.dispatch(addExpense(item))
        }
        render(<Provider store={store}><Page /></Provider>)

        for (const item of items) {
            expect(screen.getByText(item.name)).toBeDefined()
            expect(screen.getAllByText("$" + item.amount)).toBeDefined()
        }
    })
})