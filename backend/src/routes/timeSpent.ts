import express from "express";

import { putTimeSpent } from "../controllers/timeSpentController";
import { checkAuth } from "../middleware/auth";

const router = express.Router();

router.put("/timespent/:lessonId", checkAuth, putTimeSpent);

export default router;
