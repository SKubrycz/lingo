import axios from "axios";

import { useState, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import LessonProcess from "../../LessonProcess";
import CardEx from "../../Stepper/Variants/CardEx";

import { useDispatch } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbar/alertSnackbar";
import { Button } from "@mui/material";

import type { CardExerciseData, CardExerciseProps } from "../exerciseTypes";

export default function L1Exercise2({ lessonId }: CardExerciseProps) {
  const [lessonInfo, setLessonInfo] = useState<CardExerciseData>({
    exercise: {
      exerciseId: 0,
      type: "",
      word: "",
      description: "",
    },
    exerciseCount: 0,
  });

  const alertSnackbarDataDispatch = useDispatch();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/lesson/${lessonId}/2`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        setLessonInfo(res.data);
      })
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

  useEffect(() => {
    handleAuth();
  }, []);

  return (
    <LessonProcess lessonInfo={lessonInfo}>
      <Button
        to={`/lesson/${lessonId}/1`}
        component={RouterLink}
        sx={{ color: "primary.contrastText", textDecoration: "none" }}
      >
        Wstecz
      </Button>
      <CardEx
        exerciseId={lessonInfo?.exercise?.exerciseId}
        word={lessonInfo?.exercise?.word}
        description={lessonInfo?.exercise?.description}
      ></CardEx>
      <Button
        to={`/lesson/${lessonId}/3`}
        component={RouterLink}
        sx={{ color: "primary.contrastText", textDecoration: "none" }}
      >
        Dalej
      </Button>
    </LessonProcess>
  );
}
