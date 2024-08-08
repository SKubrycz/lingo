import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAlert } from "./alertSnackbar";

interface AlertSnackbarState {
    severity: "success" | "info" | "warning" | "error" | undefined;
    variant: "standard" | "filled" | "outlined" | undefined;
    title?: string | null;
    content: string | null | undefined;
}

//Might be removed

export const setAlertSnackbar = (state: AlertSnackbarState) => {
    const alertSnackbarDataDispatch = useDispatch();

    const { severity, variant, title, content } = state;

    alertSnackbarDataDispatch(
        setAlert({
          severity: severity,
          variant: variant,
          title: title,
          content: content,
        })
    );
}