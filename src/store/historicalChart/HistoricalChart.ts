import { AnyAction, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HistoricalChart } from "../../config/api";

import { IChart } from "../../types/types";

interface chartSliceState {
  chart: IChart | null,
  loading: boolean,
  error: null | string
}
interface ChartAttributes {
  id: string
  days: number
  currency: string
}

export const fetchChart = createAsyncThunk <IChart, ChartAttributes, {rejectValue: string}> (
  'chart, fetchChart',
  async function (chart,  {rejectWithValue}) {
    const {currency, days, id} = chart 
    const response = await fetch(HistoricalChart(id, days, currency))

    if (!response.ok) {
      return rejectWithValue('Server Error!')
    }

    const data = await response.json() as IChart;

    return data
  } 
)

const initialState: chartSliceState = {
  chart: null,
  error: null,
  loading: false
}

const chartSlice = createSlice({
  name: 'chart',
  initialState,
  reducers: {
    unFetchChart (state) {
      state.loading = false;
      state.chart = null;
      state.error = null;
    }
  },
  extraReducers(builder) {
    builder 
      .addCase(fetchChart.pending, (state) => {
        state.loading = true;
        state.error = null
      })
      .addCase(fetchChart.fulfilled, (state, action) => {
        state.loading = false;
        state.chart = action.payload
      })
      .addMatcher(isError, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload
      })
  },
})

export const {unFetchChart} = chartSlice.actions

export default chartSlice.reducer

function isError (action: AnyAction) {
  return action.type.endsWith('rejected')
}