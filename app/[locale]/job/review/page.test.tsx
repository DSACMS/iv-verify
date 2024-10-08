import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('Review Screen', async () => {
  let store: EnhancedStore
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/job/review')
    store = makeStore()
    render (<Provider store={store}><Page /></Provider>)
  })
  afterEach(cleanup)

  it('shows header', () => {
    expect(screen.getByTestId('review-header')).toBeDefined()
  })

  it('shows continue button', () => {
    expect(screen.getByTestId('continue-button')).toBeDefined()
  })

  it('Clicking button navigates', () => {
    fireEvent.click(screen.getByTestId('continue-button'))

    waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/statement/sign"
      })
    })
  })
})