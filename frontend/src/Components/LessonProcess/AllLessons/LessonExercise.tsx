import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../../../state/alertSnackbarSlice";
import FillWord from "./FillWord";
import NewWord from "./NewWord";
import ChooseWord from "./ChooseWord";
import MatchWords from "./MatchWords";
import getBackground from "../../../utilities/getBackground";
import handleLanguageURL from "../../../utilities/handleLanguageURL";
import { RootState } from "../../../state/store";

interface LessonExerciseProps {}

export default function LessonExercise({}: LessonExerciseProps) {
  const stateLanguageData = useSelector(
    (state: RootState) => state.languageReducer
  );
  const { lessonId, exerciseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<any>();
  const [languageData, setLanguageData] = useState<any | null>(null);
  const [exerciseUI, setExerciseUI] = useState<any | null>(null);
  const [lastExercise, setLastExercise] = useState<boolean>(false);

  let numLessonId = Number(lessonId);
  let numExerciseId = Number(exerciseId);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const handleAuth = async () => {
    const route = handleLanguageURL(
      `/lesson/${lessonId}/${exerciseId}`,
      stateLanguageData.lang
    );

    await axios
      .get(route, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data);

        const lessonStateInfo = {
          exercise: res.data.exercise,
          exerciseCount: res.data.exerciseCount,
        };

        setLessonInfo(lessonStateInfo);
        setLanguageData(res.data.languageData);
        setExerciseUI(res.data.exerciseUI);
      })
      .catch((error) => {
        console.log(error);
        dispatch(
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

  useEffect(() => {
    const bg = getBackground(document.URL);
    document.body.style.backgroundColor = bg;
  }, []);

  useEffect(() => {
    if (lessonId && exerciseId) {
      handleAuth();
    }
  }, [lessonId, exerciseId]);

  useEffect(() => {
    const lastExercise =
      lessonInfo &&
      lessonInfo?.exercise?.exerciseId === lessonInfo?.exerciseCount
        ? true
        : false;
    setLastExercise(lastExercise);
  }, [lessonInfo]);

  switch (lessonInfo?.exercise?.type) {
    case "card":
      return (
        <NewWord
          lessonId={numLessonId}
          exerciseId={numExerciseId}
          lessonInfo={lessonInfo}
          languageData={languageData}
          exerciseUI={exerciseUI}
          isLastExercise={lastExercise}
        ></NewWord>
      );
    case "input":
      return (
        <FillWord
          lessonId={numLessonId}
          exerciseId={numExerciseId}
          lessonInfo={lessonInfo}
          languageData={languageData}
          exerciseUI={exerciseUI}
          isLastExercise={lastExercise}
        ></FillWord>
      );

    case "choice":
      return (
        <ChooseWord
          lessonId={numLessonId}
          exerciseId={numExerciseId}
          lessonInfo={lessonInfo}
          languageData={languageData}
          exerciseUI={exerciseUI}
          isLastExercise={lastExercise}
        ></ChooseWord>
      );
    case "match":
      return (
        <MatchWords
          lessonId={numLessonId}
          exerciseId={numExerciseId}
          lessonInfo={lessonInfo}
          languageData={languageData}
          exerciseUI={exerciseUI}
          isLastExercise={lastExercise}
        ></MatchWords>
      );
    default:
      return <>Błąd wczytywania ćwiczenia</>;
  }
}
