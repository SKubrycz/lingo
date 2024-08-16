import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface AlertSnackbarState {
  severity: "success" | "info" | "warning" | "error" | undefined;
  variant: "standard" | "filled" | "outlined" | undefined;
  title?: string | null;
  content: string | null | undefined;
}

const initialState: AlertSnackbarState = {
  severity: "info",
  variant: "standard",
  title: null,
  content: null,
};

const alertSnackbarSlice = createSlice({
  name: "alertSnackbar",
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<AlertSnackbarState>) => {
      const { severity, variant, title, content } = action.payload;
      state.severity = severity;
      state.variant = variant;
      state.title = title;
      state.content = content;
    },
  },
});

export const { setAlert } = alertSnackbarSlice.actions;

export default alertSnackbarSlice.reducer;
