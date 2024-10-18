import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'

import { generateJob } from '@/test/fixtures/generator'
import { generateFormattedDate, today } from '@/test/fixtures/date'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'

import { addJob } from '@/lib/features/job/jobSlice'

describe('Add Payments to Jobs Page', async () => {
  let store: EnhancedStore
  const item1 = generateJob()

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
    const date = '15'
    const expectedDate = generateFormattedDate(today(), date)

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