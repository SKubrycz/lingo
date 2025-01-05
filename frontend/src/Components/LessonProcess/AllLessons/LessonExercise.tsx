import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setAlert } from "../../../state/alertSnackbarSlice";
import FillWord from "./FillWord";
import NewWord from "./NewWord";

interface LessonExerciseProps {}

export default function LessonExercise({}: LessonExerciseProps) {
  const { lessonId, exerciseId } = useParams();
  const [lessonInfo, setLessonInfo] = useState<any>();
  const [lastExercise, setLastExercise] = useState<boolean>(false);

  let numLessonId = Number(lessonId);
  let numExerciseId = Number(exerciseId);

  const navigate = useNavigate();

  const dispatch = useDispatch();

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
          isLastExercise={lastExercise}
        ></NewWord>
      );
    case "input":
      return (
        <FillWord
          lessonId={numLessonId}
          exerciseId={numExerciseId}
          isLastExercise={lastExercise}
        ></FillWord>
      );
    default:
      return <>Błąd wczytywania ćwiczenia</>;
  }
}
