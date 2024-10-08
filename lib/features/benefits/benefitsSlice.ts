import { createSlice, PayloadAction} from '@reduxjs/toolkit'
import type { RootState } from '@/lib/store'

export interface BenefitsState {
  medicaid: boolean
  snap: boolean
  standardDeduction: boolean
  deductionAmount: number
}

/**
 * This is the defaults for the pilot for Oregon
 */
export const initialState: BenefitsState = { 
  medicaid: false,
  snap: false,
  standardDeduction: false,
  deductionAmount: 50,
}


export const benefitsSlice = createSlice({
  name: 'benefits/set',
  initialState,
  reducers: {
    setBenefits: (state, action: PayloadAction<BenefitsState>) => {
      return {...action.payload}
    }
  }
})

export const { setBenefits } = benefitsSlice.actions
export const selectBenefits = (state: RootState) => state.benefits

export default benefitsSlice.reducer
