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
      .get("http://localhost:8000/", { withCredentials: true })
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
      <Container maxWidth="lg">
        <Box className="home-main">
          <AlertSnackbar
            severity={alertSnackbarData.severity}
            variant={alertSnackbarData.variant}
            title={alertSnackbarData.title}
            content={alertSnackbarData.content}
          ></AlertSnackbar>
          <Typography variant="h3">LOGO</Typography>
          <Typography variant="h6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
            interdum pulvinar libero non blandit. Nulla suscipit mi et ipsum
            egestas elementum.
          </Typography>
          <StartHome></StartHome>
        </Box>
      </Container>
    </>
  );
}

export default MainHome;
