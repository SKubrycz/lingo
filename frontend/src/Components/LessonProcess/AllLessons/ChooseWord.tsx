import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";
import ChoiceEx from "../Stepper/Variants/ChoiceEx";
import LessonProcess from "../LessonProcess";
import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCorrectData } from "../../../state/lessonSlice";
import { RootState } from "../../../state/store";
import { setAlert } from "../../../state/alertSnackbarSlice";
import handleLanguageURL from "../../../utilities/handleLanguageURL";
import { shuffleArray } from "../../../utilities/shuffleArray";

interface ChooseWordProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  languageData: any;
  exerciseUI: any;
  isLastExercise: boolean;
}

export default function ChooseWord({
  lessonId,
  exerciseId,
  lessonInfo,
  languageData,
  exerciseUI,
  isLastExercise = false,
}: ChooseWordProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const lessonData = useSelector((state: RootState) => state.lessonReducer);
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disableNext, setDisableNext] = useState<boolean>(true);
  //const [words, setWords] = useState<string[]>([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const finishLesson = async () => {
    const route = handleLanguageURL(
      `/lesson/${lessonId}/${exerciseId}`,
      stateLanguageData.lang
    );

    try {
      await axios.post(
        route,
        {
          correct: lessonData.correct,
          timeSpent: performance.now() - timeSpentData.timeStart,
        },
        { withCredentials: true }
      );

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

    const route = handleLanguageURL(
      `/lesson/${lessonId}/${exerciseId}/checkword`,
      stateLanguageData.lang
    );

    if (!correct) {
      const res = await axios.post(
        route,
        { answer: target.textContent },
        { withCredentials: true }
      );

      if (res.data.correct) {
        setCorrect(true);
        setDisableNext(false);
      } else {
        setCorrect(false);
        setDisableNext(false);
      }

      const correctArr = Array.from(lessonData.correct);
      correctArr.push(res.data.correct);
      dispatch(setCorrectData({ correct: correctArr }));
    }
  };

  useEffect(() => {
    setCorrect(null);
    setDisableNext(true);
  }, [lessonInfo?.exercise?.answer]);

  useEffect(() => {
    if (lessonInfo?.exercise?.words) {
      let words = lessonInfo?.exercise?.words;
      shuffleArray(words);
      //setWords(words);
    }
  }, [lessonInfo?.exercise?.words]);

  return (
    <LessonProcess lessonInfo={lessonInfo} languageData={languageData}>
      <Box
        sx={{
          width: "7%",
          visibility: "hidden",
        }}
      ></Box>
      <ChoiceEx
        exerciseUI={exerciseUI}
        word={lessonInfo?.exercise?.word}
        words={lessonInfo?.exercise?.words}
        answer={lessonInfo?.exercise?.answer}
        correct={correct}
        checkAnswer={checkAnswer}
      ></ChoiceEx>
      {isLastExercise ? (
        <Button
          disabled={disableNext}
          onClick={() => finishLesson()}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          {exerciseUI?.finish ? exerciseUI?.finish : "Zakończ"}
        </Button>
      ) : (
        <Button
          to={`/lesson/${lessonId}/${exerciseId + 1}`}
          state={{ index: exerciseId }}
          component={RouterLink}
          disabled={disableNext}
          sx={{ color: "primary.contrastText", textDecoration: "none" }}
        >
          {exerciseUI?.next ? exerciseUI?.next : "Dalej"}
        </Button>
      )}
    </LessonProcess>
  );
}
