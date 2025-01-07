import axios from "axios";
import { Box, Button, Input, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { FormEvent, useEffect, useState } from "react";
import { RootState } from "../../state/store";
import getBackground from "../../utilities/getBackground";

export default function DeleteAccount() {
  const { deleteId } = useParams<{ deleteId: string | undefined }>();

  const [deletionCode, setDeletionCode] = useState<string>("");

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const getDeleteAccount = async () => {
    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/delete-account/${deleteId}`,
        { withCredentials: true }
      );

      console.log(res);
    } catch (error) {
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

  const postDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/delete-account/${deleteId}`,
        { deletionCode: deletionCode },
        { withCredentials: true }
      );

      console.log(res);

      navigate("/");
    } catch (error) {
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

  useEffect(() => {
    getDeleteAccount();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <>
      <Box
        component="form"
        method="post"
        className="form-button"
        onSubmit={(e) => postDeleteAccount(e)}
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          wordWrap: "break-word",
        }}
      >
        <Typography>
          Aby usunąć konto wprowadź kod otrzymany w wiadomości email:
        </Typography>
        <Input
          type="text"
          autoFocus
          required
          onChange={(e) => setDeletionCode(e.target.value)}
          sx={{
            margin: "0.5em",
            fontSize: "18px",
            ".MuiInput-input": {
              textAlign: "center",
            },
          }}
        ></Input>
        <Button
          type="submit"
          variant="contained"
          color="error"
          name="submit"
          value="Zatwierdź"
          sx={{
            margin: "1.5em .5em",
          }}
        >
          Zatwierdź
        </Button>
        <AlertSnackbar
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          title={alertSnackbarData.title}
          content={alertSnackbarData.content}
        ></AlertSnackbar>
      </Box>
    </>
  );
}
