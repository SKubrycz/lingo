import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { RequestLogin } from "../middleware/auth";
import { ObjectId } from "mongodb";
import { findOneUserByLogin, insertDeletionCode } from "../assets/queries";

const constructDeleteEmail = () => {
  const emailString = `
  <head>
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
      <h2 style="font-weight: 700">Szkoda nam, że odchodzisz...</h2>
      <h3>Twój kod usunięcia konta to:</h3>
      <h2
        style="
          padding: 0.5em;
          border-radius: 5px;
          background-color: rgb(228, 0, 0);
          color: rgb(253, 229, 210);
        "
      >
        E5F2D15B
      </h2>
      <h6>
        Należy go wpisać w okienku weryfikacji
        <i style="color: rgb(230, 92, 0)">Lingo</i>
      </h6>
    </div>
  </body>
  `;

  return emailString;
};

const getDeleteAccount = async (req: Request, res: Response) => {
  const { deleteId } = req.params;

  res.status(200).send({ message: "200" });
};

const postPrepareDelete = async (req: RequestLogin, res: Response) => {
  const uuid = crypto.randomUUID();
  const deletionCode = randomBytes(6).toString("hex");

  if (req._id && req.login) {
    insertDeletionCode(req._id, deletionCode);

    const user = await findOneUserByLogin(req.login);

    if (user) {
      const htmlMessage = constructDeleteEmail();

      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

      const mailInfo = await transporter.sendMail({
        from: "noreply@auth.localhost",
        to: user.email,
        subject: "Weryfikacja konta Lingo",
        html: htmlMessage,
      });
    } else {
      res.status(500).send({ message: `Coś poszło nie tak po naszej stronie` });
    }
  } else {
    res.status(500).send({ message: `Coś poszło nie tak po naszej stronie` });
  }

  res
    .status(200)
    .send({ message: "Rozpoczęto procedurę usunięcia konta", uuid: uuid });
};

const postDeleteAccount = async (req: RequestLogin, res: Response) => {
  let id: ObjectId | null = null;

  if (req._id) {
    id = req._id;

    // prepare unique link to redirect to
    // create a unique code to be sent through email
    // verify the account deletion by the verification code
  }

  res.status(200).send({ message: "Nastąpiło prawidłowe usunięcie konta" });
};

export { getDeleteAccount, postPrepareDelete, postDeleteAccount };
