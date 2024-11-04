import { Request, Response } from "express";

interface UserTime {
  timeSpent: string;
}

const postTimeSpent = async (req: Request, res: Response) => {
  const { timeSpent } = await req.body;

  console.log(`timeSpent received: ${timeSpent}`);

  return res.status(200).send(`Time spent: ${timeSpent}`);
};

export { postTimeSpent };
