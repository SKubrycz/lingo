import { Request, Response } from "express";

const getLogout = async (req: Request, res: Response) => {
  res.clearCookie("access_token_lingo");
  res.clearCookie("refresh_token_lingo");

  res.status(200).send("Wylogowano");
};

export { getLogout };
