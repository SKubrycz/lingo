import { ObjectId } from "mongodb";
import { Request, Response } from "express";

import {
  findLastFinishedUserLesson,
  findOneUserByLogin,
  UsersLessons,
  getAccuracy,
  getTimeSpent,
  getLessonsTimeStamps,
} from "../assets/queries";
import { RequestLogin } from "../middleware/auth";

interface FindUser {
  _id: ObjectId;
  login: string;
  createdDate: Date;
} // !not equal to the one in queries.ts

interface Stats {
  totalTimeSpent: number;
  accuracy: number;
  timestamps: number[];
}

interface SentUser {
  login: string;
  createdDate: string; // parsed
  sessionUser: boolean;
  stats: Stats;
  words: UsersLessons[] | string[];
}

const getProfile = async (req: Request, res: Response) => {
  res.redirect("/profile/:id");
};

const getProfileId = async (req: RequestLogin, res: Response) => {
  try {
    let login: string | undefined = await req.params.id;

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
      if (!timeSpentResult)
        return res
          .status(500)
          .send({ message: "Coś poszło nie tak po naszej stronie" });
      const accuracyResult = await getAccuracy(req._id);
      if (!accuracyResult)
        return res
          .status(500)
          .send({ message: "Coś poszło nie tak po naszej stronie" });

      let startDate = new Date(Date.now());
      let endDate = new Date(Date.now());
      startDate.setDate(endDate.getDate() - 7);
      const getTimestamps = await getLessonsTimeStamps(req._id, [
        startDate,
        endDate,
      ]);
      if (!getTimestamps)
        return res
          .status(500)
          .send({ message: "Coś poszło nie tak po naszej stronie" });

      let sessionUser = false;
      if (req.login === result.login) sessionUser = true;

      const parseDate: string = result.createdDate.toLocaleDateString();

      const fetched: SentUser = {
        login: result.login,
        createdDate: parseDate,
        sessionUser: sessionUser,
        stats: {
          totalTimeSpent: timeSpentResult,
          accuracy: accuracyResult,
          timestamps: getTimestamps,
        },
        words: words,
      };

      return res.status(200).send(fetched);
    } else {
      return res.status(404).send(`Nie znaleziono użytkownika`);
    }
  } catch (error) {
    res.status(500).send(`Error ${req.originalUrl} ${error}`);
  }
};

export { getProfile, getProfileId };
