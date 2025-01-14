import { Request, Response } from "express";
import { findRoute } from "../assets/queries";

const getLogout = async (req: Request, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("logout", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  res.clearCookie("access_token_lingo");
  res.clearCookie("refresh_token_lingo");

  res.status(200).send({
    message: routeResult.alerts.ok
      ? routeResult.alerts.ok
      : "Nastąpiło wylogowanie",
  });
};

export { getLogout };
