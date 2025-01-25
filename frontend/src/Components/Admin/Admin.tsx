import { Box, Button, Input, ThemeProvider, Typography } from "@mui/material";
import axios, { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminTheme } from "../../adminTheme";
import getBackground from "../../utilities/getBackground";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

export default function Admin() {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const [code, setCode] = useState<string>("");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuth = async () => {
    try {
      await axios.get(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin`,
        { withCredentials: true }
      );
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status === 403) {
          navigate("/not-found");
        } else {
          navigate("/");
        }
      }
    }
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/admin`,
        { code: code },
        { withCredentials: true }
      );

      if (
        alertSnackbarData.severity === "error" ||
        alertSnackbarData.severity === "warning"
      ) {
        dispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: null,
          })
        );
      }
      if (res.status >= 200 && res.status < 300) {
        dispatch(
          setAlert({
            severity: "success",
            variant: "filled",
            title: "Sukces",
            content: res.data.message,
          })
        );
      }

      navigate("/admin/panel", {
        state: {
          fromAdmin: true,
        },
      });
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status && error.status > 399) {
          dispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: error.response?.data.message,
            })
          );
        }
      }
    }
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        component="form"
        method="post"
        onSubmit={(e) => submitCode(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "primary.contrastText",
        }}
      >
        <Typography>Podaj kod otrzymany w wiadomości email:</Typography>
        <Input
          autoFocus
          onChange={(e) => setCode(e.target.value)}
          sx={{
            margin: "1em",
            ".MuiInput-input": {
              textAlign: "center",
            },
          }}
        ></Input>
        <Button type="submit" name="submit" variant="contained">
          Zatwierdź
        </Button>
      </Box>
      <AlertSnackbar
        severity={alertSnackbarData.severity}
        variant={alertSnackbarData.variant}
        title={alertSnackbarData.title}
        content={alertSnackbarData.content}
      ></AlertSnackbar>
    </ThemeProvider>
  );
}
