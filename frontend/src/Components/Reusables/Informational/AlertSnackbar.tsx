import { Snackbar, Alert, AlertTitle, Fade } from "@mui/material";

import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbar/alertSnackbar";

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

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  //TO DO: Redux part here later to be closely examined and eventually to replace the useMessage() context

  const handleAcceptedState = () => {
    if (content) {
      setAcceptedState({
        severity: severity,
        variant: variant,
        title: title,
        content: content,
      });
      /*       alertSnackbarDataDispatch(
        setAlert({
          severity: "info",
          variant: "standard",
          title: null,
          content: null,
        })
      ); */
      setShowSnackbar(true);
    }
  };

  useEffect(() => {
    handleAcceptedState();
  }, [content]);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
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
        onClose={handleCloseSnackbar}
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
          {acceptedState?.content /* {viewedContent} */}
        </Alert>
      </Snackbar>
    </>
  );
}
