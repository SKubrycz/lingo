import express from "express";

import { postTimeSpent } from "../controllers/timeSpentController";

const router = express.Router();

router.post("/timespent", postTimeSpent);

export default router;
