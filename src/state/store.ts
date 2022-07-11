import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Features
import historicDataReducer from './features/historicData/historicDataSlice';
import dailyDataReducer from './features/dailyData/dailyDataSlice';
import welcomeModalReducer from './features/welcomeModal/welcomeModalSlice';

const rootReducer = combineReducers({
    historicData: historicDataReducer,
    dailyData: dailyDataReducer,
    welcomeModal: welcomeModalReducer
})

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch<AppDispatch>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector