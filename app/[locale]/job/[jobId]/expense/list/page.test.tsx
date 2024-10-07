import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { generateExpense } from '@/test/fixtures/generator'

import { Provider } from 'react-redux'
import Page from './page'
import { makeStore, createUuid } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

import { addExpense } from '@/lib/features/job/expenses/expensesSlice'

describe('List Income in Ledger Page', async () => {
  let store: EnhancedStore
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/job/expense/add')
    store = makeStore()
  })
  afterEach(cleanup)
  
  it('shows navigation buttons', () => {
    render (<Provider store={store}><Page /></Provider>)
    expect(screen.getByTestId('add_another_button')).toBeDefined()
    expect(screen.getByTestId('continue_button')).toBeDefined()
  })

  it('shows expenses in a list', () => {
    const jobId = createUuid()
    const expense1 = generateExpense('',
      {
      job: jobId,
      name: "Supplies",
      date: "2024/11/07",
      amount: 20,
      isMileage: true,
      expenseType: "Other"
      }
    )
    const expense2 = generateExpense(jobId)

    const expenses = [expense1, expense2]
    for (const expense of expenses) {
      store.dispatch(addExpense(expense))
    }
    render(<Provider store={store}><Page /></Provider>)

    for (const expense of expenses) {
      expect(screen.findByText(expense.item.name)).toBeDefined()
      expect(screen.findByText("$" + expense.item.amount)).toBeDefined()
    }
  })
})