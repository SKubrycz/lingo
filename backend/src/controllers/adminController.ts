import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { Response } from "express";
import { RequestLogin } from "../middleware/auth";
import { findOneUserByLogin, upsertAdminCode } from "../assets/queries";

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
        <h3>Twój jednorazowy kod dostępu do Panelu Administratora:</h3>
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

    const transporter = nodemailer.createTransport({
      host: "localhost",
      port: 1025,
      secure: false,
    });

    const verificationCode = randomBytes(5).toString("hex").toUpperCase();
    const insertVerificationCode = await upsertAdminCode(
      req._id,
      verificationCode
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
  } else
    return res
      .status(500)
      .send({ message: "Nie udało się zweryfikować tożsamości" });

  return res.status(200).send({ message: "Zapewniono dostęp do treści" });
};

const postAdminController = async () => {
  // user verifies one-time code
  // if comparison positive send 200
  // after that, user gets redirected to /admin/panel
};

export { getAdminController };
