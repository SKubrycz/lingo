import { Response } from "express";

import { RequestLogin } from "../middleware/auth";

import { homeLangData } from "../assets/routeLangData/home";

const getHome = async (req: RequestLogin, res: Response) => {
  console.log(`req.login ${req.login}`);

  const query = await req.query;

  let langIndex = null;

  if (query.lang === "de") {
    langIndex = 0;
  }

  let sessionUser: boolean = false;

  console.log(query.lang);
  console.log(langIndex);

  const data = {
    sessionUser: sessionUser,
    languageData: langIndex != null ? homeLangData[langIndex] : null,
  };

  if (req.login) {
    sessionUser = true;
    res.status(403).send(data);
  } else {
    res.status(200).send(data);
  }

  console.log(`sessionUser ${sessionUser}`);
};

export { getHome };
