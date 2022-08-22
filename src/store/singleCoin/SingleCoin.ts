import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SingleCoin } from "../../config/api";
import { ISingleCoin } from "../../types/types";


interface singleCoinState {
  coin: ISingleCoin | null,
  loading: boolean;
  error: null | string
}

const initialState: singleCoinState = {
  coin: null,
  loading: false,
  error: null
}

export const fetchSingleCoin = createAsyncThunk<ISingleCoin, string, {rejectValue: string}>(
  'coin, fetchSingleCoin',
  async function (id, {rejectWithValue}) {
    const response = await fetch(SingleCoin(id))

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data: ISingleCoin = await response.json();

    return data
  }
)

const coinSlice = createSlice({
  name: 'coin',
  initialState,
  reducers: {
    unFetchCoin(state) {
      state.coin = null;
      state.loading = false;
      state.error = null
    }
  },
  extraReducers(builder) {
    builder
    .addCase(fetchSingleCoin.pending, (state) => {
      state.loading = true;
      state.error = null
    })
    .addCase(fetchSingleCoin.fulfilled, (state, action) => {
      state.loading = false;
      state.coin = action.payload
    })
    .addMatcher(isError, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload
    })
  },
})

export default coinSlice.reducer;
export const {unFetchCoin} = coinSlice.actions

function isError (action: AnyAction) {
  return action.type.endsWith('rejected')
}