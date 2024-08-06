import { configureStore } from '@reduxjs/toolkit';
import alertSnackbarReducer from './alertSnackbar/alertSnackbar';

export const store = configureStore({
    reducer: {alertSnackbarReducer},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;