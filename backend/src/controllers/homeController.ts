import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findAllRouteLanguages, findRoute } from "../assets/queries";

const getHome = async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  let sessionUser: boolean = false;
  if (req.login) sessionUser = true;

  const routeResult = await findRoute("", String(query.language));

  const languagesResult = await findAllRouteLanguages("/");
  if (!languagesResult || languagesResult.length === 0)
    return res.status(500).send({
      message:
        routeResult && routeResult.alerts.internalServerError
          ? routeResult.alerts.internalServerError
          : "Coś poszło nie tak po naszej stronie",
    });

  const data = {
    sessionUser: sessionUser,
    languageData: routeResult,
    languages: languagesResult,
  };

  return res.status(200).send(data);
};

export { getHome };
