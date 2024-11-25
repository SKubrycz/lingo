import express from "express";

import { getLogin, postLogin } from "../controllers/loginController";

const router = express.Router();

router.get("/login", getLogin);

router.post("/login", postLogin);

export default router;
