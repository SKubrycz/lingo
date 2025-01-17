import axios, { AxiosResponse } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Button, Dialog, DialogContent, DialogTitle } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import handleLanguageURL from "../../utilities/handleLanguageURL";
import { RootState } from "../../state/store";

interface PrepareAccount {
  message: string;
  uuid: string;
}

interface MainProfileSettingsProps {
  open: boolean;
  onClose: () => void;
  languageData: any;
}

export default function MainProfileSettings({
  open,
  onClose,
  languageData,
}: MainProfileSettingsProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
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

    const route = handleLanguageURL(`/delete-account`, stateLanguageData.lang);

    try {
      const res: AxiosResponse<PrepareAccount> = await axios.post(
        route,
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
        <DialogTitle sx={{ textAlign: "center" }}>
          {languageData?.dialog?.title
            ? languageData?.dialog?.title
            : "Ustawienia"}
        </DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleConfirmOpen()}
          >
            {languageData?.dialog?.button
              ? languageData?.dialog?.button
              : "Usuń konto"}
          </Button>
        </DialogContent>
      </Dialog>
      <Dialog open={confirmOpen} onClose={() => handleConfirmClose()}>
        <DialogTitle>
          {languageData?.dialog?.confirm?.title
            ? languageData?.dialog?.confirm?.title
            : "Czy na pewno chcesz usunąć konto?"}
        </DialogTitle>
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
              {languageData?.dialog?.confirm?.yes
                ? languageData?.dialog?.confirm?.yes
                : "Tak"}
            </Button>
            <Button
              variant="text"
              color="error"
              onClick={() => handleConfirmClose()}
            >
              {languageData?.dialog?.confirm?.no
                ? languageData?.dialog?.confirm?.no
                : "Nie"}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}
