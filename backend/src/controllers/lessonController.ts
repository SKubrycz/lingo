import { Request, Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findInputExerciseById,
  updateLessonAccuracy,
  findLessonById,
  saveLessonProgressById,
  updateLessonOnFinish,
} from "../assets/queries";

const getLessonId = async (req: RequestLogin, res: Response) => {
  const { lessonId, exerciseId } = await req.params;

  if (!lessonId) return res.status(404).send("Nie znaleziono lekcji");
  if (!exerciseId)
    return res.status(404).send("Nie znaleziono ćwiczenia w zażądanej lekcji");

  const lessonResult = await findLessonById(
    Number(lessonId),
    Number(exerciseId)
  );
  if (!lessonResult) return res.status(500).send("Nie udało się pobrać danych");

  return res.status(200).send(lessonResult);
};

const postLessonId = async (req: RequestLogin, res: Response) => {
  const { lessonId, exerciseId } = await req.params;

  if (!lessonId) return res.status(404).send("Nie znaleziono lekcji");
  if (!exerciseId)
    return res.status(404).send("Nie znaleziono ćwiczenia w zażądanej lekcji");

  if (req.login) {
    const saveProgress = await saveLessonProgressById(
      req.login,
      Number(lessonId),
      Number(exerciseId)
    );
    if (!saveProgress)
      return res.status(500).send("Nie udało się zapisać postępu lekcji");
  }

  if (req._id) {
    const usersLessonsSave = await updateLessonOnFinish(
      req._id,
      Number(lessonId)
    );

    if (!usersLessonsSave)
      return res.status(500).send("Nie udało się zapisać postępu lekcji");
  }

  return res.status(200).send({ message: "Lekcja zakończona pomyślnie" });
};

const postExerciseAnswer = async (req: RequestLogin, res: Response) => {
  const { lessonId, exerciseId } = await req.params;
  const word = await req.body;

  let correct: boolean = false;

  if (!lessonId) return res.status(404).send("Nie znaleziono lekcji");
  if (!exerciseId)
    return res.status(404).send("Nie znaleziono ćwiczenia w zażądanej lekcji");

  const exerciseResult = await findInputExerciseById(
    Number(lessonId),
    Number(exerciseId)
  );
  if (!exerciseResult)
    return res.status(500).send("Nie udało się pobrać danych");

  if (word.missingWord.toLowerCase() !== exerciseResult.missingWords) {
    correct = false;
  } else {
    correct = true;
  }

  if (req._id) {
    const updateResult = await updateLessonAccuracy(
      req._id,
      Number(lessonId),
      Number(exerciseId),
      correct
    );

    if (!updateResult)
      return res
        .status(500)
        .send({ message: "Coś poszło nie tak po naszej stronie" });
  } else {
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });
  }

  return res.status(200).send({ correct: correct });
};

export { getLessonId, postLessonId, postExerciseAnswer };
