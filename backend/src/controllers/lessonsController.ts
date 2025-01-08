import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findFilledLessonsList,
  findOneUserByLogin,
  findUsersLessonsById,
} from "../assets/queries";

const getLessons = async (req: RequestLogin, res: Response) => {
  const lessonsResult = await findFilledLessonsList();

  if (!req.login)
    return res.status(500).send("Coś poszło nie tak po stronie serwera");
  if (!req._id)
    return res.status(500).send("Coś poszło nie tak po stronie serwera");

  const userResult = await findOneUserByLogin(req.login);
  if (userResult) {
    console.log(userResult.login);

    const usersLessonsResult = await findUsersLessonsById(req._id);

    const results = {
      lessonsResult: lessonsResult,
      usersLessonsResult: usersLessonsResult,
      login: userResult.login,
    };

    res.status(200).send(results);
  } else {
    res.status(404).send("Nie znaleziono użytkownika");
  }
};

export { getLessons };
