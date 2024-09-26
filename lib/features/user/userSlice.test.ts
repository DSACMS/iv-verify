import { beforeEach, describe, expect, it } from 'vitest'

import reducer, { UserItem } from './userSlice'
import { makeStore } from '@/lib/store'
import { EnhancedStore } from '@reduxjs/toolkit'

describe('PaymentSlice', () => {
  describe('actions', () => {
    it.skip('should return the initial state')
    it.skip('should handle adding payment items')
    it.skip('should handle editing payment items')
    it.skip('should handle removing payment items')
  });

  describe('selectors', () => {
    it.skip('can select all payment items for a job')
    it.skip('can total all payment items for a job')
  })
})