import { Request, Response } from "express";
import { randomBytes } from "node:crypto";

import { findOneUser, insertOneUser } from "../assets/queries";

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

      return res.status(200).send("Zarejestrowano");
    } else {
      return res.status(400).send("Hasła nie są takie same");
    }
  } catch (error) {
    return res.status(500).send(`Error /register ${error}`);
  }
};

export { postRegister };
