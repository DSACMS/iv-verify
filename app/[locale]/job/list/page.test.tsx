import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { generateBenefits, generateJob } from '@/test/fixtures/generator'

import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

import { addJob } from '@/lib/features/job/jobSlice'
import { setBenefits } from '@/lib/features/benefits/benefitsSlice'

describe('List Income in Ledger Page', async () => {
  let store: EnhancedStore
  const benefits = generateBenefits()
  
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/job/add')
    store = makeStore()
  })
  afterEach(cleanup)

  it('shows navigation buttons', () => {
    render (<Provider store={store}><Page /></Provider>)
    expect(screen.getByTestId('done_button')).toBeDefined()
  })
  
  it('shows items in list', () => {
    const job1 = generateJob()
    const job2 = generateJob({
      description: 'A description that is new',
      business: 'A Good Company',
      taxesFiled: true
      })
    const jobs = [job1, job2]
    store.dispatch(addJob(job1))
    store.dispatch(addJob(job2))
    render (<Provider store={store}><Page /></Provider>)

    for (let job of jobs) {
      expect(screen.getByText(job.item.description)).toBeDefined()
    }
  })

  it('navigates to self employment expenses screen for SNAP only flow', () => {
    store.dispatch(setBenefits(benefits))
    render (<Provider store={store}><Page /></Provider>)
    fireEvent.click(screen.getByTestId('done_button'))
    
    waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/job/expense/snap"
      })
    })
  })

  it('navigates to expenses ledger landing screen for Medicaid only flow', () => {
    store.dispatch(setBenefits(benefits))
    render (<Provider store={store}><Page /></Provider>)
    fireEvent.click(screen.getByTestId('done_button'))
    
    waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/job/expense"
      })
    })
  })

  it('navigates to expenses ledger landing screen for Medicaid+SNAP flow', () => {
    store.dispatch(setBenefits(benefits))
    render (<Provider store={store}><Page /></Provider>)
    fireEvent.click(screen.getByTestId('done_button'))
    
    waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/job/expense"
      })
    })
  })
})