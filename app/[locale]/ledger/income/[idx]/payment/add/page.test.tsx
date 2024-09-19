import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import { vi } from 'vitest'
import mockRouter from 'next-router-mock'

import Page from './page'
import { EnhancedStore } from '@reduxjs/toolkit/react'
import { makeStore } from '@/lib/store'

import { JobItem, addJob } from '@/lib/features/ledger/income/incomeSlice'


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

    mockRouter.push('/ledger/income/0/payment/add')
    store = makeStore()
    store.dispatch(addJob(item1))
    render (<TestWrapper store={store}><Page params={{idx: 0}} /></TestWrapper>)
  })
  afterEach(cleanup)

  it('shows inputs', () => {
    expect(screen.getByTestId("amount")).toBeDefined()
  })

  it('navigates when fields are filled in', async () => {
    const datepicker: HTMLInputElement = screen.getByTestId("date-picker-external-input")
    fireEvent.change(screen.getByTestId("amount"), {
      target: {
          value: '11'
      }
    })
    fireEvent.change(datepicker, {
      target: {
          value: '09/09/2024'
      }
    })
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
      expect(datepicker.value).toEqual("09/09/2024")
      expect(mockRouter).toMatchObject({
          asPath: "/ledger/income/list"
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
        asPath: "/ledger/income/0/payment/add"
    })
  })
})