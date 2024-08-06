import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import Page from './page'
import { makeStore } from '@/lib/store'
import { vi } from 'vitest'
import { EnhancedStore } from '@reduxjs/toolkit'
import mockRouter from 'next-router-mock'

describe('How this works page', async () => {
  let store: EnhancedStore;
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
    expect(screen.getByTestId('how_this_works_header')).toBeDefined()
  })

  it('navigates when clicked', async () => {
    fireEvent.click(screen.getByTestId('get_started_button'))
    await waitFor(() => {
        expect(mockRouter).toMatchObject({
            asPath: "/introduction/benefits"
        })
    })
  })
})