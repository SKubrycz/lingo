import { Response } from "express";
import { RequestLogin } from "../middleware/auth";

const getAdminController = async (req: RequestLogin, res: Response) => {
  console.log("---> get admin route");

  return res.status(200).send({ message: "Zapewniono dostęp do treści" });
};

export { getAdminController };
