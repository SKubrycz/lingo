import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbar/alertSnackbar";

import { Container } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Footer from "../Reusables/Footer/Footer";
import Stepper from "./Stepper/Stepper";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { AlertSnackbarState } from "../../state/alertSnackbar/alertSnackbar";

function LessonProcess() {
  const [linkArray, setLinkArray] = useState<string[]>([
    "/about",
    "/profile",
    "/logout",
  ]);
  const [footerLinkArray, setFooterLinkArray] = useState<string[]>([
    "/about",
    "/lessons",
    "/profile",
  ]);

  const [lessonInfo, setLessonInfo] = useState<number | undefined>();

  const interval = useRef<NodeJS.Timeout | undefined>(undefined);
  const timeStart = useRef<number>(0);

  const optionsArray: string[] = ["O aplikacji", "Profil", "Wyloguj"];
  const footerOptionsArray: string[] = ["O aplikacji", "Lekcje", "Profil"];

  const { lessonId } = useParams<{ lessonId: string }>();

  const alertSnackbarData: AlertSnackbarState = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const alertSnackbarDataDispatch = useDispatch();

  const navigate = useNavigate();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/lesson/${lessonId}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setLessonInfo(res.data.lessonId);
      })
      /* .then((res) => {
        setLinkArray(["/about", `/profile/${res.data.login}`, "/logout"]);
        setFooterLinkArray([
          "/about",
          "/lessons",
          `/profile/${res.data.login}`,
        ]);
      }) */
      .catch((error) => {
        console.log(error);
        alertSnackbarDataDispatch(
          setAlert({
            severity: "info",
            variant: "standard",
            title: "Informacja",
            content: "Sesja wygasła. Proszę zalogować się ponownie",
          })
        );
        //navigate("/");
      });
  };

  const handleUnloadData = async (e: Event) => {
    e.preventDefault();

    if (
      document.visibilityState === "hidden" &&
      document.URL.startsWith(`http://localhost:3001/lesson/`)
    ) {
      console.log("running unloadData...", document.URL);
      try {
        const response = await axios.post(
          `http://localhost:${process.env.REACT_APP_SERVER_PORT}/timespent`,
          { timeSpent: performance.now() - timeStart.current },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        timeStart.current = performance.now();

        console.log(`From /timespent: ${response.data}`);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const endSession = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/timespent`,
        { timeSpent: performance.now() - timeStart.current },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      timeStart.current = performance.now();

      console.log(`From /timespent: ${response.data}`);

      navigate("/lessons");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    handleAuth();

    timeStart.current = performance.now();

    document.addEventListener("visibilitychange", (e) => handleUnloadData(e));

    return () => {
      document.removeEventListener("visibilitychange", (e) =>
        handleUnloadData(e)
      );
    };
  }, []);

  return (
    <>
      <Container component="div" className="wrapper">
        <div style={{ width: "100%", height: "64px" }}></div>
        {/* <Navbar link={linkArray} options={optionsArray}></Navbar> */}
        <Stepper id={lessonInfo} endSession={endSession}></Stepper>
        {/* <Footer link={footerLinkArray} options={footerOptionsArray}></Footer> */}
      </Container>
      <AlertSnackbar
        severity={alertSnackbarData.severity}
        variant={alertSnackbarData.variant}
        title={alertSnackbarData.title}
        content={alertSnackbarData.content}
      ></AlertSnackbar>
    </>
  );
}

export default LessonProcess;
