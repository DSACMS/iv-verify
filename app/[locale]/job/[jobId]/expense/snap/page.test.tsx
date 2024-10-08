import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import TestWrapper from '@/app/TestWrapper'
import { generateBenefits, generateJob } from '@/test/fixtures/generator'
import { vi } from 'vitest'

import Page from './page'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

import { selectBenefits, setBenefits } from '@/lib/features/benefits/benefitsSlice'
import { addJob } from '@/lib/features/job/jobSlice'

describe('SNAP Recommend Deduction Screen', async () => {
  let store: EnhancedStore
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/job/expense/snap')
    store = makeStore()
    const benefits = generateBenefits()
    const jobItem = generateJob()

    store.dispatch(setBenefits(benefits))
    store.dispatch(addJob(jobItem))
    render(<TestWrapper store={store}><Page /></TestWrapper>)
  })
  afterEach(cleanup)

  it('shows header', () => {
    expect(screen.getByTestId('snap_deduction_header')).toBeDefined()
  })

  it.each([
    { 
    text: 'Take the standard deduction', 
    selection: true, 
    expectedRoute: '/job/review'
    }, {
    text: 'Do not take the SNAP standard deduction, use my Medicaid business expenses',
    selection: false,
    expectedRoute: '/job/expense'
    }
  ])('navigates to $expectedRoute if take deduction is $selection', async ({ text, selection, expectedRoute }) => {
    const radio: HTMLInputElement = screen.getByTestId("take_deduction_radio")
    fireEvent.click(screen.getByText(text))
    waitFor(() => {
      expect(radio.checked).toEqual(selection)
    })
    fireEvent.click(screen.getByTestId("continue-button"))


    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: expectedRoute
      })
    })

    const benefits = selectBenefits(store.getState())
    expect(benefits.standardDeduction).toBe(selection)
  })
})