import { Request, Response } from "express";
import {
  deleteOneUserById,
  findOneUserByUUID,
  findRoute,
  updateOneUserByUUID,
} from "../assets/queries";

const getVerify = async (req: Request, res: Response) => {
  const { verifyId } = await req.params;

  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("verify", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const result = await findOneUserByUUID(verifyId);
  if (result) {
    if (result.verified)
      return res
        .status(308)
        .send({
          message: routeResult.alerts.permanentRedirect
            ? routeResult.alerts.permanentRedirect
            : `Konto zostało już zweryfikowane`,
        });
    console.log(`${verifyId} === ${result.uuid}`);
    return res.status(200).send({
      message: routeResult.alerts.ok
        ? routeResult.alerts.ok
        : `Znaleziono użytkownika`,
      languageData: routeResult,
    });
  } else {
    return res
      .status(404)
      .send({
        message: routeResult.alerts.notFound
          ? routeResult.alerts.notFound
          : `Nie ma takiego uuid`,
      });
  }
};

const postVerify = async (req: Request, res: Response) => {
  const { verificationCode } = await req.body;
  const { verifyId } = await req.params;

  const query = await req.query;

  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const routeResult = await findRoute("verify", String(query.language));
  if (!routeResult)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const currentTime = new Date(Date.now());

  const result = await findOneUserByUUID(verifyId);
  if (
    result &&
    result.verificationCode.length > 5 &&
    result.verificationCode === verificationCode
  ) {
    if (result.verified)
      return res.status(308).send({
        message: routeResult.alerts.permanentRedirect
          ? routeResult.alerts.permanentRedirect
          : `Konto zostało już zweryfikowane`,
      });
    const timeDelta =
      (currentTime.getTime() - result.createdDate.getTime()) / (1000 * 60); // minutes
    console.log(`timeDelta: ${timeDelta}`);

    if (timeDelta > 20 && !result.verified) {
      const deleteResult = await deleteOneUserById(result._id);
      if (!deleteResult)
        return res.status(500).send({
          message: routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : `Coś poszło nie tak po naszej stronie`,
        });

      return res.status(410).send({
        message: routeResult.alerts.gone
          ? routeResult.alerts.gone
          : `Okno czasowe weryfikacji emaila wygasło, proszę zarejestrować się ponownie`,
      });
    }

    console.log(`${verifyId} === ${result.uuid}`);
    const updateResult = await updateOneUserByUUID(result.email, result.uuid);
    if (updateResult) {
      return res.status(200).send({
        message: routeResult.alerts.ok
          ? routeResult.alerts.ok
          : `Weryfikacja przebiegła pomyślnie`,
      });
    } else {
      return res.status(500).send({
        message: routeResult.alerts.internalServerError
          ? routeResult.alerts.internalServerError
          : `Coś poszło nie tak po naszej stronie`,
      });
    }
  } else if (result?.verificationCode !== verificationCode) {
    return res.status(400).send({
      message: routeResult.alerts.badRequest
        ? routeResult.alerts.badRequest
        : `Niepoprawny kod weryfikacyjny`,
    });
  } else {
    return res.status(404).send({
      message: routeResult.alerts.notFound
        ? routeResult.alerts.notFound
        : `Nie udało się zweryfikować emaila`,
    });
  }
};

export { getVerify, postVerify };
