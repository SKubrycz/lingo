import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

import { Container, Box, Button, TextField } from "@mui/material";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import { LoginState, LoginActions, ActionType } from "../Login/loginTypes";
import handleLanguageURL from "../../utilities/handleLanguageURL";

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

interface MainLoginProps {
  languageData: any;
}

function MainLogin({ languageData }: MainLoginProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
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

    const route = handleLanguageURL("/login", stateLanguageData.lang);

    await axios
      .post(route, loginData, {
        withCredentials: true,
      })
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

  return (
    <Container component="div">
      <Box component="main" className="main-login">
        <PageTitle title={languageData?.title ?? "Zaloguj się"}></PageTitle>
        <Box
          component="form"
          className="login-form"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            label={languageData?.loginPlaceholder ?? "Nazwa użytkownika"}
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
            autoComplete="username"
          ></TextField>
          <PasswordInput
            label={languageData?.passwordPlaceholder ?? "Hasło"}
            name="password"
            openTooltip={false}
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
            sx={{
              margin: "1.5em .5em",
              backgroundColor: "primary.contrastText",
            }}
          >
            {languageData?.button ?? "Zaloguj"}
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
