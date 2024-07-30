import { Snackbar, Alert, AlertTitle } from "@mui/material";

interface ErrorSnackbarProps {
  error: string | null | undefined;
  showSnackbar: boolean;
  handleCloseSnackbar: (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => void;
}

export default function ErrorSnackbar({
  error,
  showSnackbar,
  handleCloseSnackbar,
}: ErrorSnackbarProps) {
  return (
    <>
      <Snackbar
        open={showSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
      >
        <Alert severity="error" variant="filled" onClose={handleCloseSnackbar}>
          <AlertTitle>Błąd</AlertTitle>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
