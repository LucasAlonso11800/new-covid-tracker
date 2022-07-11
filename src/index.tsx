import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setupStore } from './state/store';
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <App />
        </Provider>
    </React.StrictMode>
);