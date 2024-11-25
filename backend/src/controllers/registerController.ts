import { Request, Response } from "express";
import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

import { findOneUser, insertOneUser } from "../assets/queries";

import hashData from "../utilities/hashData";
import { registerLangData } from "../assets/routeLangData/register";

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

  let langIndex = null;

  if (query.lang === "de") {
    langIndex = 0;
  }

  res.status(200).send({
    languageData: langIndex != null ? registerLangData[langIndex] : null,
  });
};

const postRegister = async (req: RegisterRequest, res: Response) => {
  try {
    const { email, login, password, passwordAgain } = await req.body;

    const regex: RegExp =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const hash: string = await hashData(password);

    if (email === "" || !email || login === "" || !login)
      return res.status(422).send("Należy wypełnić wszystkie pola formularza");

    const findUserQuery = await findOneUser(email, login);
    console.log(findUserQuery);
    if (findUserQuery) return res.status(422).send("Użytkownik już istnieje");
    if (login.length <= 3)
      return res
        .status(422)
        .send("Nazwa użytkownika musi być dłuższa niż 3 znaki");

    if (password === "" || !password)
      return res.status(422).send("Hasło niepoprawne");
    if (passwordAgain === "" || !passwordAgain)
      return res.status(422).send("Powtórzone hasło niepoprawne");
    if (regex.test(password) === false)
      return res
        .status(422)
        .send(
          "Hasło musi być dłuższe niż 7 znaków, posiadać przynajmniej jedną dużą i małą literę, cyfrę oraz znak specjalny"
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

      return res.status(200).send({ message: "Zarejestrowano", uuid: uuid });
    } else {
      return res.status(400).send("Hasła nie są takie same");
    }
  } catch (error) {
    return res.status(500).send(`Error /register ${error}`);
  }
};

export { getRegister, postRegister };
