import axios from "axios";

import { useState, useRef, useEffect } from "react";

import { Link as RouterLink } from "react-router-dom";

import { Button } from "@mui/material";

import { useDispatch } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbar/alertSnackbar";

import LessonProcess from "../../LessonProcess";
import InputEx from "../../Stepper/Variants/InputEx";
import type { InputExerciseData } from "../exerciseTypes";

interface L1FillWordProps {
  lessonId: number;
  exerciseId: number;
  isLastExercise?: boolean;
}

export default function L1FillWord({
  lessonId,
  exerciseId,
  isLastExercise = false,
}: L1FillWordProps) {
  const [lessonInfo, setLessonInfo] = useState<InputExerciseData>({
    exercise: {
      exerciseId: 0,
      question: "",
      task: "",
      missingWords: "",
    },
    exerciseCount: 0,
  });

  const cardRef = useRef<HTMLDivElement | null>(null);

  const alertSnackbarDataDispatch = useDispatch();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/lesson/${lessonId}/${exerciseId}`,
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

    if (cardRef.current) {
      cardRef.current.style.animation = "none";
      cardRef.current.offsetHeight;
      cardRef.current.style.animation = "0.8s comeDown 1 ease-in-out";
    }
  }, [exerciseId]);

  return (
    <>
      <LessonProcess lessonInfo={lessonInfo}>
        {exerciseId === 1 ? (
          <Button sx={{ visibility: "hidden" }}></Button>
        ) : (
          <Button
            to={`/lesson/${lessonId}/${exerciseId - 1}`}
            component={RouterLink}
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            Wstecz
          </Button>
        )}
        <InputEx
          question={lessonInfo?.exercise?.question}
          task={lessonInfo?.exercise?.task}
          missingWords={lessonInfo?.exercise?.missingWords}
        ></InputEx>
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
            component={RouterLink}
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            Dalej
          </Button>
        )}
      </LessonProcess>
    </>
  );
}
