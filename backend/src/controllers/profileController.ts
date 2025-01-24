import { ObjectId } from "mongodb";
import { Request, Response } from "express";

import {
  findLastFinishedUserLesson,
  findOneUserByLogin,
  UsersLessons,
  getTimeSpent,
  getAccuracy,
  getLessonsTimeStamps,
  getAllLessonsTimestamps,
  getFinishedLessonsWords,
  findAllRouteLanguages,
  findRoute,
} from "../assets/queries";
import { RequestLogin } from "../middleware/auth";

interface FindUser {
  _id: ObjectId;
  login: string;
  createdDate: Date;
}

interface Stats {
  totalTimeSpent: number;
  accuracy: number;
  timestamps: number[];
  finishedLessonsCount: number;
  wordsLearned: number;
}

interface SentUser {
  login: string;
  createdDate: string; // parsed
  sessionUser: boolean;
  languageData: any;
  languages: string[];
  stats: Stats;
  words: UsersLessons[] | string[];
}

const getProfile = async (req: Request, res: Response) => {
  res.redirect("/profile/:id");
};

const getProfileId = async (req: RequestLogin, res: Response) => {
  try {
    let login: string | undefined = await req.params.id;
    const query = await req.query;

    if (!query)
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });
    if (!query.language)
      return res.status(400).send({ message: "Nieprawidłowe zapytanie" });

    const routeResult = await findRoute("profile", String(query.language));

    const languagesResult = await findAllRouteLanguages("/profile");
    if (!languagesResult || languagesResult.length === 0)
      return res.status(500).send({
        message:
          routeResult && routeResult.alerts.internalServerError
            ? routeResult.alerts.internalServerError
            : "Coś poszło nie tak po stronie serwera",
      });

    console.log(`login in ${req.originalUrl} ${login}`);

    let result: FindUser | null;
    let words: UsersLessons[] | string[] | null = [];

    if (
      (login === undefined || login === "undefined") &&
      req.login !== undefined
    ) {
      console.log(`USING REQ.LOGIN`);
      result = await findOneUserByLogin(req.login);
      words = await findLastFinishedUserLesson(req._id);
    } else {
      result = await findOneUserByLogin(login);
      words = await findLastFinishedUserLesson(req._id);
    }

    if (result && words) {
      console.log(result.login);

      const timeSpentResult = await getTimeSpent(req._id);
      console.log(`timeSpentResult: ${timeSpentResult}`);
      if (!timeSpentResult && timeSpentResult != 0)
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });
      const accuracyResult = await getAccuracy(req._id);
      if (accuracyResult != 0 && !accuracyResult)
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });

      let startDate = new Date(Date.now());
      let endDate = new Date(Date.now());
      startDate.setDate(endDate.getDate() - 7);
      const getTimestamps = await getLessonsTimeStamps(req._id, [
        startDate,
        endDate,
      ]);
      if (!getTimestamps)
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });
      const getTimestampCount = await getAllLessonsTimestamps(req._id);
      if (getTimestampCount != 0 && !getTimestampCount) {
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });
      }
      const getWordsLearned = await getFinishedLessonsWords(req._id);
      if (getWordsLearned !== 0 && !getWordsLearned)
        return res.status(500).send({
          message:
            routeResult && routeResult.alerts.internalServerError
              ? routeResult.alerts.internalServerError
              : "Coś poszło nie tak po naszej stronie",
        });

      let sessionUser = false;
      if (req.login === result.login) sessionUser = true;

      const parseDate: string = result.createdDate.toLocaleDateString();

      const fetched: SentUser = {
        login: result.login,
        createdDate: parseDate,
        sessionUser: sessionUser,
        languageData: routeResult,
        languages: languagesResult,
        stats: {
          totalTimeSpent: timeSpentResult,
          accuracy: accuracyResult,
          timestamps: getTimestamps,
          finishedLessonsCount: getTimestampCount,
          wordsLearned: getWordsLearned,
        },
        words: words,
      };

      return res.status(200).send(fetched);
    } else {
      return res
        .status(404)
        .send(
          routeResult && routeResult.alerts.notFound
            ? routeResult.alerts.notFound
            : `Nie znaleziono użytkownika`
        );
    }
  } catch (error) {
    res.status(500).send(`Error ${req.originalUrl}`);
  }
};

export { getProfile, getProfileId };
