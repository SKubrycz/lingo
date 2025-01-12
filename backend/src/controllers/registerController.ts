import { Request, Response } from "express";
import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

import {
  findAllRouteLanguages,
  findOneUser,
  findRoute,
  insertOneUser,
} from "../assets/queries";

import hashData from "../utilities/hashData";

interface RequestBody {
  email: string;
  login: string;
  password: string;
  passwordAgain: string;
}

interface RegisterRequest extends Request {
  body: RequestBody;
}

const constructRegisterMail = (verificationCode: string): string => {
  const htmlString = `  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Space+Grotesk:wght@300..700&display=swap"
      rel="stylesheet"
    />
    <title>Document</title>
  </head>
  <body
    style="
      font-family: 'Fira Sans', Tahoma, Geneva, Verdana, sans-serif;
      color: #4d1f00;
      background-color: rgb(253, 229, 210);
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
      <h1 style="color: rgb(230, 92, 0)">LINGO</h1>
      <h3>Twój kod weryfikacyjny:</h3>
      <h2 style="color: rgb(230, 92, 0)">${verificationCode}</h2>
      <h6>
        Należy go wpisać w okienku weryfikacji
        <i style="color: rgb(230, 92, 0)">Lingo</i>
      </h6>
    </div>
  </body>`;
  return htmlString;
};

const getRegister = async (req: Request, res: Response) => {
  const query = await req.query;

  if (!query || !query.lang)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("register", String(query.lang));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const languagesResult = await findAllRouteLanguages("/register");
  if (!languagesResult || languagesResult.length === 0)
    return res
      .status(500)
      .send({
        message: routeResult.alerts.internalServerError
          ? routeResult.alerts.internalServerError
          : "Coś poszło nie tak po naszej stronie",
      });

  res.status(200).send({
    languageData: routeResult,
    languages: languagesResult,
  });
};

const postRegister = async (req: RegisterRequest, res: Response) => {
  try {
    const query = await req.query;
    const { email, login, password, passwordAgain } = await req.body;

    if (!query || !query.lang)
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

    const routeResult = await findRoute("register", String(query.lang));
    if (!routeResult)
      return res
        .status(500)
        .send({ message: "Coś poszło nie tak po naszej stronie" });

    const regex: RegExp =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const hash: string = await hashData(password);

    if (email === "" || !email || login === "" || !login)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[0]
            ? routeResult.alerts.unprocessableContent[0]
            : "Należy wypełnić wszystkie pola formularza"
        );

    const findUserQuery = await findOneUser(email, login);
    console.log(findUserQuery);
    if (findUserQuery)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[1]
            ? routeResult.alerts.unprocessableContent[1]
            : "Użytkownik już istnieje"
        );
    if (login.length <= 3)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[2]
            ? routeResult.alerts.unprocessableContent[2]
            : "Nazwa użytkownika musi być dłuższa niż 3 znaki"
        );

    if (password === "" || !password)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[3]
            ? routeResult.alerts.unprocessableContent[3]
            : "Hasło niepoprawne"
        );
    if (passwordAgain === "" || !passwordAgain)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[4]
            ? routeResult.alerts.unprocessableContent[4]
            : "Powtórzone hasło niepoprawne"
        );
    if (regex.test(password) === false)
      return res
        .status(422)
        .send(
          routeResult.alerts.unprocessableContent[5]
            ? routeResult.alerts.unprocessableContent[5]
            : "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny"
        );
    if (password === passwordAgain) {
      console.log(
        `req.body in ${req.originalUrl}: ${email} ${login} ${password} ${passwordAgain}, ${hash}`
      );

      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

      const uuid = crypto.randomUUID();
      const verificationCode = randomBytes(3).toString("hex").toUpperCase();

      insertOneUser({
        email: email,
        login: login,
        password: hash,
        uuid: uuid,
        verificationCode: verificationCode,
        verified: false,
      });

      const htmlMessage = constructRegisterMail(verificationCode);

      const mailInfo = await transporter.sendMail({
        from: "noreply@auth.localhost",
        to: email,
        subject: "Weryfikacja konta Lingo",
        html: htmlMessage,
      });

      return res
        .status(200)
        .send({
          message: routeResult.alerts.ok
            ? routeResult.alerts.ok
            : "Zarejestrowano",
          uuid: uuid,
        });
    } else {
      return res
        .status(400)
        .send(
          routeResult.alerts.badRequest
            ? routeResult.alerts.badRequest
            : "Hasła nie są takie same"
        );
    }
  } catch (error) {
    return res.status(500).send(`Error /register`);
  }
};

export { getRegister, postRegister };
