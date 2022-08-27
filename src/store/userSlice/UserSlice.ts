import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

type userSliceState = {
  user: IUser | null;
}

const initialState: userSliceState  = {
  user: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  }
})

export const {login, logout} = userSlice.actions

export default userSlice.reducer