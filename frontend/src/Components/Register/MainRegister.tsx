import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useReducer, useState, useRef } from "react";

import { Container, Box, TextField, Typography, Button } from "@mui/material";

import { useMessage } from "../../";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import ErrorSnackbar from "../Reusables/Informational/ErrorSnackbar";

type RegisterState = {
  email: string;
  login: string;
  password: string;
  passwordAgain: string;
};

enum ActionType {
  Email = "email",
  Login = "login",
  Password = "password",
  PasswordAgain = "passwordAgain",
}

interface RegisterActions {
  type: ActionType;
  payload?: string;
}

const loginReducer = (state: RegisterState, action: RegisterActions) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.Email:
      //console.log(state.email);
      return {
        ...state,
        email: payload || "",
      };
    case ActionType.Login:
      //console.log(state.login);
      return {
        ...state,
        login: payload || "",
      };
    case ActionType.Password:
      //console.log(state.password);
      return {
        ...state,
        password: payload || "",
      };
    case ActionType.PasswordAgain:
      //console.log(state.passwordAgain);
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

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordAgainRef = useRef<HTMLInputElement>(null);

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
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar(false);
  };

  const inputLength = 30;

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
          <ErrorSnackbar
            error={error}
            showSnackbar={showSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
          ></ErrorSnackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default MainRegister;
