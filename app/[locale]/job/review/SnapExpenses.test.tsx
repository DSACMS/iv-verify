import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { cleanup, render, screen, waitFor } from '@testing-library/react'
import { Provider } from 'react-redux'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'
import { BenefitsState } from '@/lib/features/benefits/benefitsSlice'
import SnapExpenses from './SnapExpenses'

describe('SnapExpenses', async () => {
  const SNAP_INCOME = 342.00

  beforeEach(() => {
    const benefits: BenefitsState = {
      standardDeduction: true,
      deductionAmount: 50,
      medicaid: true,
      snap: true,
    }

    const store: EnhancedStore = makeStore()
    render (<Provider store={store}><SnapExpenses benefits={benefits} snapIncomeTotal={SNAP_INCOME} /></Provider>)
  })
  afterEach(cleanup)

  it('Displays SNAP header', () => {
    waitFor(() => {
      expect(screen.getByTestId('CardHeader')).toBeDefined()
    })
  })

  it('Displays SNAP Income', () => {
    const span = screen.queryByTestId("snap-body")
    waitFor(() => {
      expect(span?.textContent?.indexOf(`${SNAP_INCOME*(.5)}`)).toBeGreaterThanOrEqual(0)
    })
  })
})