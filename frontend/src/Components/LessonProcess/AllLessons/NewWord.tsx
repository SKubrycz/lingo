import axios, { AxiosError } from "axios";

import { useState, useRef, useEffect } from "react";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import LessonProcess from "../LessonProcess";
import CardEx from "../Stepper/Variants/CardEx";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../state/alertSnackbarSlice";
import { Box, Button } from "@mui/material";

import type { CardExerciseData } from "./exerciseTypes";
import { setCorrectData } from "../../../state/lessonSlice";
import { RootState } from "../../../state/store";

interface NewWordProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  isLastExercise: boolean;
}

export default function NewWord({
  lessonId,
  exerciseId,
  lessonInfo,
  isLastExercise = false,
}: NewWordProps) {
  const lessonData = useSelector((state: RootState) => state.lessonReducer);
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const cardRef = useRef<HTMLDivElement | null>(null);

  const { state } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const finishLesson = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}`,
        {
          correct: lessonData.correct,
          timeSpent: performance.now() - timeSpentData.timeStart,
        },
        { withCredentials: true }
      );

      console.log(response.data);

      dispatch(setCorrectData({ correct: [] }));

      navigate("/lessons");
    } catch (error) {
      if (error instanceof AxiosError) {
        dispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "Błąd",
            content: error?.response?.data,
          })
        );

        dispatch(setCorrectData({ correct: [] }));
      }
    }
  };

  useEffect(() => {
    if (exerciseId && exerciseId > 2 && !state) {
      navigate("/lessons");
    }

    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      cardRef.current.offsetHeight;
      cardRef.current.style.animation = "0.8s comeDown 1 ease-in-out";
    }
  }, [exerciseId]);

  return (
    <LessonProcess lessonInfo={lessonInfo} lessonId={lessonId}>
      <Box
        sx={{
          width: "7%",
          visibility: "hidden",
        }}
      ></Box>
      <CardEx
        ref={cardRef}
        exerciseId={lessonInfo?.exercise?.exerciseId}
        word={lessonInfo?.exercise?.word}
        translation={lessonInfo?.exercise?.translation}
        description={lessonInfo?.exercise?.description}
      ></CardEx>
      {isLastExercise ? (
        <Button
          to={`/lessons`}
          component={RouterLink}
          onClick={() => finishLesson()}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          Zakończ
        </Button>
      ) : (
        <Button
          to={`/lesson/${lessonId}/${exerciseId + 1}`}
          state={{ index: exerciseId }}
          component={RouterLink}
          sx={{
            color: "primary.contrastText",
            textDecoration: "none",
          }}
        >
          Dalej
        </Button>
      )}
    </LessonProcess>
  );
}
