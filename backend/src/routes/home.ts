import express, { Router } from "express";
import { isAuthenticated } from "../middleware/auth";

import { getHome } from "../controllers/homeController";

const router: Router = express.Router();

router.get("/", isAuthenticated, getHome);

export default router;
