import { createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "..";

interface watchListState {
  watchList: string[]
}


const initialState: watchListState = {
  watchList: []
}


const watchList = createSlice({
  name: 'watchList',
  initialState,
  reducers: {
    setWatchList (state, action) {
      state.watchList = action.payload
    }
  }
})

export const addedCoinsSelector = createSelector(
  (state: RootState) => state.coins.coins,
  (state: RootState) => state.watchList.watchList,
  (coins, watchList) => {
    return coins.filter(coin => watchList.includes(coin.id))
  }
) 

export const { setWatchList } = watchList.actions
 
export default watchList.reducer;