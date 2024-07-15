import { beforeEach, describe, expect, it } from "vitest"
import reducer, { SignedStatementState, initialState, selectSignedStatement, setConfimationNumber, setSignedStatement } from './statementSlice'
import { EnhancedStore } from "@reduxjs/toolkit"
import { makeStore } from "@/lib/store"

describe('StatementSlice', () => {
    const signedStatement: SignedStatementState = {
        amount: 55.66,
        confirmationNumber: '123456789',
        lastDayOfWork: new Date().toString(),
        lastPayment: new Date().toString(),
        name: 'Joe',
        signedDate: new Date().toString(),
        signedName: 'Joe',
        understood: true,
    }

    describe('Actions', () => {
        it('should set the initial state', () => {
            expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState)
        })

        it('set signed statement', () => {
            expect(reducer(initialState, setSignedStatement(signedStatement))).toEqual(signedStatement)
        })

        it('set confirmation number', () => {
            expect(reducer(initialState, setSignedStatement(signedStatement))).toEqual(signedStatement)
            expect(reducer(initialState, setConfimationNumber('77777')).confirmationNumber).toEqual('77777')
        })
    })

    describe('Selectors', () => {
        let store: EnhancedStore

        beforeEach(() => {
            store = makeStore()
            store.dispatch(setSignedStatement(signedStatement))
        })

        it('select the signed statement', () => {
            expect(selectSignedStatement(store.getState())).toEqual(signedStatement)
        })
    })
})