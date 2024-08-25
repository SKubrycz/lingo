import { Response } from "express";

import { RequestLogin } from "../middleware/auth";

const getHome = async (req: RequestLogin, res: Response) => {
  console.log(`req.login ${req.login}`);

  let sessionUser: boolean = false;
  if (req.login) {
    sessionUser = true;
    res.status(403).send(sessionUser);
  } else {
    res.status(200).send(sessionUser);
  }

  console.log(`sessionUser ${sessionUser}`);
};

export { getHome };
