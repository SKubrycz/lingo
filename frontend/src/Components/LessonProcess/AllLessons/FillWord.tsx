import axios, { AxiosError, AxiosResponse } from "axios";

import { useState, useRef, useEffect } from "react";

import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";

import { Box, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../state/alertSnackbarSlice";

import LessonProcess from "../LessonProcess";
import InputEx from "../Stepper/Variants/InputEx";
import { RootState } from "../../../state/store";
import { setCorrectData } from "../../../state/lessonSlice";
import handleLanguageURL from "../../../utilities/handleLanguageURL";

interface Correct {
  correct: boolean;
}

interface FillWordProps {
  lessonId: number;
  exerciseId: number;
  lessonInfo: any;
  languageData: any;
  exerciseUI: any;
  isLastExercise: boolean;
}

export default function FillWord({
  lessonId,
  exerciseId,
  lessonInfo,
  languageData,
  exerciseUI,
  isLastExercise = false,
}: FillWordProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const lessonData = useSelector((state: RootState) => state.lessonReducer);
  const timeSpentData = useSelector(
    (state: RootState) => state.timeSpentReducer
  );
  const [correct, setCorrect] = useState<boolean | null>(null);
  const [disableNext, setDisableNext] = useState<boolean>(true);

  const cardRef = useRef<HTMLDivElement | null>(null);
  const textRef = useRef<HTMLInputElement | null>(null);

  const { state } = useLocation();
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

  const checkWords = async (
    e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent
  ) => {
    e.preventDefault();

    const route = handleLanguageURL(
      `/lesson/${lessonId}/${exerciseId}/checkword`,
      stateLanguageData.lang
    );

    if (!correct && textRef.current) {
      // check word server-side
      const res: AxiosResponse<Correct> = await axios.post(
        route,
        { missingWord: textRef.current.value },
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
    if (textRef.current) {
      textRef.current.value = "";
      setCorrect(null);
      setDisableNext(true);
    }
  }, [lessonInfo?.exercise?.missingWords]);

  return (
    <>
      <LessonProcess lessonInfo={lessonInfo} languageData={languageData}>
        <Box
          sx={{
            width: "7%",
            visibility: "hidden",
          }}
        ></Box>
        <InputEx
          question={lessonInfo?.exercise?.question}
          exerciseUI={exerciseUI}
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
    </>
  );
}
