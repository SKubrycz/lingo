import { Request, Response } from "express";
import { findOneUserByUUID } from "../assets/queries";

const getVerify = async (req: Request, res: Response) => {
  const { verifyId } = await req.params;

  const result = await findOneUserByUUID(verifyId);
  if (result) {
    console.log(`${verifyId} === ${result.uuid}`);
    return res.status(200).send(`Znaleziono użytkownika ${verifyId}`);
  } else {
    return res.status(404).send(`Nie ma takiego uuid ${verifyId}`);
  }
};

const postVerify = async (req: Request, res: Response) => {
  const { verificationCode } = await req.body;
  const { verifyId } = await req.params;

  const result = await findOneUserByUUID(verifyId);
  if (result && result.verificationCode === verificationCode) {
    console.log(`${verifyId} === ${result.uuid}`);
    return res
      .status(200)
      .send(`Weryfikacja przebiegła pomyślnie: ${verifyId}`);
  } else {
    return res
      .status(404)
      .send(`Nie udało się zweryfikować emaila ${verifyId}`);
  }
};

export { getVerify, postVerify };
