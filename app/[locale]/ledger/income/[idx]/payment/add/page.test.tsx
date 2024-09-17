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

    mockRouter.push('/ledger/income/add')
    store = makeStore()
    store.dispatch(addJob(item1))
    render (<TestWrapper store={store}><Page params={{idx: 0}} /></TestWrapper>)
  })
  afterEach(cleanup)

  it.skip('shows inputs')

  it.skip('navigates when fields are filled in')

  it.skip('displays error messages when fields are empty')
})