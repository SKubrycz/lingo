import { Request, Response } from "express";
import { findOneUserByUUID } from "../assets/queries";

const getVerify = async (req: Request, res: Response) => {
  const { verifyId } = await req.params;

  const result = await findOneUserByUUID(verifyId);
  if (result) {
    console.log(`${verifyId} === ${result.uuid}`);
    return res.status(200).send(`From getVerify: ${verifyId}`);
  } else {
    return res.status(404).send(`No user has ${verifyId}`);
  }
};

export { getVerify };
