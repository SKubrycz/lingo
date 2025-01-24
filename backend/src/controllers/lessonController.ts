import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findExerciseUI,
  findInputExerciseById,
  findLessonByIdAndLanguage,
  findRangeUsersLessons,
  findRoute,
  updateLessonOnFinish,
} from "../assets/queries";

const getLessonId = async (req: RequestLogin, res: Response) => {
  const query = await req.query;
  const { lessonId, exerciseId } = await req.params;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("lesson", String(query.language));

  if (!lessonId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[0]
          ? routeResult.alerts.notFound[0]
          : "Nie znaleziono lekcji",
    });
  if (!exerciseId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[1]
          ? routeResult.alerts.notFound[1]
          : "Nie znaleziono ćwiczenia w zażądanej lekcji",
    });

  if (!req._id)
    return res.status(500).send({
      message:
        routeResult && routeResult.alerts.internalServerError[0]
          ? routeResult.alerts.internalServerError[0]
          : "Coś poszło nie tak po naszej stronie",
    });
  const usersLessonsRangeResult = await findRangeUsersLessons(
    req._id,
    1,
    Number(lessonId)
  );
  if (!usersLessonsRangeResult)
    return res.status(500).send({
      message:
        routeResult && routeResult.alerts.internalServerError[1]
          ? routeResult.alerts.internalServerError[1]
          : "Nie udało się pobrać danych",
    });
  let unfinishedLesson = false;
  console.log(usersLessonsRangeResult);
  for (let i = 0; i < usersLessonsRangeResult.length; i++) {
    if (usersLessonsRangeResult[i].lessonId < Number(lessonId)) {
      if (!usersLessonsRangeResult[i].finished) {
        unfinishedLesson = true;
        break;
      }
    }
  }
  if (unfinishedLesson)
    return res.status(400).send({
      message:
        routeResult && routeResult.alerts.badRequest
          ? routeResult.alerts.badRequest
          : "Należy ukończyć wcześniejsze lekcje",
    });

  const lessonResult = await findLessonByIdAndLanguage(
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({
      message:
        routeResult && routeResult.alerts.internalServerError[1]
          ? routeResult.alerts.internalServerError[1]
          : "Nie udało się pobrać danych",
    });

  let result: any;

  if (lessonResult) {
    let exercise = lessonResult.exercises.filter(
      (ex) => ex.exerciseId === Number(exerciseId)
    );
    const exerciseUIResult = await findExerciseUI(
      exercise[0].type,
      String(query.language)
    );
    if (!exerciseUIResult)
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError[1]
            ? routeResult.alerts.internalServerError[1]
            : "Nie udało się pobrać danych",
      });

    result = {
      exercise: exercise[0],
      exerciseCount: lessonResult.exerciseCount,
      languageData: routeResult,
      exerciseUI: exerciseUIResult,
    };
  }

  return res.status(200).send(result);
};

const postLessonId = async (req: RequestLogin, res: Response) => {
  const query = await req.query;
  const { lessonId, exerciseId } = await req.params;
  const { correct, timeSpent } = await req.body;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("lesson", String(query.language));

  if (!lessonId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[0]
          ? routeResult.alerts.notFound[0]
          : "Nie znaleziono lekcji",
    });
  if (!exerciseId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[1]
          ? routeResult.alerts.notFound[1]
          : "Nie znaleziono ćwiczenia w zażądanej lekcji",
    });
  if (!correct)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[2]
          ? routeResult.alerts.notFound[2]
          : "Serwer nie otrzymał wymaganej zawartości",
    });
  if (
    correct.forEach((el: boolean) => {
      if (typeof el !== "boolean") return false;
    })
  )
    return res.status(400).send({
      message:
        routeResult && routeResult.alerts.badRequest[1]
          ? routeResult.alerts.badRequest[1]
          : "Przesłano nieprawidłową zawartość",
    });
  if (!timeSpent)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[2]
          ? routeResult.alerts.notFound[2]
          : "Serwer nie otrzymał wymaganej zawartości",
    });
  if (typeof timeSpent !== "number")
    return res.status(400).send({
      message:
        routeResult && routeResult.alerts.badRequest[1]
          ? routeResult.alerts.badRequest[1]
          : "Przesłano nieprawidłową zawartość",
    });

  if (req._id) {
    const usersLessonsSave = await updateLessonOnFinish(
      req._id,
      Number(lessonId),
      String(query.language),
      correct,
      timeSpent
    );

    if (!usersLessonsSave)
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError[2]
            ? routeResult.alerts.internalServerError[2]
            : "Nie udało się zapisać postępu lekcji",
      });
  }

  return res.status(200).send({
    message:
      routeResult && routeResult.alerts.ok[0]
        ? routeResult.alerts.ok[0]
        : "Lekcja zakończona pomyślnie",
  });
};

const postExerciseAnswer = async (req: RequestLogin, res: Response) => {
  const query = await req.query;
  const { lessonId, exerciseId } = await req.params;
  const word = await req.body;

  let correct: boolean = false;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("lesson", String(query.language));

  if (!lessonId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[0]
          ? routeResult.alerts.notFound[0]
          : "Nie znaleziono lekcji",
    });
  if (!exerciseId)
    return res.status(404).send({
      message:
        routeResult && routeResult.alerts.notFound[1]
          ? routeResult.alerts.notFound[1]
          : "Nie znaleziono ćwiczenia w zażądanej lekcji",
    });

  const exerciseResult = await findInputExerciseById(
    Number(lessonId),
    Number(exerciseId),
    String(query.language)
  );
  if (!exerciseResult)
    return res
      .status(500)
      .send({
        message:
          routeResult && routeResult.alerts.internalServerError[1]
            ? routeResult.alerts.internalServerError[1]
            : "Nie udało się pobrać danych",
      });

  if (exerciseResult.type === "input") {
    if (word.missingWord.toLowerCase() !== exerciseResult.missingWords) {
      correct = false;
    } else {
      correct = true;
    }
  } else if (exerciseResult.type === "choice") {
    if (word.answer !== exerciseResult.answer) {
      correct = false;
    } else {
      correct = true;
    }
  } else if (exerciseResult.type === "match") {
    exerciseResult.words.forEach((el, i) => {
      if (!correct && word.words[0] === el[0] && word.words[1] === el[1])
        return (correct = true);
    });
  }

  return res
    .status(200)
    .send({
      message:
        routeResult && routeResult.alerts.ok[1]
          ? routeResult.alerts.ok[1]
          : "Odpowiedź zweryfikowana",
      correct: correct,
    });
};

export { getLessonId, postLessonId, postExerciseAnswer };
