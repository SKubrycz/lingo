import { ThemeProvider } from "@emotion/react";
import {
  AppBar,
  Box,
  Button,
  Grid2,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { adminTheme } from "../../../../adminTheme";
import { Done, Edit } from "@mui/icons-material";
import getBackground from "../../../../utilities/getBackground";
import AdminPanelNavbar from "../AdminPanelNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbarSlice";
import { RootState } from "../../../../state/store";
import AlertSnackbar from "../../../Reusables/Informational/AlertSnackbar";

export default function SubpagesEdit() {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const [routeData, setRouteData] = useState<any>();
  const [editing, setEditing] = useState<{
    path: string[];
    value: string;
  } | null>(null);
  const { state } = useLocation();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuth = async () => {
    if (
      state &&
      typeof state.route === "string" &&
      (state.route !== undefined || state.route !== null) &&
      state.language
    ) {
      // fetch specific route translation
      try {
        const res = await axios.get(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/subpages/edit?route=${state.route}&language=${
            state.language
          }`,
          { withCredentials: true }
        );

        setRouteData(res.data);
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.status === 403) {
            navigate("/admin");
          } else {
            if (error.status && error.status > 399) {
              dispatch(
                setAlert({
                  severity: "error",
                  variant: "filled",
                  title: "Błąd",
                  content: error.response?.data.message,
                })
              );
            }

            navigate("/admin");
          }
        }
      }
    }
  };

  useEffect(() => {
    handleAuth();

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  const mapData = (data: any, depth = 0, path: string[] = []) => {
    if (!data) {
      console.log(data);
      return;
    }

    const indent = { marginLeft: `${depth * 20}px` };

    if (Array.isArray(data)) {
      return (
        <Box sx={indent}>
          {data.map((el, i) => {
            return (
              <b key={i}>{mapData(el, depth + 1, [...path, i.toString()])}</b>
            );
          })}
        </Box>
      );
    } else if (typeof data === "object" && data !== null) {
      return (
        <Box sx={indent}>
          {Object.entries(data).map(([key, value]) => {
            if (key === "metadata") return;
            return (
              <div key={key}>
                <b>{key}</b>: {mapData(value, depth + 1, [...path, key])}
              </div>
            );
          })}
        </Box>
      );
    } else {
      return (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {editing?.path.join(".") === path.join(".") ? (
            <>
              <TextField
                value={editing.value}
                onChange={(e) =>
                  setEditing({ ...editing, value: e.target.value })
                }
                size="small"
                variant="outlined"
                sx={{ marginRight: 1 }}
              ></TextField>
              <IconButton
                onClick={() => {
                  updateRouteData(path, editing.value);
                  setEditing(null);
                }}
              >
                <Done></Done>
              </IconButton>
            </>
          ) : (
            <>
              <Typography sx={indent}>{String(data)}</Typography>
              <IconButton
                onClick={() => setEditing({ path, value: String(data) })}
              >
                <Edit sx={{ fontSize: 14 }}></Edit>
              </IconButton>
            </>
          )}
        </Box>
      );
    }
  };

  const updateRouteData = (path: string[], newValue: string) => {
    const updatedData = { ...routeData };
    let current = updatedData;

    for (let i = 0; i < path.length - 1; i++) {
      current = current[path[i]];
    }

    current[path[path.length - 1]] = newValue;
    setRouteData(updatedData);
  };

  const submitChanges = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/subpages/edit?route=${state.route}&language=${
          state.language
        }`,
        { routeData },
        { withCredentials: true }
      );

      dispatch(
        setAlert({
          severity: "success",
          variant: "filled",
          title: "Sukces",
          content: res.data.message,
        })
      );

      const stateData: any = {
        route: state.route,
        language: state.language,
        fromAdmin: true,
      };

      navigate("/admin/panel", { state: stateData });
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status && error.status > 399) {
          dispatch(
            setAlert({
              severity: "error",
              variant: "filled",
              title: "Błąd",
              content: error.response?.data.message,
            })
          );
        }
      }
    }
  };

  return (
    <ThemeProvider theme={adminTheme}>
      <Box
        width="100%"
        height="100vh"
        sx={{
          color: "primary.dark",
          backgroundColor: "primary.contrastText",
        }}
      >
        <AdminPanelNavbar></AdminPanelNavbar>
        <Box
          sx={{
            width: "100%",
            marginTop: "60px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" margin="1em">
            Podstrona: {`/${state.route}`}, Język: {state.language}{" "}
            <span className={`fi fi-${state.language}`}></span>
          </Typography>
          <Box sx={{ width: "80%", marginBottom: "5em", padding: "2em" }}>
            {routeData && mapData(routeData)}
          </Box>
        </Box>
        <AppBar
          position="fixed"
          sx={{
            padding: "1em 1.5em",
            top: "auto",
            bottom: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "primary.contrastText",
          }}
        >
          <Typography variant="body1" color="primary.main">
            Zapisz zmiany:
          </Typography>
          <Button variant="contained" onClick={(e) => submitChanges(e)}>
            Zatwierdź
          </Button>
        </AppBar>
        <AlertSnackbar
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          title={alertSnackbarData.title}
          content={alertSnackbarData.content}
        ></AlertSnackbar>
      </Box>
    </ThemeProvider>
  );
}
