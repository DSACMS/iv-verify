import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('Grounding and context page', async () => {
  let store: EnhancedStore
  beforeEach(() => {
    vi.mock('next/navigation', () => ({
      useRouter: () =>  mockRouter,
      usePathname: () => mockRouter.asPath,
    }))
    mockRouter.push('/')
    store = makeStore()
    render (<Provider store={store}><Page /></Provider>)
  })
  afterEach(cleanup)

  it('shows header', () => {
    expect(screen.getByTestId('placeholder_header')).toBeDefined()
  })

  it('shows button', () => {
    expect(screen.getByTestId('placeholder_button')).toBeDefined()
  })

  it('navigates when clicked', async () => {
    fireEvent.click(screen.getByTestId('placeholder_button'))
    await waitFor(() => {
      expect(mockRouter).toMatchObject({
        asPath: "/introduction/how-this-works"
      })
    })
  })
})