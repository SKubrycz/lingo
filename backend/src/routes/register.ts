import express from "express";

import { getRegister, postRegister } from "../controllers/registerController";

const router = express.Router();

router.get("/register", getRegister);

router.post("/register", postRegister);

export default router;
