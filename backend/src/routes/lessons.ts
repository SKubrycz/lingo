import express from "express";

import { checkAuth } from "../middleware/auth";
import { getLessons } from "../controllers/lessonsController";

const router = express.Router();

router.get("/lessons", checkAuth, getLessons);

export default router;
