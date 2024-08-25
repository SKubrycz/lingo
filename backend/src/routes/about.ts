import express, { Response } from "express";

import { RequestLogin } from "../middleware/auth";
import { isAuthenticated } from "../middleware/auth";

import { getAbout } from "../controllers/aboutController";

const router = express.Router();

router.get("/about", isAuthenticated, getAbout);

export default router;
