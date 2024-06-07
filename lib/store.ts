import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import incomeReducer from './features/ledger/income/incomeSlice'
import expenseReducer from "./features/ledger/expenses/expensesSlice";
export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            incomeLedger: incomeReducer,
            expensesLedger: expenseReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']