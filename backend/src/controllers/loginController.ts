import { Request, Response } from "express";

import jwt from "jsonwebtoken";

import {
  findAllRouteLanguages,
  findOneUserByLogin,
  findRoute,
} from "../assets/queries";
import comparePassword from "../utilities/comparePassword";

const getLogin = async (req: Request, res: Response) => {
  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("login", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const languagesResult = await findAllRouteLanguages("/login");
  if (!languagesResult || languagesResult.length === 0)
    return res.status(500).send({
      message: routeResult.alerts.internalServerError
        ? routeResult.alerts.internalServerError
        : "Coś poszło nie tak po naszej stronie",
    });

  res.status(200).send({
    languageData: routeResult,
    languages: languagesResult,
  });
};

const postLogin = async (req: Request, res: Response) => {
  try {
    const query = await req.query;
    const { login, password } = await req.body;

    if (!query || !query.language)
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

    console.log(`req.body in ${req.originalUrl} ${login}, ${password}`);

    if (!process.env.REFRESH_TOKEN_SECRET || !process.env.ACCESS_TOKEN_SECRET)
      return;

    const routeResult = await findRoute("login", String(query.language));
    if (!routeResult)
      return res
        .status(500)
        .send({ message: "Coś poszło nie tak po naszej stronie" });

    const result = await findOneUserByLogin(login);
    if (!result)
      return res
        .status(404)
        .send(
          routeResult.alerts.notFound
            ? routeResult.alerts.notFound
            : "Nie znaleziono użytkownika"
        );

    const comparison: boolean = await comparePassword(
      password,
      result.password
    );
    if (comparison === false)
      return res
        .status(400)
        .send(
          routeResult.alerts.badRequest
            ? routeResult.alerts.badRequest
            : "Niepoprawne hasło"
        );

    const accessTokenExpiry: number = 1000 * 60 * 60;
    const refreshTokenExpiry: number = 1000 * 60 * 60 * 24 * 30;

    const accessToken: string = jwt.sign(
      { _id: result._id, login: result.login, role: result.role },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: accessTokenExpiry }
    );
    const refreshToken: string = jwt.sign(
      { _id: result._id, login: result.login, role: result.role },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: refreshTokenExpiry }
    );

    res.cookie("access_token_lingo", accessToken, {
      httpOnly: true,
      maxAge: accessTokenExpiry,
      sameSite: "strict",
    });

    res.cookie("refresh_token_lingo", refreshToken, {
      httpOnly: true,
      maxAge: refreshTokenExpiry,
      sameSite: "strict",
    });

    return res
      .status(200)
      .send(routeResult.alerts.ok ? routeResult.alerts.ok : "Zalogowano");
  } catch (error) {
    res.status(500).send(`Error /login`);
  }
};

export { getLogin, postLogin };
