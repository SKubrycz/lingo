import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findAllRouteLanguages, findOneUserByLogin } from "../assets/queries";
import { aboutLangData } from "../assets/routeLangData/about";
import { setLangIndex } from "../utilities/setLangIndex";

const getAbout = async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  let langIndex = setLangIndex(String(query.lang));

  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (userResult) {
      console.log(userResult.login);

      const languagesResult = await findAllRouteLanguages("/about");
      if (!languagesResult || languagesResult.length === 0)
        return res
          .status(500)
          .send({ message: "Coś poszło nie tak po naszej stronie" });

      const results = {
        login: userResult.login,
        languageData: langIndex != null ? aboutLangData[langIndex] : null,
        languages: languagesResult,
      };

      res.status(200).send(results);
    } else {
      res.status(404).send("Nie znaleziono użytkownika");
    }
  } else if (!req.login) {
    const languagesResult = await findAllRouteLanguages("/about");
    if (!languagesResult || languagesResult.length === 0)
      return res
        .status(500)
        .send({ message: "Coś poszło nie tak po naszej stronie" });

    res.status(200).send({
      message: "Nie zalogowany",
      languageData: langIndex != null ? aboutLangData[langIndex] : null,
      languages: languagesResult,
    });
  }
};

export { getAbout };
