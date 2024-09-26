import { Action, combineReducers, configureStore } from "@reduxjs/toolkit";
import jobReducer, { selectJobTotal } from './features/job/jobSlice'
import expenseReducer, { selectExpenseTotal } from './features/job/expenses/expensesSlice'
import paymentReducer from './features/job/payment/paymentSlice'
import statementReducer from './features/statement/statementSlice'
import benefitsReducer, { selectBenefits } from './features/benefits/benefitsSlice'
import userReducer from './features/user/userSlice'
import { setInitialStateAction } from "./actions";

export const makeStore = () => {
    const appReducers = combineReducers({
        benefits: benefitsReducer,
        jobs: jobReducer,
        statement: statementReducer,
        user: userReducer,
        payments: paymentReducer,
        expenses: expenseReducer,
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

/**
 * Post-expenses, evaluate if standard deduction is more avantageous. 
 * If total income * std ded > expenses, then should return true
 * 
 * TODO: Needs tests
 * TODO: why are the std ded methods here and not in benefits slice?
 * 
 * @param state 
 * @returns 
 */
export const isStandardDeductionBetter = (state: RootState) => {
    const benefits = selectBenefits(state)
    const incomeTotal = selectJobTotal(state)
    const expenseTotal = selectExpenseTotal(state)

    const percent = benefits.deductionAmount / 100
    return expenseTotal < incomeTotal * percent
}

/**
 * Do we recommend they take a standard deduction based on SNAP?
 * This is to evaluate before they add expenses
 * 
 * TODO: add amount that expenses should be less than
 * TODO: add tests
 * 
 * @param state RootState
 * @returns Boolean
 */
export const recommendStandardDeduction = (state: RootState) => {
    const benefits = selectBenefits(state)

    return (benefits.standardDeduction || benefits.snap || benefits.deductionAmount !== undefined) ? true : false
}