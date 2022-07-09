import { configureStore } from '@reduxjs/toolkit';
import historicDataReducer from './features/historicData/historicDataSlice';
import dailyDataReducer from './features/dailyData/dailyDataSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    historicData: historicDataReducer,
    dailyData: dailyDataReducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>