import { randomBytes } from "node:crypto";
import nodemailer from "nodemailer";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { RequestLogin } from "../middleware/auth";
import {
  addExercise,
  deleteExercise,
  findAllRoutesMetadata,
  findLessonByIdAndLanguage,
  findLessonsMetadata,
  findOneUserByLogin,
  findRangeLessons,
  findRoute,
  insertLesson,
  insertRoute,
  replaceLesson,
  updateExercise,
  updateRoute,
  upsertAdminCode,
} from "../assets/queries";
import type { LessonPanel } from "../assets/lessonsDataTypes";
import readCodesFile from "../utilities/readCodesFile";
import { verifyExercise } from "../utilities/verifyExercise";

const constructRegisterMail = (verificationCode: string): string => {
  const htmlString = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Kod dostępu do Panel Administratora</title>
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
    const verificationCode = randomBytes(5).toString("hex").toUpperCase();
    const expiry = new Date(Date.now() + 20 * 60 * 1000);
    const insertVerificationCode = await upsertAdminCode(
      req._id,
      "",
      undefined
    );
    if (!insertVerificationCode)
      return res
        .status(500)
        .send({ message: "Nie udało się zweryfikować tożsamości" });

    const userResult = await findOneUserByLogin(req.login);
    if (!userResult)
      return res
        .status(500)
        .send({ message: "Nie udało się zweryfikować tożsamości" });

    const now = new Date(Date.now());
    if (!userResult.adminCode)
      return res
        .status(500)
        .send({ message: "Nie udało się zweryfikować tożsamości" });
    if (!userResult.adminCode.expiry || userResult.adminCode?.expiry < now) {
      const transporter = nodemailer.createTransport({
        host: "localhost",
        port: 1025,
        secure: false,
      });

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
        from: "noreply@admin.localhost",
        to: userResult?.email,
        subject: "Kod dostępu do Panelu Administratora",
        html: htmlMessage,
      });
      if (!mailInfo)
        return res.status(500).send({
          message: "Coś poszło nie tak po naszej stronie",
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
  const lessonsResult = await findLessonsMetadata();
  if (!lessonsResult)
    return res
      .status(500)
      .send({ message: "Nie udało się pobrać danych o lekcjach" });

  return res.status(200).send(lessonsResult);
};

const getAdminPanelLessonsEditController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId } = await req.params;
  const query = await req.query;

  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (typeof Number(lessonId) !== "number")
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const lessonResult = await findLessonByIdAndLanguage(
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({ message: "Nie udało się pobrać danych" });

  return res.status(200).send({
    message: "Pobieranie danych o lekcji przebiegło pomyślnie",
    result: lessonResult,
  });
};

const getAdminPanelLessonsCreatorController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId, exerciseId } = await req.params;
  const query = await req.query;

  if (!lessonId || Number.isNaN(Number(lessonId)))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!exerciseId || Number.isNaN(Number(exerciseId)))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (
    !query.language ||
    typeof query.language !== "string" ||
    query.language.length !== 2
  )
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const lessonResult = await findLessonByIdAndLanguage(
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({ message: "Nie udało się pobrać danych" });

  if (lessonResult) {
    if (lessonResult.exercises.length < Number(exerciseId) - 1)
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
    // if (lessonResult.exercises.length !== Number(exerciseId) - 1)
    if (lessonResult.exercises.length > Number(exerciseId) - 1) {
      return res.status(200).send({
        message: "Informacje o ćwiczeniu zostały prawidłowo pobrane",
        result: lessonResult.exercises[Number(exerciseId) - 1],
      });
    }
  }

  return res.status(200).send({ message: "Prawidłowo pobrano dane" });
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

const postAdminPanelSubpagesAddController = async (
  req: RequestLogin,
  res: Response
) => {
  const query = await req.query;

  if (typeof query.route === "string" && query.language) {
    const codes = readCodesFile();
    if (!codes)
      return res.status(500).send({ message: "Nie udało się zapisać danych" });

    const codesArr = codes.split(",");
    let isFound = false;
    for (let i = 0; i < codesArr.length - 1; i++) {
      if (codesArr[i] === query.language) {
        isFound = true;
        break;
      }
    }
    if (!isFound)
      return res.status(400).send({ message: "Nieprawidłowy kod języka" });

    //check if the language exists for the route
    const routeResult = await findRoute(
      String(query.route),
      String(query.language)
    );
    if (routeResult)
      return res
        .status(400)
        .send({ message: "Istnieje już takie tłumaczenie podstrony" });

    const routeTemplate = await findRoute(String(query.route), "pl");
    if (!routeTemplate)
      return res.status(500).send({ message: "Nie udało się zapisać danych" });
    if (!Object.keys(routeTemplate).includes("metadata"))
      return res.status(500).send({ message: "Nie udało się zapisać danych" });
    if (!Object.keys(routeTemplate.metadata).includes("language"))
      return res.status(500).send({ message: "Nie udało się zapisać danych" });
    routeTemplate.metadata.language = String(query.language);

    const routeTemplateResult = await insertRoute(routeTemplate);
    if (!routeTemplateResult)
      return res.status(500).send({ message: "Nie udało się zapisać danych" });

    return res
      .status(200)
      .send({ message: "Dodanie nowego języka przebiegło prawidłowo" });
  }
};

const postAdminPanelLessonsEditController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId } = await req.params;
  const query = await req.query;

  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(lessonId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (typeof Number(lessonId) !== "number")
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  if (
    typeof query.language !== "string" ||
    query.language === "null" ||
    query.language.length > 2
  ) {
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  }
  const codes = readCodesFile();
  if (!codes)
    return res.status(500).send({ message: "Nie udało się zapisać danych" });

  const codesArr = codes.split(",");
  let isFound = false;
  for (let i = 0; i < codesArr.length - 1; i++) {
    if (codesArr[i] === query.language) {
      isFound = true;
      break;
    }
  }
  if (!isFound)
    return res.status(400).send({ message: "Nieprawidłowy kod języka" });

  return res
    .status(200)
    .send({ message: "Prawidłowo wybrano język dla edytowanej lekcji" });
};

const postAdminPanelLessonsAddController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId } = await req.params;

  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(lessonId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (typeof Number(lessonId) !== "number")
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const rangeLessonsResult = await findRangeLessons(
    Number(lessonId) - 1,
    Number(lessonId) + 1
  );
  if (!rangeLessonsResult)
    res.status(404).send({ message: "Nie udało się pobrać danych" });

  if (rangeLessonsResult && rangeLessonsResult[0].lessonId) {
    if (rangeLessonsResult[0].lessonId !== Number(lessonId) - 1)
      return res
        .status(500)
        .send({ message: "Nastąpił problem z utworzeniem nowej lekcji" });
  } else
    return res
      .status(500)
      .send({ message: "Nastąpił problem z utworzeniem nowej lekcji" });

  const newLessonTemplate: LessonPanel = {
    lessonId: Number(lessonId),
    language: "pl",
    title: "",
    description: "",
    exercises: [],
    newWords: [],
    exerciseCount: 0,
  };

  const insertLessonResult = await insertLesson(newLessonTemplate);
  if (!insertLessonResult)
    return res
      .status(500)
      .send({ message: "Nastąpił problem z utworzeniem nowej lekcji" });

  return res
    .status(200)
    .send({ message: "Pomyślnie przygotowano nową lekcję" });
};

const postAdminPanelLessonsAddLanguageController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId } = await req.params;
  const query = await req.query;

  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(lessonId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (
    !query.language ||
    typeof query.language !== "string" ||
    query.language.length !== 2
  )
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const lessonResult = await findLessonByIdAndLanguage(Number(lessonId), "pl");
  if (!lessonResult)
    return res.status(500).send({
      message: "Nastąpił problem z utworzeniem nowego tłumaczenia dla lekcji",
    });

  if (lessonResult && lessonResult.language) {
    lessonResult.language = query.language;
    const insertLessonResult = await insertLesson(lessonResult);
    if (!insertLessonResult)
      return res.status(500).send({
        message: "Nastąpił problem z utworzeniem nowego tłumaczenia dla lekcji",
      });
  } else
    return res.status(500).send({
      message: "Nastąpił problem z utworzeniem nowego tłumaczenia dla lekcji",
    });

  return res
    .status(200)
    .send({ message: "Pomyślnie dodano nowy język dla lekcji" });
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

const postAdminPanelLessonsCreatorController = async (
  req: RequestLogin,
  res: Response
) => {
  const data = await req.body;
  const { lessonId, exerciseId } = await req.params;
  const query = await req.query;

  if (!data)
    return res.status(400).send({ message: "Nieprawidłowe dane ćwiczeń" });
  const verifyData = verifyExercise(data);
  if (!verifyData)
    return res.status(400).send({ message: "Nieprawidłowe dane ćwiczeń" });
  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(lessonId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!exerciseId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(exerciseId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  if (
    !query.language ||
    typeof query.language !== "string" ||
    query.language.length !== 2
  )
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const lessonResult = await findLessonByIdAndLanguage(
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({ message: "Nie udało się pobrać danych" });

  if (lessonResult && lessonResult.exercises.length < Number(exerciseId) - 1) {
    return res
      .status(400)
      .send({ message: "Nieprawidłowy identyfikator ćwiczenia" });
  }

  if (lessonResult.exercises.length === Number(exerciseId)) {
    const exerciseUpdateResult = await updateExercise(
      Number(lessonId),
      Number(exerciseId),
      String(query.language),
      data
    );
    if (!exerciseUpdateResult)
      return res
        .status(500)
        .send({ message: "Nastąpił problem z utworzeniem nowego ćwiczenia" });
  }
  if (lessonResult.exercises.length === Number(exerciseId) - 1) {
    const exercisePushResult = await addExercise(
      Number(lessonId),
      String(query.language),
      data
    );
    if (!exercisePushResult)
      return res
        .status(500)
        .send({ message: "Nastąpił problem z utworzeniem nowego ćwiczenia" });
  }

  return res.status(200).send({ message: "Ćwiczenie zapisane pomyślnie" });
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

    return res.status(200).send({
      message: "Zmiany zostały zapisane pomyślnie",
      result: routeResult,
    });
  } else return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
};

const putAdminPanelLessonsEditController = async (
  req: RequestLogin,
  res: Response
) => {
  const data = await req.body;
  const query = await req.query;
  const { lessonId } = await req.params;

  if (!lessonId || typeof Number(lessonId) !== "number")
    return res.status(400).send({ message: "Nieprawidłowy formularz" });
  if (!query || !query.language)
    return res.status(400).send({ message: "Nieprawidłowy formularz" });
  if (!data)
    return res.status(400).send({ message: "Nieprawidłowy formularz" });

  const lessonResult = await replaceLesson(
    data,
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({ message: "Nie udało się zapisać danych" });

  return res.status(200).send({ message: "Dane zapisane pomyślnie" });
};

const deleteAdminPanelLessonsCreatorController = async (
  req: RequestLogin,
  res: Response
) => {
  const { lessonId, exerciseId } = await req.params;
  const query = await req.query;

  if (!lessonId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(lessonId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!exerciseId)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (Number.isNaN(exerciseId))
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
  if (!query.language)
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  if (
    !query.language ||
    typeof query.language !== "string" ||
    query.language.length !== 2
  )
    return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

  const lessonResult = await findLessonByIdAndLanguage(
    Number(lessonId),
    String(query.language)
  );
  if (!lessonResult)
    return res.status(500).send({ message: "Nie udało się zapisać danych" });

  if (lessonResult) {
    if (lessonResult.exercises.length !== Number(exerciseId))
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
    const deleteExerciseResult = await deleteExercise(
      Number(lessonId),
      Number(exerciseId),
      String(query.language)
    );
    if (!deleteExerciseResult)
      return res.status(500).send({ message: "Nie udało się zapisać danych" });
  }

  return res
    .status(200)
    .send({ message: `Ćwiczenie ${exerciseId} zostało pomyślnie usunięte` });
};

export {
  getAdminController,
  getAdminPanelController,
  getAdminPanelSubpagesController,
  getAdminPanelSubpagesEditController,
  getAdminPanelLessonsController,
  getAdminPanelLessonsEditController,
  getAdminPanelLessonsCreatorController,
  postAdminController,
  postAdminPanelSubpagesAddController,
  postAdminPanelLessonsEditController,
  postAdminPanelLessonsAddController,
  postAdminPanelLessonsAddLanguageController,
  postAdminPanelLessonsCreatorController,
  postAdminLogoutController,
  putAdminPanelSubpagesEditController,
  putAdminPanelLessonsEditController,
  deleteAdminPanelLessonsCreatorController,
};
