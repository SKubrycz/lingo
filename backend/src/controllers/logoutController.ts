import { Request, Response } from "express";
import { findRoute } from "../assets/queries";

const getLogout = async (req: Request, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("logout", String(query.language));

  res.clearCookie("access_token_lingo");
  res.clearCookie("refresh_token_lingo");

  res.status(200).send({
    message:
      routeResult && routeResult.alerts.ok
        ? routeResult.alerts.ok
        : "Nastąpiło wylogowanie",
  });
};

export { getLogout };
