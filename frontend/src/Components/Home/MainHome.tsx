import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { Container, Box, Typography } from "@mui/material";

import StateInfo from "../Reusables/Informational/StateInfo";
import StartHome from "./StartHome";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { useMessage } from "../..";

function MainHome() {
  const navigate = useNavigate();

  const { message, setMessage } = useMessage();

  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

  const handleAuth = async () => {
    await axios
      .get("http://localhost:8000/", { withCredentials: true })
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        navigate("/lessons");
      });
  };

  useEffect(() => {
    handleAuth();
    console.log(`The message: ${message}`);
    if (message) setShowSnackbar(true);
  }, []);

  const handleCloseSnackbar = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setShowSnackbar(false);
  };

  return (
    <>
      <Container maxWidth="lg">
        <Box className="home-main">
          <AlertSnackbar
            severity="info"
            content={message}
            showSnackbar={showSnackbar}
            handleCloseSnackbar={handleCloseSnackbar}
          ></AlertSnackbar>
          <StateInfo></StateInfo>
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
