import axios from "axios";

import { useState, useRef, useEffect } from "react";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import LessonProcess from "../LessonProcess";
import CardEx from "../Stepper/Variants/CardEx";

import { useDispatch } from "react-redux";
import { setAlert } from "../../../state/alertSnackbarSlice";
import { Button } from "@mui/material";

import type { CardExerciseData } from "./exerciseTypes";

interface NewWordProps {
  lessonId: number;
  exerciseId: number;
  isLastExercise?: boolean;
}

export default function NewWord({
  lessonId,
  exerciseId,
  isLastExercise = false,
}: NewWordProps) {
  const [lessonInfo, setLessonInfo] = useState<CardExerciseData>({
    exercise: {
      exerciseId: 0,
      type: "",
      word: "",
      translation: "",
      description: "",
    },
    exerciseCount: 0,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const { state } = useLocation();
  const navigate = useNavigate();

  const alertSnackbarDataDispatch = useDispatch();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}`,
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
    if (exerciseId && exerciseId > 2 && !state) {
      navigate("/lessons");
    }

    handleAuth();

    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      cardRef.current.offsetHeight;
      cardRef.current.style.animation = "0.8s comeDown 1 ease-in-out";
    }
  }, [exerciseId]);

  return (
    <LessonProcess lessonInfo={lessonInfo} lessonId={lessonId}>
      {exerciseId === 1 ? (
        <Button sx={{ visibility: "hidden" }}></Button>
      ) : (
        <Button
          to={`/lesson/${lessonId}/${exerciseId - 1}`}
          state={{ index: exerciseId }}
          component={RouterLink}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          Wstecz
        </Button>
      )}
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
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          Zakończ
        </Button>
      ) : (
        <Button
          to={`/lesson/${lessonId}/${exerciseId + 1}`}
          state={{ index: exerciseId }}
          component={RouterLink}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          Dalej
        </Button>
      )}
    </LessonProcess>
  );
}
