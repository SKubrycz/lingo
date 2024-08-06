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
  const [viewedContent, setViewedContent] = useState<string | null | undefined>(
    null
  ); // ---> Might be removed in the future
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  //TO DO: Redux part here later to be closely examined

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  useEffect(() => {
    alertSnackbarDataDispatch(
      setAlert({
        severity: severity,
        variant: variant,
        title: title,
        content: content,
      })
    );
    if (content) setShowSnackbar(true);
    setViewedContent(content);
  }, [content]);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
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
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          onClose={handleCloseSnackbar}
        >
          {alertSnackbarData.title ? (
            <AlertTitle>{alertSnackbarData.title}</AlertTitle>
          ) : null}
          {alertSnackbarData.content /* {viewedContent} */}
        </Alert>
      </Snackbar>
    </>
  );
}
