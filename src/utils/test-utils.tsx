import React, { PropsWithChildren } from 'react'
// Redux
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// RTL
import { render } from '@testing-library/react'
// Types
import type { PreloadedState } from '@reduxjs/toolkit'
import type { RenderOptions } from '@testing-library/react'
import type { AppStore, RootState } from '../state/store';

import dailyDataReducer from '../state/features/dailyData/dailyDataSlice'
import historicDataReducer from '../state/features/historicData/historicDataSlice'
import welcomeModalReducer from '../state/features/welcomeModal/welcomeModalSlice'


// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
    preloadedState?: PreloadedState<RootState>
    store?: AppStore
}

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = {},
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: {
                historicData: historicDataReducer,
                dailyData: dailyDataReducer,
                welcomeModal: welcomeModalReducer
            }
            , preloadedState
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
        return <Provider store={store}>{children}</Provider>
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}