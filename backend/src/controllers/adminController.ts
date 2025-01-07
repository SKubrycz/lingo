import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { RequestLogin } from "../middleware/auth";
import {
  findAllRoutesMetadata,
  findLessonsList,
  findOneUserByLogin,
  findRoute,
  updateRoute,
  upsertAdminCode,
} from "../assets/queries";
import { aboutLangData } from "../assets/routeLangData/about";

const constructRegisterMail = (verificationCode: string): string => {
  const htmlString = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Document</title>
    </head>
    <body
      style="
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 700;
        color: rgb(2, 10, 23);
        background-color: rgb(245, 248, 255);
      "
    >
      <div
        style="
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <h1 style="color: rgb(100, 149, 237)">LINGO</h1>
        <h3>Twój kod dostępu do Panelu Administratora:</h3>
        <h2 style="color: rgb(100, 149, 237)">${verificationCode}</h2>
      </div>
    </body>
  </html>
`;
  return htmlString;
};

const getAdminController = async (req: RequestLogin, res: Response) => {
  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (!userResult)
      return res
        .status(500)
        .send({ message: "Nie udało się zweryfikować tożsamości" });

    const now = new Date(Date.now());
    if (
      (userResult.adminCode && !userResult.adminCode.expiry) ||
      (userResult.adminCode &&
        userResult.adminCode.expiry &&
        userResult.adminCode?.expiry < now)
    ) {
      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

      const verificationCode = randomBytes(5).toString("hex").toUpperCase();
      const expiry = new Date(Date.now() + 20 * 60 * 1000);
      const insertVerificationCode = await upsertAdminCode(
        req._id,
        verificationCode,
        expiry
      );
      if (!insertVerificationCode)
        return res
          .status(500)
          .send({ message: "Nie udało się zweryfikować tożsamości" });

      const htmlMessage = constructRegisterMail(verificationCode);

      const mailInfo = await transporter.sendMail({
        from: "noreply@auth.localhost",
        to: userResult?.email,
        subject: "Weryfikacja konta Lingo",
        html: htmlMessage,
      });
    }
  } else
    return res
      .status(500)
      .send({ message: "Nie udało się zweryfikować tożsamości" });

  return res.status(200).send({ message: "Zapewniono dostęp do treści" });
};

const getAdminPanelController = async (req: RequestLogin, res: Response) => {
  return res.status(200).send({ message: "Panel admina został udostępniony" });
};

const getAdminPanelSubpagesController = async (
  req: RequestLogin,
  res: Response
) => {
  const routesResult = await findAllRoutesMetadata();

  return res.status(200).send(routesResult);
};

const getAdminPanelSubpagesEditController = async (
  req: RequestLogin,
  res: Response
) => {
  const query = await req.query;

  if (typeof query.route === "string" && query.language) {
    const routeResult = await findRoute(
      String(query.route),
      String(query.language)
    );
    if (!routeResult)
      return res.status(500).send({ message: "Nie udało się pobrać danych" });

    return res.status(200).send(routeResult);
  } else return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
};

const getAdminPanelLessonsController = async (
  req: RequestLogin,
  res: Response
) => {
  const lessonsResult = await findLessonsList();
  if (!lessonsResult)
    return res
      .status(500)
      .send({ message: "Nie udało się pobrać danych o lekcjach" });

  return res.status(200).send(lessonsResult);
};

const postAdminController = async (req: RequestLogin, res: Response) => {
  const { code } = await req.body;
  if (!code) {
    return res
      .status(400)
      .send({ message: "Przesłano nieprawidłowy formularz" });
  }

  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (!userResult || !userResult.adminCode || !userResult.adminCode.expiry)
      return res
        .status(500)
        .send({ message: "Nie udało się zweryfikować tożsamości" });

    const now = new Date(Date.now());
    if (userResult.adminCode.expiry < now) {
      const insertVerificationCode = await upsertAdminCode(
        req._id,
        "",
        undefined
      );
      if (!insertVerificationCode)
        return res
          .status(500)
          .send({ message: "Nie udało się zweryfikować tożsamości" });

      return res.status(401).send({ message: "Kod wygasł" });
    }

    if (code !== userResult.adminCode.code)
      return res
        .status(400)
        .send({ message: "Nie udało się zweryfikować tożsamości" });

    if (!process.env.ADMIN_TOKEN_SECRET)
      return res.status(500).send({ message: "Nastąpił błąd w systemie" });
    const adminTokenExpiry: number = 1000 * 60 * 60;
    const adminToken: string = jwt.sign(
      {
        _id: userResult._id,
        login: userResult.login,
        role: userResult.role,
        code: userResult.adminCode.code,
      },
      process.env.ADMIN_TOKEN_SECRET,
      { expiresIn: adminTokenExpiry }
    );

    res.cookie("admin_token_lingo", adminToken, {
      httpOnly: true,
      maxAge: adminTokenExpiry,
      sameSite: "strict",
    });
  }

  return res.status(200).send({ message: "Weryfikacja przebiegła pomyślnie" });
};

const postAdminLogoutController = async (req: RequestLogin, res: Response) => {
  if (req._id) {
    res.clearCookie("admin_token_lingo");
  } else {
    return res.status(500).send({ message: "Wylogowanie nie powiodło się" });
  }

  res
    .status(200)
    .send({ message: "Nastąpiło wylogowanie z Panelu Administratora" });
};

const putAdminPanelSubpagesEditController = async (
  req: RequestLogin,
  res: Response
) => {
  const data = await req.body;
  const query = await req.query;

  if (typeof query.route === "string" && query.language) {
    const routeResult = await updateRoute(
      String(query.route),
      String(query.language),
      data.routeData
    );
    if (!routeResult)
      return res.status(500).send({ message: "Nie udało się pobrać danych" });

    return res
      .status(200)
      .send({
        message: "Zmiany zostały zapisane pomyślnie",
        result: routeResult,
      });
  } else return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
};

export {
  getAdminController,
  getAdminPanelController,
  getAdminPanelSubpagesController,
  getAdminPanelSubpagesEditController,
  getAdminPanelLessonsController,
  postAdminController,
  postAdminLogoutController,
  putAdminPanelSubpagesEditController,
};
