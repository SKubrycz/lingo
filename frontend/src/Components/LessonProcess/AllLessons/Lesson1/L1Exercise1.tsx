import axios from "axios";

import { useState, useEffect } from "react";
import LessonProcess from "../../LessonProcess";
import CardEx from "../../Stepper/Variants/CardEx";

import { useDispatch } from "react-redux";
import { setAlert } from "../../../../state/alertSnackbar/alertSnackbar";

interface L1Exercise1Data {
  exerciseId: number;
  type: string;
  word: string;
  description: string;
}

interface L1Exercise1Props {
  lessonId: number; // Lesson number;
}

export default function L1Exercise1({ lessonId }: L1Exercise1Props) {
  const [lessonInfo, setLessonInfo] = useState<L1Exercise1Data | undefined>(
    undefined
  );

  const alertSnackbarDataDispatch = useDispatch();

  const handleAuth = async () => {
    await axios
      .get(
        `http://localhost:${process.env.REACT_APP_SERVER_PORT}/lesson/${lessonId}/1`,
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
  }, []);

  return (
    <LessonProcess lessonInfo={lessonInfo}>
      <CardEx
        exerciseId={lessonInfo ? lessonInfo?.exerciseId : undefined}
        word={lessonInfo ? lessonInfo?.word : undefined}
        description={lessonInfo ? lessonInfo?.description : undefined}
      ></CardEx>
    </LessonProcess>
  );
}
