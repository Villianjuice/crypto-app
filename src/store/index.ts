import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from './coinsSlice/CoinsSlice';
import singleCoinSlice from './singleCoin/SingleCoin';
import chartSlice from './historicalChart/HistoricalChart';
import UserSlice from './userSlice/UserSlice';

const store = configureStore({
  reducer: {
    coins: coinsSlice,
    singleCoin: singleCoinSlice,
    chart: chartSlice,
    user: UserSlice,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;