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
import { setTimeStart, TimeSpent } from "../../state/timeSpentSlice";
import { setCorrectData } from "../../state/lessonSlice";

interface LessonsProcessProps {
  lessonInfo: any;
  languageData: any;
  lessonId: number;
  children: React.ReactNode;
}

function LessonProcess({
  lessonInfo,
  languageData,
  lessonId,
  children,
}: LessonsProcessProps) {
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

  const timeSpentData: TimeSpent = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const alertSnackbarData: AlertSnackbarState = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const endSession = async () => {
    try {
      dispatch(setCorrectData({ correct: [] }));
      navigate("/lessons");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Container component="div" className="wrapper">
        <div style={{ width: "100%", height: "64px" }}></div>
        <Stepper
          exerciseId={lessonInfo.exercise.exerciseId}
          exerciseCount={lessonInfo.exerciseCount}
          languageData={languageData}
          endSession={endSession}
        >
          {children}
        </Stepper>
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
