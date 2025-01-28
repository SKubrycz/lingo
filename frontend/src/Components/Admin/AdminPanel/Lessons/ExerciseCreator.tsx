import {
  Box,
  Button,
  TextField,
  ThemeProvider,
  Tooltip,
  Typography,
} from "@mui/material";
import axios, { isAxiosError } from "axios";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import ExerciseRadio from "./ExerciseRadio";
import { adminTheme } from "../../../../adminTheme";
import getBackground from "../../../../utilities/getBackground";
import { ArrowBackIos, HelpOutline } from "@mui/icons-material";
import {
  CardExercise,
  ChoiceExercise,
  InputExercise,
  MatchExercise,
} from "./LessonsTypes";
import AdminPanelNavbar from "../AdminPanelNavbar";
import { useDispatch, useSelector } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbarSlice";
import { RootState } from "../../../../state/store";
import AlertSnackbar from "../../../Reusables/Informational/AlertSnackbar";

export type ExerciseType = "card" | "input" | "match" | "choice";
type Exercises = CardExercise | InputExercise | ChoiceExercise | MatchExercise;

interface ChooseExerciseTypeProps {
  type: ExerciseType | null;
  lessonId: string | undefined;
  exerciseId: string | undefined;
  language: string | null;
  result: Exercises | null;
}

interface ChooseExerciseTypeHandle {
  runSaveExercise: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ChooseExerciseType = forwardRef<
  ChooseExerciseTypeHandle,
  ChooseExerciseTypeProps
>(({ type, lessonId, exerciseId, language, result }, ref) => {
  const [exercise, setExercise] = useState<Exercises | null>(null);
  const [matchWordsString, setMatchWordsString] = useState<string>("");

  const dispatch = useDispatch();

  useImperativeHandle(ref, () => ({
    runSaveExercise: saveExercise,
  }));

  const saveExercise = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (lessonId && exerciseId && language) {
      try {
        const res = await axios.post(
          `http://localhost:${
            import.meta.env.VITE_SERVER_PORT
          }/admin/panel/lessons/creator/${lessonId}/${exerciseId}?language=${language}`,
          exercise,
          { withCredentials: true }
        );

        dispatch(
          setAlert({
            severity: "success",
            variant: "filled",
            title: "Sukces",
            content: res.data.message,
          })
        );
      } catch (error) {
        console.error(error);
        if (isAxiosError(error)) {
          if (error.status && error.status > 399) {
            dispatch(
              setAlert({
                severity: "error",
                variant: "filled",
                title: "Błąd",
                content: error.response?.data.message,
              })
            );
          }
        }
      }
    }
  };

  const formatToArray = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setMatchWordsString(e.target.value);

    if (e.target.value.length >= 0) {
      if (exercise && exercise.type === "match") {
        const splitArr = e.target.value.replace(/[^a-zA-Z, ]/g, "").split(",");
        let pairedArr: string[][] = [];
        splitArr.forEach((el, i) => {
          if (el != undefined) {
            if (i !== 0 && i % 2 === 0)
              pairedArr.push([splitArr[i - 2], splitArr[i - 1]]);
          }
        });

        setExercise((prev) => ({
          ...(prev as MatchExercise),
          words: pairedArr,
        }));

        if (exercise.words.length >= 5) {
          e.target.value = e.target.value.slice(0, -1);
          setMatchWordsString(e.target.value);
        }
      }
    }
  };

  const formatFromArray = (arr: string[][] | undefined): string => {
    if (arr) {
      if (arr.length > 0) {
        if (exercise && exercise.type === "match") {
          let str = "";
          arr.forEach((el, i) => {
            if (el && Array.isArray(el)) {
              if (i !== arr.length - 1) {
                str += `${el[0]}, ${el[1]}, `;
              } else {
                str += `${el[0]}, ${el[1]}, `;
              }
            }
          });
          return str;
        }
      }
    }

    return "";
  };

  function isStringArray(value: any): value is string[] {
    return (
      Array.isArray(value) && value.every((item) => typeof item === "string")
    );
  }

  useEffect(() => {
    if (result) setExercise(result);
  }, [result]);

  useEffect(() => {
    if (type && exerciseId) {
      if (type === "card") {
        const cardExercise: CardExercise = {
          exerciseId: Number(exerciseId),
          type: type,
          word: result && "word" in result ? result.word : "",
          translation:
            result && "translation" in result ? result.translation : "",
          description:
            result && "description" in result ? result.description : "",
        };

        setExercise(cardExercise);
      }
      if (type === "input") {
        const inputExercise: InputExercise = {
          exerciseId: Number(exerciseId),
          type: type,
          question: result && "question" in result ? result.question : "",
          task: result && "task" in result ? result.task : "",
          missingWords:
            result && "missingWords" in result ? result.missingWords : "",
        };

        setExercise(inputExercise);
      }
      if (type === "choice") {
        const choiceExercise: ChoiceExercise = {
          exerciseId: Number(exerciseId),
          type: type,
          task: result && "task" in result ? result.task : "",
          word: result && "word" in result ? result.word : "",
          words:
            result && "words" in result && isStringArray(result.words)
              ? result.words
              : ["", "", ""],
          answer: result && "answer" in result ? result.answer : "",
        };

        setExercise(choiceExercise);
      }
      if (type === "match") {
        const matchExercise: MatchExercise = {
          exerciseId: Number(exerciseId),
          type: type,
          task: result && "task" in result ? result.task : "",
          words:
            result && "words" in result && !isStringArray(result.words)
              ? result.words
              : [],
        };

        setExercise(matchExercise);
        setMatchWordsString(
          formatFromArray((exercise as MatchExercise)?.words)
        );
      }
    }
  }, [type]);

  if (!exerciseId) return <></>;
  switch (type) {
    case "card":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Słowo:</b>{" "}
          </Typography>
          <TextField
            value={exercise && "word" in exercise ? exercise.word : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as CardExercise),
                word: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Tłumaczenie:</b>
          </Typography>
          <TextField
            value={
              exercise && "translation" in exercise ? exercise.translation : ""
            }
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as CardExercise),
                translation: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Opis:</b>
          </Typography>
          <TextField
            multiline
            rows={3}
            value={
              exercise && "description" in exercise ? exercise.description : ""
            }
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as CardExercise),
                description: e.target.value,
              }))
            }
          ></TextField>
        </Box>
      );
    case "input":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Pytanie:</b>{" "}
          </Typography>
          <TextField
            value={exercise && "question" in exercise ? exercise.question : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as InputExercise),
                question: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Zadanie:</b>
          </Typography>
          <TextField
            value={exercise && "task" in exercise ? exercise.task : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as InputExercise),
                task: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Brakujące słowa:</b>
          </Typography>
          <TextField
            value={
              exercise && "missingWords" in exercise
                ? exercise.missingWords
                : ""
            }
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as InputExercise),
                missingWords: e.target.value,
              }))
            }
          ></TextField>
        </Box>
      );
    case "choice":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Zadanie:</b>{" "}
          </Typography>
          <TextField
            value={exercise && "task" in exercise ? exercise.task : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as ChoiceExercise),
                task: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Słowo:</b>
          </Typography>
          <TextField
            value={exercise && "word" in exercise ? exercise.word : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as InputExercise),
                word: e.target.value,
              }))
            }
          ></TextField>
          <Typography>
            <b>Słowa do wyboru:</b>
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            1:{" "}
            <TextField
              value={exercise && "words" in exercise ? exercise.words[0] : ""}
              onChange={(e) => {
                setExercise((prev) => ({
                  ...(prev as ChoiceExercise),
                  words: (prev as ChoiceExercise).words.map((el, i) =>
                    i === 0 ? e.target.value : el
                  ),
                }));
              }}
            ></TextField>
            2:{" "}
            <TextField
              value={exercise && "words" in exercise ? exercise.words[1] : ""}
              onChange={(e) =>
                setExercise((prev) => ({
                  ...(prev as ChoiceExercise),
                  words: (prev as ChoiceExercise).words.map((el, i) =>
                    i === 1 ? e.target.value : el
                  ),
                }))
              }
            ></TextField>
            3:{" "}
            <TextField
              value={exercise && "words" in exercise ? exercise.words[2] : ""}
              onChange={(e) =>
                setExercise((prev) => ({
                  ...(prev as ChoiceExercise),
                  words: (prev as ChoiceExercise).words.map((el, i) =>
                    i === 2 ? e.target.value : el
                  ),
                }))
              }
            ></TextField>
          </Box>
          <Typography>
            <b>Prawidłowa odpowiedź:</b>
          </Typography>
          <TextField
            value={exercise && "answer" in exercise ? exercise.answer : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as InputExercise),
                answer: e.target.value,
              }))
            }
          ></TextField>
        </Box>
      );
    case "match":
      return (
        <Box>
          <Typography>
            <b>exerciseId:</b> {exerciseId}
          </Typography>
          <Typography marginBottom="1em">
            <b>Typ ćwiczenia:</b> {type}
          </Typography>
          <Typography>
            <b>Zadanie:</b>
          </Typography>
          <TextField
            value={exercise && "task" in exercise ? exercise.task : ""}
            onChange={(e) =>
              setExercise((prev) => ({
                ...(prev as MatchExercise),
                task: e.target.value,
              }))
            }
          ></TextField>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <b>Słowa: &nbsp;</b>
            <Tooltip
              arrow
              placement="right"
              title="Pięć par słów (słowo, tłumaczenie)"
            >
              <HelpOutline></HelpOutline>
            </Tooltip>
            <b>&nbsp;Ilość par: </b>&nbsp;
            {exercise ? (exercise as MatchExercise)?.words.length : 0}
          </Box>
          <TextField
            multiline
            rows={4}
            value={matchWordsString}
            onChange={(e) => formatToArray(e)}
          ></TextField>
        </Box>
      );

    default:
      return (
        <Box>
          <Typography variant="body1">
            Nie wybrano żadnego rodzaju ćwiczenia z dostępnych
          </Typography>
        </Box>
      );
  }
});

interface ExerciseCreatorProps {}

export default function ExerciseCreator({}: ExerciseCreatorProps) {
  const alertSnackbarData = useSelector(
    (state: RootState) => state.alertSnackbarReducer
  );
  const [exerciseType, setExerciseType] = useState<ExerciseType | null>(null);
  const [result, setResult] = useState<Exercises | null>(null);

  const chooseExerciseRef = useRef<ChooseExerciseTypeHandle>(null);

  const { lessonId, exerciseId } = useParams();
  const [query] = useSearchParams();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuth = async () => {
    const language = query.get("language");

    if (!lessonId) navigate("/admin");
    if (!exerciseId) navigate("/admin");
    if (!language) navigate("/admin");

    try {
      const res = await axios.get(
        `http://localhost:${
          import.meta.env.VITE_SERVER_PORT
        }/admin/panel/lessons/creator/${lessonId}/${exerciseId}?language=${language}`,
        { withCredentials: true }
      );

      if (res.data.result) {
        setResult(res.data.result);
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
        if (error.status === 403) {
          navigate("/admin");
        } else {
          if (error.status && error.status > 399) {
            dispatch(
              setAlert({
                severity: "error",
                variant: "filled",
                title: "Błąd",
                content: error.response?.data.message,
              })
            );
          }

          navigate("/admin");
        }
      }
    }
  };

  const handleExerciseType = (type: ExerciseType) => {
    setExerciseType(type);
  };

  const handleSaveExercise = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (chooseExerciseRef.current) {
      chooseExerciseRef.current.runSaveExercise(e);
    }
  };

  const handleGoToEditLesson = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const language = query.get("language");

    try {
      if (lessonId && language) {
        navigate(`/admin/panel/lessons/edit/${lessonId}?language=${language}`);
      }
    } catch (error) {
      console.error(error);
      if (isAxiosError(error)) {
      }
    }
  };

  useEffect(() => {
    handleAuth();

    if (result) handleExerciseType(result.type);

    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  return (
    <ThemeProvider theme={adminTheme}>
      <Box sx={{ width: "100%", height: "100vh", color: "primary.dark" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AdminPanelNavbar></AdminPanelNavbar>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                padding: "0.5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid rgb(224, 224, 224)",
              }}
            >
              <Button onClick={handleGoToEditLesson}>
                <ArrowBackIos sx={{ fontSize: "16px" }}></ArrowBackIos>Wróć do
                edycji lekcji
              </Button>
            </Box>
          </Box>
          <Box
            sx={{
              width: "fit-content",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "60%",
                margin: "1em",
                padding: "0.5em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ChooseExerciseType
                type={exerciseType}
                lessonId={lessonId}
                exerciseId={exerciseId}
                language={query.get("language")}
                result={result}
                ref={chooseExerciseRef}
              ></ChooseExerciseType>
            </Box>
            <Box
              sx={{
                width: "30%",
                margin: "1em",
                padding: "0.5em",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                borderLeft: "1px solid rgb(224, 224, 224)",
              }}
            >
              <ExerciseRadio
                handleExerciseType={handleExerciseType}
                type={result?.type}
              ></ExerciseRadio>
            </Box>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "50%",
                padding: "0.5em",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderTop: "1px solid rgb(224, 224, 224)",
              }}
            >
              <Typography color="primary.main">Zapisz ćwiczenie:</Typography>
              <Button variant="contained" onClick={handleSaveExercise}>
                Zapisz
              </Button>
            </Box>
          </Box>
        </Box>
        <AlertSnackbar
          severity={alertSnackbarData.severity}
          variant={alertSnackbarData.variant}
          title={alertSnackbarData.title}
          content={alertSnackbarData.content}
        ></AlertSnackbar>
      </Box>
    </ThemeProvider>
  );
}
