import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findOneUserByLogin } from "../assets/queries";

const getAbout = async (req: RequestLogin, res: Response) => {
  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (userResult) {
      console.log(userResult.login);

      const results = {
        login: userResult.login,
      };

      res.status(200).send(results);
    } else {
      res.status(404).send("Nie znaleziono użytkownika"); //Later to be closely examined (maybe change the status code)
    }
  } else if (!req.login) {
    res.status(200).send("Nie zalogowany");
  }
};

export { getAbout };
