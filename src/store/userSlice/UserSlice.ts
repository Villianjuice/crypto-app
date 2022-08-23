import { createSlice } from "@reduxjs/toolkit";
import { IUser } from "../../types/types";

type userSliceState = {
  user: IUser | null;
  loading: boolean;
  error: string | null
}

const initialState: userSliceState  = {
  user: null,
  loading: false,
  error: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer