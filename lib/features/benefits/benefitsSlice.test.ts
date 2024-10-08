import { beforeEach, describe, expect, it } from "vitest"
import { generateBenefits } from "@/test/fixtures/generator"

import { EnhancedStore } from "@reduxjs/toolkit"
import { makeStore } from "@/lib/store"

import reducer, { initialState, selectBenefits, setBenefits } from './benefitsSlice'

describe('BenefitsSlice', () => {
	const benefits = generateBenefits()

	describe('Actions', () => {
		it('sets initial state', () => {
			expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
		})

		it('sets the benefits state', () => {
			expect(reducer(initialState, setBenefits(benefits))).toEqual(benefits)
		})
	})

	describe('Selectors', () => {
		let store: EnhancedStore
		beforeEach(() => {
			store = makeStore()
			store.dispatch(setBenefits(benefits))
		})

		it('can select the benefits', () => {
			expect(selectBenefits(store.getState())).toEqual(benefits)
		})
	})
})