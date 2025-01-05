import { Box, Button } from "@mui/material";
import LessonProcess from "../LessonProcess";
import MatchEx from "../Stepper/Variants/MatchEx";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { RootState } from "../../../state/store";
import axios, { AxiosError } from "axios";
import { setCorrectData } from "../../../state/lessonSlice";
import { setAlert } from "../../../state/alertSnackbarSlice";

interface MatchWordsProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  isLastExercise: boolean;
}

export default function MatchWords({
  lessonId,
  exerciseId,
  lessonInfo,
  isLastExercise = false,
}: MatchWordsProps) {
  const lessonData = useSelector((state: RootState) => state.lessonReducer);
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disableNext, setDisableNext] = useState<boolean>(true);

  const correctArrRef = useRef<boolean[]>([]);

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

  const checkWords = async (words: string[], pairsMatched: number) => {
    if (
      !correct &&
      words.length === 2 &&
      typeof words[0] === "string" &&
      typeof words[1] === "string"
    ) {
      const res = await axios.post(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/lesson/${lessonId}/${exerciseId}/checkword`,
        { words: words },
        { withCredentials: true }
      );

      if (res.data.correct === true || res.data.correct === false) {
        correctArrRef.current.push(res.data.correct);
      }

      console.log(pairsMatched);
      console.log(lessonInfo?.exercise?.words.length);
      if (pairsMatched === lessonInfo?.exercise?.words.length) {
        let allCorrect = correctArrRef.current.every((el) => el === true);

        if (allCorrect) {
          setCorrect(true);
        } else {
          setCorrect(false);
        }

        setDisableNext(false);

        const correctArr = Array.from(lessonData.correct);
        correctArr.push(allCorrect);
        dispatch(setCorrectData({ correct: correctArr }));
      }
    }
  };

  return (
    <LessonProcess lessonInfo={lessonInfo} lessonId={lessonId}>
      <Box
        sx={{
          width: "7%",
          visibility: "hidden",
        }}
      ></Box>
      <MatchEx
        task={lessonInfo?.exercise?.task}
        words={lessonInfo?.exercise?.words}
        checkWords={checkWords}
      ></MatchEx>
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
