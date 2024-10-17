import { beforeAll, describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import mockRouter from 'next-router-mock'

import { generateJob, generatePayment } from '@/test/fixtures/generator'
import { generateFormattedDate, today } from '@/test/fixtures/date'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'

import { addJob } from '@/lib/features/job/jobSlice'
import { addPayment } from '@/lib/features/job/payment/paymentSlice'

describe('Edit payments', () => {
  let store: EnhancedStore
  const item1 = generateJob()
  const payment1 = generatePayment(item1.id)

  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))

    mockRouter.push('/job/0/payment/0/edit')
    store = makeStore()
    store.dispatch(addJob(item1))
    store.dispatch(addPayment(payment1))
    render (<TestWrapper store={store}><Page params={{jobId: item1.id, paymentId: payment1.id}} /></TestWrapper>)
  })

  it('should load all existing items to the page', () => {
    expect(screen.getByTestId('amount')).toHaveProperty('value', payment1.item.amount.toString())
    // expect(screen.getByTestId('date-picker-external-input')).toHaveProperty('value', payment1.item.date)
    expect(screen.getByTestId('payer')).toHaveProperty('value', payment1.item.payer)
  })

  it('should allow for editing of items on the page (check results)', async () => {
    const expected = {
      amount: '11',
      date: '11',
      fullDate: '',
      payer: 'My client'
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
    fireEvent.change(screen.getByTestId("payer"), {
      target: {
          value: expected.payer
      }
    })

    await waitFor(() => {
      expect(screen.getByTestId('amount')).toHaveProperty('value', expected.amount)
    // expect(screen.getByTestId('date-picker-external-input')).toHaveProperty('value', expected.fullDate)
    expect(screen.getByTestId('payer')).toHaveProperty('value', expected.payer)
    })
  })
  it.skip('when there are existing entries, unchanged fields should not trigger form validation')
})