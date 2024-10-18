import { describe, expect, it } from 'vitest'

import { generateFormattedDate, today } from './date'

describe('today', () => {
  it('returns today as a date object', () => {
    const todaysDate = new Date()

    expect(today()).toBeInstanceOf(Date)
    expect(today().toDateString()).toEqual(todaysDate.toDateString())
  })
})

describe('getFormattedDate', () => {
  it('returns a date formatted as MM/DD/YYYY \(with leading zeros\)', () => {
    const dateUnderTest = new Date(2024, 5, 1) // June 1, 2024

    expect(generateFormattedDate(dateUnderTest)).toEqual('06/01/2024')
  })
  it('can change the date given the optional parameter', () => {
    const dateUnderTest = new Date(2024, 5, 1) // June 1, 2024
    const changedDate = '6'

    expect(generateFormattedDate(dateUnderTest, changedDate)).toEqual('06/06/2024')
  })
  it.each([
    ['12/31/2004', 2004, 11, 31],
    ['01/01/2025', 2025, 0, 1],
    ['02/29/2024', 2024, 1, 29],
    ['03/01/2023', 2023, 1, 29]
  ])('can handle the edges: %i ', (expected, y, m, d) => {
    expect(generateFormattedDate(new Date(y, m, d))).toEqual(expected)
  } )
})