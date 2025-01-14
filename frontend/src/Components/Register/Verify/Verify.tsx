import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Button, Input, Typography } from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbarSlice";

import AlertSnackbar from "../../Reusables/Informational/AlertSnackbar";

import "../Register.scss";
import getBackground from "../../../utilities/getBackground";
import handleLanguageURL from "../../../utilities/handleLanguageURL";

export default function Verify() {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const [code, setCode] = useState<string>("");
  const [languageData, setLanguageData] = useState<any | null>(null);
  const { verifyId } = useParams<{ verifyId: string | undefined }>();

  const navigate = useNavigate();

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const handleVerify = async () => {
    const route = handleLanguageURL(
      `/verify/${verifyId}`,
      stateLanguageData.lang
    );

    await axios
      .get(route)
      .then((res) => {
        console.log(res.data);
        if (res.data.languageData) {
          setLanguageData(res.data.languageData);
        }
      })
      .catch((err) => {
        if (err.status == 308) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );

          navigate("/");
        } else if (err.response.status == 404) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );

          navigate("/not-found");
        } else {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );

          navigate("/");
        }
      });
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    const route = handleLanguageURL(
      `/verify/${verifyId}`,
      stateLanguageData.lang
    );

    await axios
      .post(route, {
        verificationCode: code,
      })
      .then((res) => {
        console.log(res.data);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "success",
            variant: "standard",
            content: res.data.message,
          })
        );
        navigate("/login");
      })
      .catch((err) => {
        if (err.response.status == 308) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );

          navigate("/");
        } else if (err.response.status == 400) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );
        } else {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              content: err.response.data.message,
            })
          );

          navigate("/");
        }
      });
  };

  useEffect(() => {
    if ((verifyId && verifyId.length < 32) || !verifyId) {
      navigate("/");
      return;
    }

    handleVerify();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        component="form"
        method="post"
        className="form-button"
        onSubmit={(e) => submitCode(e)}
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
        <Typography variant="h6" sx={{ margin: "0.6em" }}>
          {languageData?.title ? languageData?.title : "Zweryfikuj swoje konto"}
        </Typography>
        <Typography>
          {languageData?.subtitle
            ? languageData?.subtitle
            : `Podaj kod weryfikacyjny, który wysłaliśmy Ci na Twój email podany podczas rejestracji`}
          :
        </Typography>
        <Input
          type="text"
          autoFocus
          required
          onChange={(e) => setCode(e.target.value)}
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
          name="submit"
          value={languageData?.submit ? languageData?.submit : "Zatwierdź"}
          sx={{
            margin: "1.5em .5em",
            backgroundColor: "primary.contrastText",
          }}
        >
          {languageData?.submit ? languageData?.submit : "Zatwierdź"}
        </Button>
      </Box>
      <AlertSnackbar
        severity={alertSnackbarData.severity}
        variant={alertSnackbarData.variant}
        title={alertSnackbarData.title}
        content={alertSnackbarData.content}
      ></AlertSnackbar>
    </Box>
  );
}
