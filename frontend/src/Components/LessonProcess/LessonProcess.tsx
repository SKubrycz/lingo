import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { setAlert } from "../../state/alertSnackbarSlice";

import { Container } from "@mui/material";

import Navbar from "../Reusables/Navbar/Navbar";
import Footer from "../Reusables/Footer/Footer";
import Stepper from "./Stepper/Stepper";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { AlertSnackbarState } from "../../state/alertSnackbarSlice";
import { setTimeSpent } from "../../state/timeSpentSlice";

interface LessonsProcessProps {
  lessonInfo: any;
  lessonId: number;
  children: React.ReactNode;
}

function LessonProcess({
  lessonInfo,
  lessonId,
  children,
}: LessonsProcessProps) {
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
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
  const lessonIdRef = useRef<number | null>(null);

  const optionsArray: string[] = ["O aplikacji", "Profil", "Wyloguj"];
  const footerOptionsArray: string[] = ["O aplikacji", "Lekcje", "Profil"];

  const alertSnackbarData: AlertSnackbarState = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleUnloadData = async (e: Event) => {
    e.preventDefault();

    if (
      document.visibilityState === "hidden" &&
      document.URL.startsWith(`http://localhost:3001/lesson/`)
    ) {
      console.log("running unloadData...", document.URL);
      try {
        const response = await axios.put(
          `http://localhost:${import.meta.env.VITE_SERVER_PORT}/timespent/${
            lessonIdRef.current
          }`,
          { timeSpent: performance.now() - timeSpentData.timeStart },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(`From /timespent: ${response.data}`);
      } catch (err) {
        console.error(err);
      }
    } else if (
      document.visibilityState === "visible" &&
      document.URL.startsWith(`http://localhost:3001/lesson/`)
    ) {
      //timeStart.current = performance.now();
      dispatch(setTimeSpent({ timeStart: performance.now() }));
    }
  };

  const endSession = async () => {
    try {
      const response = await axios.put(
        `http://localhost:${import.meta.env.VITE_SERVER_PORT}/timespent/${
          lessonIdRef.current
        }`,
        { timeSpent: performance.now() - timeSpentData.timeStart },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(setTimeSpent({ timeStart: performance.now() }));

      console.log(`From /timespent: ${response.data}`);

      navigate("/lessons");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    dispatch(setTimeSpent({ timeStart: performance.now() }));

    if (lessonId) lessonIdRef.current = lessonId;

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
        <Stepper
          exerciseId={lessonInfo.exercise.exerciseId}
          exerciseCount={lessonInfo.exerciseCount}
          endSession={endSession}
        >
          {children}
        </Stepper>
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
