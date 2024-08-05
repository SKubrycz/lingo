import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AlertSnackbarState {
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
}

const alertSnackbarSlice = createSlice({
    name: "alertSnackbar",
    initialState,
    reducers: {
        setAlert: (state, action: PayloadAction<AlertSnackbarState>) => {
            state.severity = action.payload.severity;
            state.variant = action.payload.variant;
            state.title = action.payload.title;
            state.content = action.payload.content;
        },
    },
});

export const { setAlert } = alertSnackbarSlice.actions;

export default alertSnackbarSlice.reducer;