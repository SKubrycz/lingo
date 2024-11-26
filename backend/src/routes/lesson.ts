import express from "express";

import { checkAuth } from "../middleware/auth";
import { getLessonId, postLessonId } from "../controllers/lessonController";

const router = express.Router();

router.get("/lesson/:lessonId/:exerciseId", checkAuth, getLessonId);

router.post("/lesson/:lessonId/:exerciseId", checkAuth, postLessonId);

export default router;
