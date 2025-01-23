import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";

import { Container } from "@mui/material";
import Stepper from "./Stepper/Stepper";
import AlertSnackbar from "../Reusables/Informational/AlertSnackbar";
import { AlertSnackbarState } from "../../state/alertSnackbarSlice";
import { setCorrectData } from "../../state/lessonSlice";

interface LessonsProcessProps {
  lessonInfo: any;
  languageData: any;
  children: React.ReactNode;
}

function LessonProcess({
  lessonInfo,
  languageData,
  children,
}: LessonsProcessProps) {
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
