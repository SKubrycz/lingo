import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ChoiceEx from "../Stepper/Variants/ChoiceEx";
import LessonProcess from "../LessonProcess";
import { useEffect, useRef, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectData } from "../../../state/lessonSlice";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbarSlice";

interface ChooseWordProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  isLastExercise: boolean;
}

export default function ChooseWord({
  lessonId,
  exerciseId,
  lessonInfo,
  isLastExercise = false,
}: ChooseWordProps) {
  const lessonData = useSelector((state: RootState) => state.lessonReducer);
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disableNext, setDisableNext] = useState<boolean>(true);

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

  const checkAnswer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const target = e.target as HTMLElement;

    console.log(target.textContent);

    if (!correct) {
      const res = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}/checkword`,
        { answer: target.textContent },
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

      const correctArr = Array.from(lessonData.correct);
      console.log(correctArr);
      correctArr.push(res.data.correct);
      dispatch(setCorrectData({ correct: correctArr }));
    }
  };

  useEffect(() => {
    setCorrect(null);
    setDisableNext(true);
  }, [lessonInfo?.exercise?.answer]);

  return (
    <LessonProcess lessonInfo={lessonInfo} lessonId={lessonId}>
      <Box
        sx={{
          width: "7%",
          visibility: "hidden",
        }}
      ></Box>
      <ChoiceEx
        task={lessonInfo?.exercise?.task}
        word={lessonInfo?.exercise?.word}
        words={lessonInfo?.exercise?.words}
        answer={lessonInfo?.exercise?.answer}
        correct={correct}
        checkAnswer={checkAnswer}
      ></ChoiceEx>
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
  );
}
