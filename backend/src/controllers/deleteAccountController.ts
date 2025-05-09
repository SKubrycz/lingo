import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { Request, Response } from "express";
import { RequestLogin } from "../middleware/auth";
import { ObjectId } from "mongodb";
import {
  findOneUserByLogin,
  insertDeleteAccountData,
  findDeletionCode,
  deleteOneUserById,
  findRoute,
} from "../assets/queries";

const constructDeleteEmail = (
  deletionCode: string,
  mailContent: any | null
) => {
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
    <title>Lingo</title>
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
      <h2 style="font-weight: 700">${
        mailContent.content.title
          ? mailContent.content.title
          : "Szkoda nam, że odchodzisz"
      }</h2>
      <h3>${
        mailContent.content.verifyTitle
          ? mailContent.content.verifyTitle
          : "Twój kod usunięcia konta to"
      }:</h3>
      <h2
        style="
          padding: 0.5em;
          border-radius: 5px;
          background-color: rgb(228, 0, 0);
          color: rgb(253, 229, 210);
        "
      >
        ${deletionCode}
      </h2>
      <h6>
        ${
          mailContent.content.instruction
            ? mailContent.content.instruction
            : `Należy go wpisać w okienku weryfikacji
        <i style="color: rgb(230, 92, 0)">Lingo</i>`
        }
      </h6>
    </div>
  </body>
  `;

  return emailString;
};

const getDeleteAccount = async (req: RequestLogin, res: Response) => {
  const { deleteId } = await req.params;

  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("delete-account", String(query.language));

  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (!userResult) {
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : "Coś poszło nie tak po naszej stronie",
      });
    }

    if (userResult.deleteAccount.uuid !== deleteId) {
      return res.status(400).send({
        message:
          routeResult && routeResult.alerts.badRequest[0]
            ? routeResult.alerts.badRequest[0]
            : "Nieprawidłowy identyfikator usunięcia konta",
      });
    }
  }

  return res.status(200).send({
    message:
      routeResult && routeResult.alerts.ok[0]
        ? routeResult.alerts.ok[0]
        : "Strona została wczytana poprawnie",
    languageData: routeResult,
  });
};

const postPrepareDelete = async (req: RequestLogin, res: Response) => {
  const uuid = crypto.randomUUID();
  const deletionCode = randomBytes(6).toString("hex");

  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("delete-account", String(query.language));

  if (req._id && req.login) {
    const insertResult = await insertDeleteAccountData(
      req._id,
      uuid,
      deletionCode
    );
    if (!insertResult) {
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : `Coś poszło nie tak po naszej stronie`,
      });
    }

    const user = await findOneUserByLogin(req.login);

    if (user) {
      const htmlMessage = constructDeleteEmail(
        deletionCode,
        routeResult && routeResult.mail ? routeResult.mail : null
      );

      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

      const mailInfo = await transporter.sendMail({
        from: "noreply@auth.localhost",
        to: user.email,
        subject:
          routeResult && routeResult.mail.subject
            ? routeResult.mail.subject
            : "Kod usunięcia konta Lingo",
        html: htmlMessage,
      });
      if (!mailInfo)
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });
    } else {
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : `Coś poszło nie tak po naszej stronie`,
      });
    }
  } else {
    return res.status(500).send({
      message:
        routeResult && routeResult.alerts.internalServerError
          ? routeResult.alerts.internalServerError
          : `Coś poszło nie tak po naszej stronie`,
    });
  }

  return res.status(200).send({
    message:
      routeResult && routeResult.alerts.ok[1]
        ? routeResult.alerts.ok[1]
        : "Rozpoczęto procedurę usunięcia konta",
    uuid: uuid,
  });
};

const postDeleteAccount = async (req: RequestLogin, res: Response) => {
  const { deletionCode } = await req.body;
  const { deleteId } = await req.params;

  let id: ObjectId | null = null;

  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("delete-account", String(query.language));

  if (req._id) {
    id = req._id;

    // verify the account deletion by the verification code
    const result = await findDeletionCode(id);
    if (!result) {
      console.log("no account ", id);
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : `Coś poszło nie tak po naszej stronie`,
      });
    }

    if (result.deleteAccount.deletionCode !== deletionCode) {
      return res.status(400).send({
        message:
          routeResult && routeResult.alerts.badRequest[1]
            ? routeResult.alerts.badRequest[1]
            : `Podano nieprawidłowy kod`,
      });
    }

    if (result.deleteAccount.uuid !== deleteId) {
      return res.status(403).send({
        message:
          routeResult && routeResult.alerts.forbidden
            ? routeResult.alerts.forbidden
            : `Nieprawidłowa podstrona`,
      });
    }

    if (
      result.deleteAccount.deletionCode === deletionCode &&
      result.deleteAccount.uuid === deleteId
    ) {
      const deleteResult = await deleteOneUserById(id);
      if (!deleteResult) {
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : `Coś poszło nie tak po naszej stronie`,
        });
      }
      console.log("deleteResult: ");
      console.log(deleteResult);

      res.clearCookie("access_token_lingo");
      res.clearCookie("refresh_token_lingo");
    }
  }

  return res.status(200).send({
    message:
      routeResult && routeResult.alerts.ok[2]
        ? routeResult.alerts.ok[2]
        : "Nastąpiło prawidłowe usunięcie konta",
  });
};

export { getDeleteAccount, postPrepareDelete, postDeleteAccount };
