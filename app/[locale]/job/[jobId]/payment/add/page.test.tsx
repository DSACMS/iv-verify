import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore, createUuid } from '@/lib/store'

import { SetJobPayload, addJob } from '@/lib/features/job/jobSlice'

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
  const item1: SetJobPayload = {
    id: createUuid(),
    item: {
      description: 'desc1',
      business: 'business!',
      taxesFiled: false  
    }
  }

  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))

    mockRouter.push('/job/0/payment/add')
    store = makeStore()
    store.dispatch(addJob(item1))
    render (<TestWrapper store={store}><Page params={{jobId: '0'}} /></TestWrapper>)
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
    const date = '15'
    const expectedDate = `${formattedMonth}/${date}/${todayDate.getFullYear()}`;

    const datepicker: HTMLInputElement = screen.getByTestId("date-picker-external-input")
    fireEvent.change(screen.getByTestId("amount"), {
      target: {
          value: '11'
      }
    })
    fireEvent.click(screen.getByTestId('date-picker-button'))
    const dateButton = screen.getByText(date)
    fireEvent.click(dateButton)

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
          asPath: "/job/list"
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
        asPath: "/job/0/payment/add"
    })
  })
})