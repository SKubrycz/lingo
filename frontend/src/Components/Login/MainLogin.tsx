import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useEffect, useReducer, useState, useRef } from "react";

import {
  Container,
  Box,
  Button,
  Typography,
  Icon,
  IconButton,
  Input,
  TextField,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useMessage } from "../..";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import ErrorSnackbar from "../Reusables/Informational/ErrorSnackbar";

type LoginState = {
  login: string;
  password: string;
};

enum ActionType {
  Login = "login",
  Password = "password",
}

interface LoginActions {
  type: ActionType;
  payload?: string;
}

const loginReducer = (state: LoginState, action: LoginActions) => {
  const { type, payload } = action;
  switch (type) {
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
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

function MainLogin() {
  const [loginData, loginDispatch] = useReducer(loginReducer, {
    login: "",
    password: "",
  });

  const [error, setError] = useState<string | null>();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const passwordRef = useRef<HTMLInputElement>(null);

  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    setMessage(undefined);
  }, [message, setMessage]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/login", loginData, { withCredentials: true })
      .then(() => {
        setMessage("Zalogowano pomyślnie");
        console.log(message);
        navigate("/lessons", { state: "Zalogowano pomyślnie" });
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
      <Typography
        variant="h5"
        sx={{ padding: ".5em", textAlign: "center", fontWeight: "500" }}
      >
        Zaloguj się
      </Typography>
      <Box component="main" sx={{ display: "flex", justifyContent: "center" }}>
        <Box
          component="form"
          className="login-form"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            label="Nazwa użytkownika"
            variant="standard"
            type="login"
            name="login"
            autoFocus={true}
            onChange={(e) =>
              loginDispatch({ type: ActionType.Login, payload: e.target.value })
            }
            inputProps={{
              maxLength: inputLength,
            }}
            autoComplete="username"
          ></TextField>
          <PasswordInput
            label="Hasło"
            name="password"
            inputLength={inputLength}
            autoComplete="current-password"
            inputDispatch={(e) =>
              loginDispatch({
                type: ActionType.Password,
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
            Zaloguj
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

export default MainLogin;
