import express from "express";

import { getRegister, postRegister } from "../controllers/registerController";
import { isAuthenticated } from "../middleware/auth";

const router = express.Router();

router.get("/register", isAuthenticated, getRegister);

router.post("/register", postRegister);

export default router;
