import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findInputExerciseById,
  findLessonById,
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
  const { correct, timeSpent } = await req.body;

  if (!lessonId) return res.status(404).send("Nie znaleziono lekcji");
  if (!exerciseId)
    return res.status(404).send("Nie znaleziono ćwiczenia w zażądanej lekcji");
  if (!correct)
    return res.status(404).send("Serwer nie otrzymał wymaganej zawartości");
  if (correct.length !== 2)
    return res.status(400).send("Przesłano nieprawidłową zawartość");
  if (typeof correct[0] !== "boolean" && typeof correct[1] !== "boolean")
    return res.status(400).send("Przesłano nieprawidłową zawartość");
  if (!timeSpent)
    return res.status(404).send("Serwer nie otrzymał wymaganej zawartości");
  if (typeof timeSpent !== "number")
    return res.status(400).send("Przesłano nieprawidłową zawartość");

  if (req._id) {
    const usersLessonsSave = await updateLessonOnFinish(
      req._id,
      Number(lessonId),
      correct,
      timeSpent
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

  return res.status(200).send({ correct: correct });
};

export { getLessonId, postLessonId, postExerciseAnswer };
