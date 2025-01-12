import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findAllRouteLanguages,
  findFilledLessonsListWithLanguage,
  findOneUserByLogin,
  findRoute,
  findUsersLessonsById,
} from "../assets/queries";

const getLessons = async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("lessons", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const languagesResult = await findAllRouteLanguages("/lessons");
  if (!languagesResult || languagesResult.length === 0)
    return res.status(500).send({
      message: routeResult.alerts.internalServerError
        ? routeResult.alerts.internalServerError
        : "Coś poszło nie tak po naszej stronie",
    });

  const lessonsResult = await findFilledLessonsListWithLanguage(
    String(query.language)
  );

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
      languageData: routeResult,
      languages: languagesResult,
      login: userResult.login,
    };

    res.status(200).send(results);
  } else {
    res.status(404).send("Nie znaleziono użytkownika");
  }
};

export { getLessons };
