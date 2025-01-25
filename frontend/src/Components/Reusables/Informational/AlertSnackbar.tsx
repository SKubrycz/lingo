import { Snackbar, Alert, AlertTitle, Fade } from "@mui/material";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { setAlert } from "../../../state/alertSnackbarSlice";

interface AlertSnackbarProps {
  severity: "success" | "info" | "warning" | "error" | undefined;
  variant: "standard" | "filled" | "outlined" | undefined;
  title?: string | null;
  content: string | null | undefined;
}

export default function AlertSnackbar({
  severity,
  variant,
  title,
  content,
}: AlertSnackbarProps) {
  const [acceptedState, setAcceptedState] = useState<AlertSnackbarProps>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const alertSnackbarDataDispatch = useDispatch();

  const handleAcceptedState = () => {
    if (content) {
      setAcceptedState({
        severity: severity,
        variant: variant,
        title: title,
        content: content,
      });
      setShowSnackbar(true);
    }
  };

  useEffect(() => {
    handleAcceptedState();
  }, [content]);

  const handleCloseSnackbar = (
    e?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
    alertSnackbarDataDispatch(
      setAlert({
        severity: "info",
        variant: "standard",
        title: null,
        content: null,
      })
    );
  };

  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={(e, reason) => handleCloseSnackbar(e, reason)}
        TransitionComponent={Fade}
        sx={{ boxShadow: 3 }}
      >
        <Alert
          severity={acceptedState?.severity}
          variant={acceptedState?.variant}
          onClose={handleCloseSnackbar}
        >
          {acceptedState?.title ? (
            <AlertTitle>{acceptedState?.title}</AlertTitle>
          ) : null}
          {acceptedState?.content}
        </Alert>
      </Snackbar>
    </>
  );
}
