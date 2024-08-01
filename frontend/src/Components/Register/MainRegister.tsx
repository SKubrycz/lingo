import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useReducer, useState, useRef } from "react";

import { Container, Box, TextField, Typography, Button } from "@mui/material";

import { useMessage } from "../../";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

import {
  RegisterState,
  RegisterActions,
  ActionType,
} from "../Register/registerTypes";

const loginReducer = (state: RegisterState, action: RegisterActions) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.Email:
      return {
        ...state,
        email: payload || "",
      };
    case ActionType.Login:
      return {
        ...state,
        login: payload || "",
      };
    case ActionType.Password:
      return {
        ...state,
        password: payload || "",
      };
    case ActionType.PasswordAgain:
      return {
        ...state,
        passwordAgain: payload || "",
      };
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

function MainRegister() {
  const [registerData, registerDispatch] = useReducer(loginReducer, {
    email: "",
    login: "",
    password: "",
    passwordAgain: "",
  });

  const [error, setError] = useState<string | null>();
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const navigate = useNavigate();

  const { message, setMessage } = useMessage();

  useEffect(() => {
    setMessage(undefined);
  }, [message, setMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/register", registerData)
      .then(() => {
        setMessage("Rejestracja przebiegła pomyślnie");
        console.log(message);
        navigate("/", { state: "Rejestracja przebiegła pomyślnie" });
      })
      .catch((error) => {
        setError(error.response.data);
        console.log(error);
      });
  };

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
  };

  const inputLength: number = 30;

  return (
    <Container component="div">
      <Box component="main" className="main-register">
        <Typography
          variant="h5"
          sx={{ padding: ".5em", textAlign: "center", fontWeight: "500" }}
        >
          Rejestracja
        </Typography>
        <Box
          component="form"
          className="register-form"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            label="Adres Email"
            type="email"
            name="email"
            variant="standard"
            autoFocus={true}
            onChange={(e) =>
              registerDispatch({
                type: ActionType.Email,
                payload: e.target.value,
              })
            }
            autoComplete="email"
            inputProps={{
              maxLength: inputLength,
            }}
          ></TextField>
          <TextField
            label="Nazwa użytkownika"
            type="login"
            name="login"
            variant="standard"
            onChange={(e) =>
              registerDispatch({
                type: ActionType.Login,
                payload: e.target.value,
              })
            }
            autoComplete="username"
            inputProps={{
              maxLength: inputLength,
            }}
          ></TextField>
          <PasswordInput
            label="Hasło"
            name="password"
            inputLength={inputLength}
            autoComplete="new-password"
            inputDispatch={(e) =>
              registerDispatch({
                type: ActionType.Password,
                payload: e.target.value,
              })
            }
          ></PasswordInput>
          <PasswordInput
            label="Hasło ponownie"
            name="password-again"
            inputLength={inputLength}
            autoComplete="new-password"
            inputDispatch={(e) =>
              registerDispatch({
                type: ActionType.PasswordAgain,
                payload: e.target.value,
              })
            }
          ></PasswordInput>
          <Button
            type="submit"
            variant="contained"
            name="submit"
            value="Zaloguj"
            sx={{ margin: "1.5em .5em" }}
            onClick={() => setShowSnackbar(!showSnackbar)}
          >
            Zarejestruj
          </Button>
          <AlertSnackbar
            severity={"error"}
            title={"Błąd"}
            content={error}
            showSnackbar={showSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
          ></AlertSnackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default MainRegister;
