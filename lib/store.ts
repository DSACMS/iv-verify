import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './features/counter/counterSlice'
import incomeReducer from './features/ledger/income/incomeSlice'
export const makeStore = () => {
    return configureStore({
        reducer: {
            counter: counterReducer,
            incomeLedger: incomeReducer,
        }
    })
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']