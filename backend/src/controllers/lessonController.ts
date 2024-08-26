import { Request, Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { findOneUserByLogin, findLessons } from "../assets/queries";

const getLessonId = async (req: RequestLogin, res: Response) => {
  const id = await req.params.id;

  if (!id) return res.status(404).send("Nie znaleziono lekcji");
  else {
    // Later to be replaced by database lesson information
    return res.status(200).send({ lessonId: id });
  }
};

export { getLessonId };
