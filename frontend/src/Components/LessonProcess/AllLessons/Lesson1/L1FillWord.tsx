import axios, { AxiosError, AxiosResponse } from "axios";

import { useState, useRef, useEffect } from "react";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbarSlice";

import LessonProcess from "../../LessonProcess";
import InputEx from "../../Stepper/Variants/InputEx";
import type { InputExerciseData } from "../exerciseTypes";
import { RootState } from "../../../../state/store";
import { setTimeSpent } from "../../../../state/timeSpentSlice";

interface Correct {
  correct: boolean;
}

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
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const [lessonInfo, setLessonInfo] = useState<InputExerciseData>({
    exercise: {
      exerciseId: 0,
      question: "",
      task: "",
      missingWords: "",
    },
    exerciseCount: 0,
  });
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disableNext, setDisableNext] = useState<boolean>(true);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

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
        navigate("/");
      });
  };

  const finishLesson = async () => {
    try {
      const response = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}`,
        {},
        { withCredentials: true }
      );

      console.log(response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        alertSnackbarDataDispatch(
          setAlert({
            severity: "error",
            variant: "filled",
            title: "Błąd",
            content: error?.response?.data,
          })
        );
      }
    }

    try {
      const response = await axios.put(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/timespent/${lessonId}`,
        { timeSpent: performance.now() - timeSpentData.timeStart },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setTimeSpent({ timeStart: performance.now() });

      console.log(`From /timespent: ${response.data}`);

      navigate("/lessons");
    } catch (err) {
      console.error(err);
    }
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

  const checkWords = async (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) => {
    e.preventDefault();

    if (!correct && textRef.current) {
      // check word server-side
      const res: AxiosResponse<Correct> = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}/checkword`,
        { missingWord: textRef.current.value },
        { withCredentials: true }
      );

      if (res.data.correct) {
        setCorrect(true);
        setDisableNext(false);
        console.log("correct!");
      } else {
        setCorrect(false);
        setDisableNext(false);
      }
    }
  };

  useEffect(() => {
    if (textRef.current) {
      textRef.current.value = "";
      setCorrect(null);
    }
  }, [lessonInfo?.exercise?.missingWords]);

  return (
    <>
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
        <InputEx
          question={lessonInfo?.exercise?.question}
          task={lessonInfo?.exercise?.task}
          missingWords={lessonInfo?.exercise?.missingWords}
          correct={correct}
          textRef={textRef}
          checkWords={checkWords}
        ></InputEx>
        {isLastExercise ? (
          <Button
            //to={`/lessons`}
            //component={RouterLink}
            disabled={disableNext}
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
            disabled={disableNext}
            sx={{ color: "primary.contrastText", textDecoration: "none" }}
          >
            Dalej
          </Button>
        )}
      </LessonProcess>
    </>
  );
}
