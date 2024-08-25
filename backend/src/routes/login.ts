import express from "express";

import { postLogin } from "../controllers/loginController";

const router = express.Router();

router.post("/login", postLogin);

export default router;
