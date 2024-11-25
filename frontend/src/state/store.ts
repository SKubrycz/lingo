import { configureStore } from "@reduxjs/toolkit";
import alertSnackbarReducer from "./alertSnackbarSlice";
import languageReducer from "./languageSlice";

export const store = configureStore({
  reducer: {
    alertSnackbarReducer: alertSnackbarReducer,
    languageReducer: languageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
