import { Response } from "express";

import { RequestLogin } from "../middleware/auth";

import { homeLangData } from "../assets/routeLangData/home";
import { setLangIndex } from "../utilities/setLangIndex";

const getHome = async (req: RequestLogin, res: Response) => {
  console.log(`req.login ${req.login}`);

  const query = await req.query;

  let langIndex = setLangIndex(String(query.lang));

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
