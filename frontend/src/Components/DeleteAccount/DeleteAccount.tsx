import axios from "axios";
import { Box, Button, Input, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../state/alertSnackbarSlice";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { FormEvent, useEffect, useState } from "react";
import { RootState } from "../../state/store";
import getBackground from "../../utilities/getBackground";
import handleLanguageURL from "../../utilities/handleLanguageURL";

export default function DeleteAccount() {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const { deleteId } = useParams<{ deleteId: string | undefined }>();

  const [deletionCode, setDeletionCode] = useState<string>("");
  const [languageData, setLanguageData] = useState<any | null>(null);

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const getDeleteAccount = async () => {
    const route = handleLanguageURL(
      `/delete-account/${deleteId}`,
      stateLanguageData.lang
    );

    try {
      const res = await axios.get(route, { withCredentials: true });

      if (res.data.languageData) {
        setLanguageData(res.data.languageData);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "",
            content: error?.response?.data.message,
          })
        );
      }
    }
  };

  const postDeleteAccount = async (e: FormEvent) => {
    e.preventDefault();

    const route = handleLanguageURL(
      `/delete-account/${deleteId}`,
      stateLanguageData.lang
    );

    try {
      const res = await axios.post(
        route,
        { deletionCode: deletionCode },
        { withCredentials: true }
      );

      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "",
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
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          wordWrap: "break-word",
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography>
            {languageData?.subtitle
              ? languageData?.subtitle
              : "Aby usunąć konto wprowadź kod otrzymany w wiadomości email"}
            :
          </Typography>
          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
              value={languageData?.submit ? languageData?.submit : "Zatwierdź"}
              sx={{
                margin: "1.5em .5em",
              }}
            >
              {languageData?.submit ? languageData?.submit : "Zatwierdź"}
            </Button>
          </Box>
        </Box>
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
