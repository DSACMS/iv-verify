import { beforeAll, describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Page from './page'
import { makeStore, createUuid } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'
import { BenefitsState, selectBenefits, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { JobItem, SetJobPayload, addJob } from '@/lib/features/job/jobSlice'
import TestWrapper from '@/app/TestWrapper'

describe('SNAP Recommend Deduction Screen', async () => {
  let store: EnhancedStore
  beforeAll(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/job/expense/snap/recommend')
    store = makeStore()
    const benefits = generateBenefits()
    const jobItem = generateJob()

    store.dispatch(setBenefits(benefits))
    store.dispatch(addJob(jobItem))
    render(<TestWrapper store={store}><Page /></TestWrapper>)
  })

  it('shows header', () => {
    expect(screen.getByTestId('expenses_snap_recommend_header')).toBeDefined()
  })

  it('navigates to review screen if take deduction selected', async () => {
    const radio: HTMLInputElement = screen.getByTestId("take_deduction_radio")
    fireEvent.click(screen.getByText(/Take the standard deduction/i))
    waitFor(() => {
      expect(radio.checked).toEqual(true)
    })
    fireEvent.click(screen.getByTestId("continue-button"))


    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/job/review"
      })
    })

    const benefits = selectBenefits(store.getState())
    expect(benefits.standardDeduction).toBeTruthy()
  })
})