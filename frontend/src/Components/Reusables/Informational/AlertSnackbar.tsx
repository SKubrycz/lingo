import { Snackbar, Alert, AlertTitle } from "@mui/material";

import React from "react";

interface AlertSnackbarProps {
  severity: "success" | "info" | "warning" | "error" | undefined;
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
  title,
  content,
  showSnackbar,
  handleCloseSnackbar,
}: AlertSnackbarProps) {
  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={severity}
          variant="filled"
          onClose={handleCloseSnackbar}
        >
          {title ? <AlertTitle>{title}</AlertTitle> : null}
          {content}
        </Alert>
      </Snackbar>
    </>
  );
}
