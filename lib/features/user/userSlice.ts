import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserItem {
  name: string
}

interface UserState {
  name: string
}

export const initialState: UserState = {
  name: ''
}

export const UserSlice = createSlice({
  name: 'user',
  initialState, 
  reducers: {
    addUser: (state, action: PayloadAction<UserItem>) => {
      state.name = action.payload.name
    }
  }
})

export const { addUser } = UserSlice.actions
export default UserSlice.reducer