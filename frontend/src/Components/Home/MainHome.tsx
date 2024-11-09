import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { Container, Box, Typography } from "@mui/material";

import StartHome from "./StartHome";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";

function MainHome() {
  const navigate = useNavigate();

  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );

  const handleAuth = async () => {
    await axios
      .get(`http://localhost:${process.env.REACT_APP_SERVER_PORT}/`, {
        withCredentials: true,
      })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/lessons");
      });
  };

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <>
      <Container maxWidth={false} sx={{ maxWidth: "75%" }}>
        <Box className="home-main">
          <AlertSnackbar
            severity={alertSnackbarData.severity}
            variant={alertSnackbarData.variant}
            title={alertSnackbarData.title}
            content={alertSnackbarData.content}
          ></AlertSnackbar>
          <Box className="home-main-box">
            <Typography variant="h3" sx={{ color: "primary.contrastText" }}>
              LINGO
            </Typography>
            <Typography variant="h6">
              Nauka języka nigdy nie była prostsza!
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <Box
              className="home-main-box"
              sx={{ width: "100%", textAlign: "right" }}
            >
              <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
                Sprawna nauka
              </Typography>
              <Typography variant="h6">
                Poznaj podstawy, zacznij rozmawiać
              </Typography>
            </Box>
          </Box>
          <Box className="home-main-box">
            <Typography variant="h4" sx={{ color: "primary.contrastText" }}>
              Widoczny postęp
            </Typography>
            <Typography variant="h6">
              Monitoruj swój progres w nauce dzięki ekstensywnym statystykom
            </Typography>
          </Box>
          <StartHome></StartHome>
        </Box>
      </Container>
    </>
  );
}

export default MainHome;
