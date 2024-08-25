import express from "express";
import { checkAuth } from "../middleware/auth";
import { getProfile, getProfileId } from "../controllers/profileController";

const router = express.Router();

router.get("/profile", checkAuth, getProfile);

/* router.get("/profile", isAuthenticated, async (req: Request, res: Response) => {
  try {

    return res.status(200).send("Not found");
  } catch (error) {
    res.status(500).send(`Error /profile ${error}`);
  }
}); */

router.get("/profile/:id", checkAuth, getProfileId);

export default router;
