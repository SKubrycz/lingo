import express from "express";

import { postTimeSpent } from "../controllers/timeSpentController";
import { checkAuth } from "../middleware/auth";

const router = express.Router();

router.post("/timespent/:lessonId", checkAuth, postTimeSpent);

export default router;
