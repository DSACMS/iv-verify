import { Action, ConfigureStoreOptions, Store, combineReducers, configureStore } from "@reduxjs/toolkit";
import incomeReducer, { selectIncomeTotal } from './features/ledger/income/incomeSlice'
import expenseReducer, { selectExpenseTotal } from './features/ledger/expenses/expensesSlice'
import statementReducer from './features/statement/statementSlice'
import benefitsReducer, { selectBenefits } from './features/benefits/benefitsSlice'
import { setInitialStateAction } from "./actions";

export const makeStore = () => {
    const appReducers = combineReducers({
        incomeLedger: incomeReducer,
        expensesLedger: expenseReducer,
        statement: statementReducer,
        benefits: benefitsReducer,
    })
    const rootReducer = (state: any, action: Action) => {
        if (setInitialStateAction.match(action)) {
            state = action.payload
        }
        return appReducers(state, action)
    }

    return configureStore({
        reducer: rootReducer
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const selectRecommendStandardDeduction = (state: RootState) => {
    const benefits = selectBenefits(state)
    const incomeTotal = selectIncomeTotal(state)
    const expenseTotal = selectExpenseTotal(state)

    if (!benefits.snap || benefits.deductionAmount === undefined) {
        return false
    }

    const percent = benefits.deductionAmount / 100
    return expenseTotal < incomeTotal * percent
}