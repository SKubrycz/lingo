import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import { Container, Box, Typography } from "@mui/material";

import StateInfo from "../Reusables/Informational/StateInfo";
import StartHome from "./StartHome";

function MainHome() {
  const navigate = useNavigate();

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
  }, []);

  return (
    <>
      <Container maxWidth="lg">
        <Box className="home-main">
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
