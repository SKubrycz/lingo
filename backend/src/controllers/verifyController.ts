import { Request, Response } from "express";
import {
  deleteOneUserById,
  findOneUserByUUID,
  updateOneUserByUUID,
} from "../assets/queries";

const getVerify = async (req: Request, res: Response) => {
  const { verifyId } = await req.params;

  const result = await findOneUserByUUID(verifyId);
  if (result) {
    if (result.verified)
      return res.status(308).send(`Konto zostało już zweryfikowane`);
    console.log(`${verifyId} === ${result.uuid}`);
    return res.status(200).send(`Znaleziono użytkownika ${verifyId}`);
  } else {
    return res.status(404).send(`Nie ma takiego uuid ${verifyId}`);
  }
};

const postVerify = async (req: Request, res: Response) => {
  const { verificationCode } = await req.body;
  const { verifyId } = await req.params;

  const currentTime = new Date(Date.now());

  const result = await findOneUserByUUID(verifyId);
  if (
    result &&
    result.verificationCode.length > 5 &&
    result.verificationCode === verificationCode
  ) {
    if (result.verified)
      return res.status(308).send(`Konto zostało już zweryfikowane`);
    const timeDelta =
      (currentTime.getTime() - result.createdDate.getTime()) / (1000 * 60); // minutes
    console.log(`timeDelta: ${timeDelta}`);

    if (timeDelta > 20 && !result.verified) {
      const deleteResult = await deleteOneUserById(result._id);
      if (!deleteResult)
        return res.status(500).send(`Coś poszło nie tak po naszej stronie`);

      return res
        .status(410)
        .send(
          `Okno czasowe weryfikacji emaila wygasło, proszę zarejestrować się ponownie`
        );
    }

    console.log(`${verifyId} === ${result.uuid}`);
    const updateResult = await updateOneUserByUUID(result.email, result.uuid);
    if (updateResult) {
      return res.status(200).send(`Weryfikacja przebiegła pomyślnie`);
    } else {
      return res.status(500).send(`Coś poszło nie tak po naszej stronie`);
    }
  } else if (result?.verificationCode !== verificationCode) {
    return res.status(400).send(`Niepoprawny kod weryfikacyjny`);
  } else {
    return res
      .status(404)
      .send(`Nie udało się zweryfikować emaila ${verifyId}`);
  }
};

export { getVerify, postVerify };
