import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useReducer } from "react";

import { Container, Box, Typography } from "@mui/material";

import StateInfo from "../Reusables/StateInfo/StateInfo";
import StartHome from "./StartHome";

import { useMessage } from "../../";

function reducer(state: any, action: any) {
  switch (action.type) {
    case "seconds":
      return {
        ...state,
        seconds: (state.seconds + 1) % 60,
      };
    case "minutes":
      return {
        ...state,
        minutes: (state.minutes + 1) % 60,
      };
    case "hours":
      return {
        ...state,
        hours: (state.hours + 1) % 24,
      };
    default:
      throw Error("No such action");
  }
}

function MainHome() {
  const [state, dispatch] = useReducer(reducer, {
    seconds: 0,
    minutes: 0,
    hours: 0,
  });

  const { message, setMessage } = useMessage();

  const navigate = useNavigate();

  useEffect(() => {
    const intervalSec = setInterval(() => {
      dispatch({ type: "seconds" });
    }, 1000);
    const intervalMin = setInterval(() => {
      dispatch({ type: "minutes" });
    }, 60 * 1000);
    const intervalHour = setInterval(
      () => {
        dispatch({ type: "hours" });
      },
      60 * 60 * 1000
    );

    return () => {
      clearInterval(intervalSec);
      clearInterval(intervalMin);
      clearInterval(intervalHour);
    };
  }, []);

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
