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
  showSnackbar: boolean;
  handleCloseSnackbar: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

export default function AlertSnackbar({
  severity,
  variant,
  title,
  content,
  showSnackbar,
  handleCloseSnackbar,
}: AlertSnackbarProps) {
  const [viewedContent, setViewedContent] = useState<string | null | undefined>(
    null
  );

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
    setViewedContent(content);
  }, [content]);

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
