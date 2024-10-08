import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '../../../store'

export interface ExpenseItem {
  job: string
  name: string
  expenseType: string
  amount: number
  date: string
  isMileage: boolean
}

export interface SetExpensePayload {
  item: ExpenseItem
  id: string
}

interface ExpenseState {
  byId: {
    [id: string]: ExpenseItem
  },
  allIds: Array<string>
}

export const initialState: ExpenseState = {
  byId: {},
  allIds: []
}

export const expenseSlice = createSlice({
  name: 'job/expense',
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<SetExpensePayload>) => {
      const id = action.payload.id

      state.byId[id] = action.payload.item
      state.allIds.push(id)
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      delete state.byId[action.payload]

      state.allIds = state.allIds.filter(id => id !== action.payload )
    },
    setExpenseItem: (state, action: PayloadAction<SetExpensePayload>) => {
      const id = action.payload.id
      state.byId[id] = action.payload.item
    }
  }
})

export const { addExpense, removeExpense, setExpenseItem } = expenseSlice.actions

export const selectExpenseItemAt = (state: RootState, id: string) => state.expenses.byId[id]
export const selectExpensesByJob = (state: RootState, jobId: string) => {
  const selectedExpenses: Array<ExpenseItem> = []

  for (const expenseId in state.expenses.byId) {
    const currentExpense = selectExpenseItemAt(state, expenseId)
    if (currentExpense.job === jobId)
      selectedExpenses.push(currentExpense)
  }

  return selectedExpenses
}



export default expenseSlice.reducer