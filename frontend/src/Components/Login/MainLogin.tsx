import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import { Container, Box, Button, TextField } from "@mui/material";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import { LoginState, LoginActions, ActionType } from "../Login/loginTypes";

const loginReducer = (state: LoginState, action: LoginActions) => {
  const { type, payload } = action;
  switch (type) {
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
    default:
      throw new Error(`No such action: ${action.type}`);
  }
};

function MainLogin() {
  const [loginData, loginDispatch] = useReducer(loginReducer, {
    login: "",
    password: "",
  });

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("http://localhost:8000/login", loginData, { withCredentials: true })
      .then(() => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: "Zalogowano pomyślnie",
          })
        );
        navigate("/lessons", { state: "Zalogowano pomyślnie" });
      })
      .catch((error) => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "Błąd",
            content: error.response.data,
          })
        );
        console.log(error.response.data);
      });
  };

  const inputLength: number = 30;

  //(Probably, but mostly in case of Register component) TODO: Add tooltips for information about input (how long what symbols are valid)

  return (
    <Container component="div">
      <Box component="main" className="main-login">
        <PageTitle title="Zaloguj się"></PageTitle>
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
              loginDispatch({
                type: ActionType.Login,
                payload: e.target.value,
              })
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
          >
            Zaloguj
          </Button>
          <AlertSnackbar
            severity={alertSnackbarData.severity}
            variant={alertSnackbarData.variant}
            title={alertSnackbarData.title}
            content={alertSnackbarData.content}
          ></AlertSnackbar>
        </Box>
      </Box>
    </Container>
  );
}

export default MainLogin;
