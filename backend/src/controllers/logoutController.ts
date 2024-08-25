import { Request, Response } from "express";

const getLogout = async (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  res.status(200).send("Wylogowano");
};

export { getLogout };
