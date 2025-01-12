import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import {
  findAllRouteLanguages,
  findOneUserByLogin,
  findRoute,
} from "../assets/queries";

const getAbout = async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("about", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (userResult) {
      console.log(userResult.login);

      const languagesResult = await findAllRouteLanguages("/about");
      if (!languagesResult || languagesResult.length === 0)
        return res.status(500).send({
          message: routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : "Coś poszło nie tak po naszej stronie",
        });

      const results = {
        login: userResult.login,
        languageData: routeResult,
        languages: languagesResult,
      };

      res.status(200).send(results);
    } else {
      res
        .status(404)
        .send(
          routeResult.alerts.notFound
            ? routeResult.alerts.notFound
            : "Nie znaleziono użytkownika"
        );
    }
  } else if (!req.login) {
    const languagesResult = await findAllRouteLanguages("/about");
    if (!languagesResult || languagesResult.length === 0)
      return res.status(500).send({
        message: routeResult.alerts.internalServerError
          ? routeResult.alerts.internalServerError
          : "Coś poszło nie tak po naszej stronie",
      });

    res.status(200).send({
      message: routeResult.alerts.ok ? routeResult.alerts.ok : "Nie zalogowany",
      languageData: routeResult,
      languages: languagesResult,
    });
  }
};

export { getAbout };
