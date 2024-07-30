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

import handleInputVisibility from "../Reusables/Functions/handleInputVisibility";

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

  const inputLength = 30;

  return (
    <Container component="div">
      <Typography
        variant="h5"
        sx={{ padding: ".5em", textAlign: "center", fontWeight: "500" }}
      >
        Zaloguj się
      </Typography>
      <h3 className="error-text">{error}</h3>
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
            placeholder="Nazwa użytkownika"
            autoComplete="username"
          ></TextField>
          <TextField
            label="Hasło"
            variant="standard"
            inputRef={passwordRef}
            type={showPassword ? "text" : "password"}
            name="password"
            onChange={(e) =>
              loginDispatch({
                type: ActionType.Password,
                payload: e.target.value,
              })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff></VisibilityOff>
                    ) : (
                      <Visibility></Visibility>
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Hasło"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            variant="contained"
            name="submit"
            value="Zaloguj"
            sx={{ margin: "1.5em .5em" }}
          >
            Zaloguj
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default MainLogin;
