import { configureStore } from "@reduxjs/toolkit";
import alertSnackbarReducer from "./alertSnackbarSlice";
import languageReducer from "./languageSlice";
import lessonReducer from "./lessonSlice";
import timeSpentReducer from "./timeSpentSlice";

export const store = configureStore({
  reducer: {
    alertSnackbarReducer: alertSnackbarReducer,
    languageReducer: languageReducer,
    lessonReducer: lessonReducer,
    timeSpentReducer: timeSpentReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
