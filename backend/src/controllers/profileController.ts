import { ObjectId } from "mongodb";
import { Request, Response } from "express";

import { findOneUserByLogin } from "../assets/queries";
import { RequestLogin } from "../middleware/auth";

interface FindUser {
  _id: ObjectId;
  login: string;
  createdDate: Date;
} // !not equal to the one in queries.ts

interface SentUser {
  id: ObjectId;
  login: string;
  createdDate: string; // parsed
  sessionUser: boolean;
}

const getProfile = async (req: Request, res: Response) => {
  res.redirect("/profile/:id");
};

const getProfileId = async (req: RequestLogin, res: Response) => {
  try {
    let login: string | undefined = await req.params.id;

    console.log(`login in ${req.originalUrl} ${login}`);

    let result: FindUser | null;

    if (
      (login === undefined || login === "undefined") &&
      req.login !== undefined
    ) {
      console.log(`USING REQ.LOGIN`);
      result = await findOneUserByLogin(req.login);
    } else {
      result = await findOneUserByLogin(login);
    }

    if (result) {
      console.log(result.login);

      let sessionUser = false;
      if (req.login === result.login) sessionUser = true;

      const parseDate: string = result.createdDate.toLocaleDateString();

      const fetched: SentUser = {
        id: result._id,
        login: result.login,
        createdDate: parseDate,
        sessionUser: sessionUser,
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
