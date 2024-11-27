import { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findOneUserByLogin } from "../assets/queries";
import { aboutLangData } from "../assets/routeLangData/about";
import { setLangIndex } from "../utilities/setLangIndex";

const getAbout = async (req: RequestLogin, res: Response) => {
  const query = await req.query;

  let langIndex = setLangIndex(String(query.lang));

  if (req.login) {
    const userResult = await findOneUserByLogin(req.login);
    if (userResult) {
      console.log(userResult.login);

      const results = {
        login: userResult.login,
        languageData: langIndex != null ? aboutLangData[langIndex] : null,
      };

      res.status(200).send(results);
    } else {
      res.status(404).send("Nie znaleziono użytkownika"); //Later to be closely examined (maybe change the status code)
    }
  } else if (!req.login) {
    res.status(200).send({
      message: "Nie zalogowany",
      languageData: langIndex != null ? aboutLangData[langIndex] : null,
    });
  }
};

export { getAbout };
