import { Request, Response } from "express";

import { updateLessonTimeSpent } from "../assets/queries";
import { RequestLogin } from "../middleware/auth";

interface UserTime {
  timeSpent: string;
}

const putTimeSpent = async (req: RequestLogin, res: Response) => {
  const params = await req.params;
  const { timeSpent } = await req.body;

  console.log(`timeSpent received: ${timeSpent} on lesson: ${params.lessonId}`);

  const result = await updateLessonTimeSpent(
    req._id,
    Number(params.lessonId),
    Number(timeSpent)
  );

  return res.status(200).send(`Time spent: ${timeSpent}`);
};

export { putTimeSpent };
