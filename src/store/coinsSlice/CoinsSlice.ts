import { createSlice, createAsyncThunk, PayloadAction, AnyAction } from '@reduxjs/toolkit';

import { CoinList } from '../../config/api';
import { CoinType } from '../../types/types';

interface coinsState {
  coins: CoinType[],
  loading: boolean;
  error: null | string
}

const initialState: coinsState = {
  coins: [],
  loading: false,
  error: null
}

export const fetchCoins = createAsyncThunk<CoinType[], string, {rejectValue: string}>(
  'coins/fetchCoins',
  async function (currency, {rejectWithValue}) {
    const response = await fetch(CoinList(currency))

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.json();

    return data
  }
)

const coinsSlice = createSlice({
  name: 'coins',
  initialState,
  reducers: {},
  extraReducers(builder) {
      builder
        .addCase(fetchCoins.pending, (state) => {
          state.loading = true;
          state.error = null
        })
        .addCase(fetchCoins.fulfilled, (state, action) => {
          state.loading = false;
          state.coins = action.payload
        })
        .addMatcher(isError, (state, action: PayloadAction<string>) => {
          state.loading = false;
          state.error = action.payload
        })
  },
})

export default coinsSlice.reducer;

function isError (action: AnyAction) {
  return action.type.endsWith('rejected')
}