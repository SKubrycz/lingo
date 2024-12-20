import express from "express";

import { checkAuth } from "../middleware/auth";
import {
  getLessonId,
  postLessonId,
  postExerciseAnswer,
} from "../controllers/lessonController";

const router = express.Router();

router.get("/lesson/:lessonId/:exerciseId", checkAuth, getLessonId);

router.post("/lesson/:lessonId/:exerciseId", checkAuth, postLessonId);

router.post(
  "/lesson/:lessonId/:exerciseId/checkword",
  checkAuth,
  postExerciseAnswer
);

export default router;
