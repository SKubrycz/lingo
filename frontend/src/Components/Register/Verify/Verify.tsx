import axios from "axios";

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Box, Button, Input, Typography } from "@mui/material";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbar/alertSnackbar";

import AlertSnackbar from "../../Reusables/Informational/AlertSnackbar";

import "../Register.scss";

export default function Verify() {
  const [code, setCode] = useState<string>("");
  const { verifyId } = useParams<{ verifyId: string | undefined }>();

  const navigate = useNavigate();

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const handleVerify = async () => {
    await axios
      .get(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/verify/${verifyId}`
      )
      .then((res) => {
        // alertSnackbarDataDispatch(
        //   setAlert({
        //     severity: "info",
        //     variant: "standard",
        //     title: "Informacja",
        //     content: res.data,
        //   })
        // );
        // navigate("/login");
      })
      .catch((err) => {
        if (err.status == 308) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: err.response.data,
            })
          );

          navigate("/");
        } else if (err.response.status == 404) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: err.response.data,
            })
          );

          navigate("/not-found");
        } else {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: err.response.data,
            })
          );

          navigate("/");
        }
      });
  };

  const submitCode = async (e: React.FormEvent) => {
    e.preventDefault();

    await axios
      .post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/verify/${verifyId}`,
        {
          verificationCode: code,
        }
      )
      .then((res) => {
        console.log(res.data);
        console.log(`code ${code} submitted`);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "success",
            variant: "standard",
            title: "Sukces",
            content: res.data,
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
              title: "Błąd",
              content: err.response.data,
            })
          );

          navigate("/");
        } else if (err.response.status == 400) {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: err.response.data,
            })
          );
        } else {
          alertSnackbarDataDispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: err.response.data,
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
          Zweryfikuj swoje konto
        </Typography>
        <Typography>
          Podaj kod weryfikacyjny, który wysłaliśmy Ci na Twój email podany
          podczas rejestracji:
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
          value="Zatwierdź"
          sx={{
            margin: "1.5em .5em",
            backgroundColor: "primary.contrastText",
          }}
        >
          Zatwierdź
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
