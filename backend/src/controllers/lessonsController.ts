import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findLessonsList, findOneUserByLogin } from "../assets/queries";

const getLessons = async (req: RequestLogin, res: Response) => {
  const result = await findLessonsList();

  if (!req.login)
    return res.status(500).send("Coś poszło nie tak po stronie serwera");

  const userResult = await findOneUserByLogin(req.login);
  if (userResult) {
    console.log(userResult.login);

    const results = {
      result: result,
      login: userResult.login,
    };

    res.status(200).send(results);
  } else {
    res.status(404).send("Nie znaleziono użytkownika");
  }
};

export { getLessons };
