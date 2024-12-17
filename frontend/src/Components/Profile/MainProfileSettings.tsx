import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import { renderToStaticNodeStream } from "react-dom/server";

interface PrepareAccount {
  message: string;
  uuid: string;
}

interface MainProfileSettingsProps {
  open: boolean;
  onClose: () => void;
}

export default function MainProfileSettings({
  open,
  onClose,
}: MainProfileSettingsProps) {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);

  const handleConfirmOpen = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const prepareAccountDeletion = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res: AxiosResponse<PrepareAccount> = await axios.post(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/delete-account`,
        undefined,
        { withCredentials: true }
      );

      console.log(res);

      if (res?.data.uuid) {
        navigate(`/delete-account/${res.data.uuid}`);
      }
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "Błąd",
            content: error?.response?.data.message,
          })
        );
      }
    }
  };

  return (
    <>
      <Dialog open={open} onClose={() => onClose()}>
        <DialogTitle sx={{ textAlign: "center" }}>Ustawienia</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleConfirmOpen()}
          >
            Usuń konto
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => handleConfirmClose()}>
        <DialogTitle>Czy na pewno chcesz usunąć konto?</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            method="post"
            className="form-button"
            onSubmit={(e) => prepareAccountDeletion(e)}
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              wordWrap: "break-word",
            }}
          >
            <Button type="submit" variant="contained" color="error">
              Tak
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => handleConfirmClose()}
            >
              Nie
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
