import express from "express";

import { checkAuth } from "../middleware/auth";
import { getLessonId } from "../controllers/lessonController";

const router = express.Router();

router.get("/lesson/:lessonId/:exerciseId", checkAuth, getLessonId);

export default router;
