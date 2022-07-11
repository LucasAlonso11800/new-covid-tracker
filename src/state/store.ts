import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Features
import historicDataReducer from './features/historicData/historicDataSlice';
import dailyDataReducer from './features/dailyData/dailyDataSlice';
import welcomeModalReducer from './features/welcomeModal/welcomeModalSlice';

export const store = configureStore({
  reducer: {
    historicData: historicDataReducer,
    dailyData: dailyDataReducer,
    welcomeModal: welcomeModalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector