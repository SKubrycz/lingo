import express from "express";

import { getLogin, postLogin } from "../controllers/loginController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/login", isAuthenticated, getLogin);

router.post("/login", postLogin);

export default router;
