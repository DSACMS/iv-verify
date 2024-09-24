import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'

import { JobItem, addJob } from '@/lib/features/job/income/incomeSlice'

/**
 * Set date from month day year
 * from https://github.com/trussworks/react-uswds/blob/main/src/components/forms/DatePicker/utils.tsx
 *
 * @param {number} year the year to set
 * @param {number} month the month to set (zero-indexed)
 * @param {number} date the date to set
 * @returns {Date} the set date
 */
export const setDate = (year: number, month: number, date: number): Date => {
  const newDate = new Date(0)
  newDate.setFullYear(year, month, date)
  return newDate
}

/**
 * todays date
 * from https://github.com/trussworks/react-uswds/blob/main/src/components/forms/DatePicker/utils.tsx
 *
 * @returns {Date} todays date
 */
export const today = (): Date => {
  const newDate = new Date()
  const day = newDate.getDate()
  const month = newDate.getMonth()
  const year = newDate.getFullYear()
  return setDate(year, month, day)
}

describe('Add Payments to Jobs Page', async () => {
  let store: EnhancedStore
  const item1: JobItem = {
    description: 'desc1',
    business: 'business!',
    taxesFiled: false,
    payments: []
  }

  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))

    mockRouter.push('/job/income/0/payment/add')
    store = makeStore()
    store.dispatch(addJob(item1))
    render (<TestWrapper store={store}><Page params={{idx: 0}} /></TestWrapper>)
  })
  afterEach(cleanup)

  it('shows inputs', () => {
    expect(screen.getByTestId("amount")).toBeDefined()
  })

  it('navigates when fields are filled in', async () => {
    const todayDate = today()
    const month = todayDate.getMonth()+1
    const formattedMonth = month.toString().length === 1 ? 
      `0${month}` : month
    const day = todayDate.getDate().toString().length === 1 ? `0${todayDate.getDate()}` : todayDate.getDate()
    const expectedDate = `${formattedMonth}/${day}/${todayDate.getFullYear()}`;

    const datepicker: HTMLInputElement = screen.getByTestId("date-picker-external-input")
    fireEvent.change(screen.getByTestId("amount"), {
      target: {
          value: '11'
      }
    })
    fireEvent.click(screen.getByTestId('date-picker-button'))
    fireEvent.click(screen.getByText(todayDate.getDate()))

    fireEvent.change(screen.getByTestId("payer"), {
      target: {
          value: 'My client'
      }
    })

  fireEvent.click(screen.getByText('Continue'))

  await waitFor(() => {
      expect(datepicker).toBeInstanceOf(
        HTMLInputElement
      )
      expect(datepicker).toHaveProperty("value", expectedDate)
      expect(mockRouter).toMatchObject({
          asPath: "/job/income/list"
      })
  })
  })

  it('displays error messages when fields are empty', async () => {
    ["amount", "date-picker-external-input", "payer"].forEach((field) => {
      fireEvent.change(screen.getByTestId(field), { target: { value: '' }})
    })

    fireEvent.click(screen.getByText('Continue'))
    await waitFor(() => {
        expect(screen.getByTestId("alert")).toBeDefined()
    })

    expect(screen.getAllByTestId("errorMessage")).toBeDefined()

    expect(mockRouter).toMatchObject({
        asPath: "/job/income/0/payment/add"
    })
  })
})