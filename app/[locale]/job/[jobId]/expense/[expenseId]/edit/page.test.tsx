import { beforeAll, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import mockRouter from 'next-router-mock'

import { generateExpense, generateJob } from '@/test/fixtures/generator'
import { generateFormattedDate, today } from '@/test/fixtures/date'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'

import { addJob } from '@/lib/features/job/jobSlice'
import { addExpense } from '@/lib/features/job/expenses/expensesSlice'

describe('Edit expenses', () => {
  let store: EnhancedStore
  const item1 = generateJob()
  const expense1 = generateExpense(item1.id)

  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))

    mockRouter.push('/job/0/payment/0/edit')
    store = makeStore()
    store.dispatch(addJob(item1))
    store.dispatch(addExpense(expense1))
    render (<TestWrapper store={store}><Page params={{jobId: item1.id, expenseId: expense1.id}} /></TestWrapper>)
  })

  it('should load all existing items ot the page', () => {
    expect(screen.getByTestId('amount')).toHaveProperty('value', expense1.item.amount.toString())
    // expect(screen.getByTestId('date-picker-external-input')).toHaveProperty('value', expense1.item.date)
    expect(screen.getByTestId('name')).toHaveProperty('value', expense1.item.name)
    // expect(screen.getByTestId('expenseType')).toHaveProperty('value', expense1.item.expenseType)
    // expect(screen.getByTestId('isMileage')).toHaveProperty('value', expense1.item.isMileage)

  })

  it('should allow for editing of items on the page', async ()=> {
    const expected = {
      amount: '11',
      date: '11',
      fullDate: '',
      name: 'My client'
    }
    expected.fullDate = generateFormattedDate(today(), expected.date)

    fireEvent.click(screen.getByTestId('amount'), {
      target: {
          value: expected.amount
      }
    })
    fireEvent.click(screen.getByTestId('date-picker-button'))
    // const dateButton = screen.getByText(expected.date)
    // fireEvent.click(dateButton)
    fireEvent.change(screen.getByTestId("name"), {
      target: {
          value: expected.name
      }
    })

    await waitFor(() => {
      expect(screen.getByTestId('amount')).toHaveProperty('value', expected.amount)
    // expect(screen.getByTestId('date-picker-external-input')).toHaveProperty('value', expected.fullDate)
    expect(screen.getByTestId('name')).toHaveProperty('value', expected.name)
    })
  })
  it.skip('when there are existing entries, unchanged fields should not trigger form validation')
})