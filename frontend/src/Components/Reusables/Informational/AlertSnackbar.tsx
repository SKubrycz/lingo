import { Snackbar, Alert, AlertTitle, Fade } from "@mui/material";

import { useEffect, useState } from "react";

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

  useEffect(() => {
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
          severity={severity}
          variant={variant}
          onClose={handleCloseSnackbar}
        >
          {title ? <AlertTitle>{title}</AlertTitle> : null}
          {viewedContent}
        </Alert>
      </Snackbar>
    </>
  );
}
