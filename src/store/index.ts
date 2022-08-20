import { configureStore } from '@reduxjs/toolkit';
import coinsSlice from './coinsSlice/CoinsSlice';

const store = configureStore({
  reducer: {
    coins: coinsSlice,
  },
});

export default store

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;