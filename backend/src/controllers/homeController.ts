import { Response } from "express";

import { RequestLogin } from "../middleware/auth";

import { homeLangData } from "../assets/routeLangData/home";
import { setLangIndex } from "../utilities/setLangIndex";
import { findAllRouteLanguages } from "../assets/queries";

const getHome = async (req: RequestLogin, res: Response) => {
  console.log(`req.login ${req.login}`);

  const query = await req.query;

  let langIndex = setLangIndex(String(query.lang));

  let sessionUser: boolean = false;

  console.log(query.lang);
  console.log(langIndex);

  const languagesResult = await findAllRouteLanguages("/");
  if (!languagesResult || languagesResult.length === 0)
    return res
      .status(500)
      .send({ message: "Coś poszło nie tak po naszej stronie" });

  const data = {
    sessionUser: sessionUser,
    languageData: langIndex != null ? homeLangData[langIndex] : null,
    languages: languagesResult,
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
