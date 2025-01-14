import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useReducer, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

import { Container, Box, TextField, Button, Tooltip } from "@mui/material";

import PasswordInput from "../Reusables/PasswordInput/PasswordInput";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import PageTitle from "../Reusables/PageTitle/PageTitle";

import {
  RegisterState,
  RegisterActions,
  ActionType,
} from "../Register/registerTypes";
import handleLanguageURL from "../../utilities/handleLanguageURL";

const registerReducer = (state: RegisterState, action: RegisterActions) => {
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

interface MainRegisterProps {
  languageData: any;
}

function MainRegister({ languageData }: MainRegisterProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const [registerData, registerDispatch] = useReducer(registerReducer, {
    email: "",
    login: "",
    password: "",
    passwordAgain: "",
  });

  const navigate = useNavigate();

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const route = handleLanguageURL("/register", stateLanguageData.lang);

    await axios
      .post(route, registerData)
      .then((res) => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "success",
            variant: "standard",
            content: "Rejestracja przebiegła pomyślnie",
          })
        );
        navigate(`/verify/${res.data.uuid}`, {
          state: "Rejestracja przebiegła pomyślnie",
        });
      })
      .catch((error) => {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            content: error.response.data,
          })
        );
        console.log(error);
      });
  };

  const inputLength: number = 30;

  return (
    <Container component="div">
      <Box component="main" className="main-register">
        <PageTitle title={languageData?.title ?? "Rejestracja"}></PageTitle>
        <Box
          component="form"
          className="register-form"
          method="post"
          onSubmit={(e) => handleSubmit(e)}
        >
          <TextField
            label={languageData?.emailPlaceholder ?? "Adres Email"}
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
          ></TextField>
          <Tooltip
            title={
              languageData?.loginPlaceholder?.tooltip ??
              "Nazwa użytkownika musi być dłuższa niż 3 znaki"
            }
            arrow={true}
          >
            <TextField
              label={
                languageData?.loginPlaceholder.placeholder ??
                "Nazwa użytkownika"
              }
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
            ></TextField>
          </Tooltip>
          <PasswordInput
            label={languageData?.passwordPlaceholder?.placeholder ?? "Hasło"}
            name="password"
            tooltipTitle={
              languageData?.passwordPlaceholder?.tooltip ??
              "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny"
            }
            openTooltip={true}
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
            label={
              languageData?.passwordAgainPlaceholder?.placeholder ??
              "Hasło ponownie"
            }
            name="password-again"
            tooltipTitle={
              languageData?.passwordAgainPlaceholder?.tooltip ??
              "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny"
            }
            openTooltip={true}
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
            value={languageData?.button ?? "Zarejestruj"}
            sx={{
              margin: "1.5em .5em",
              backgroundColor: "primary.contrastText",
              "&.MuiButton-contained": {
                "&:hover": {
                  backgroundColor: "primary.dark",
                },
              },
            }}
          >
            {languageData?.button ?? "Zarejestruj"}
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

export default MainRegister;
