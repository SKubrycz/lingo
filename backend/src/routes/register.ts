import express from "express";

import { postRegister } from "../controllers/registerController";

const router = express.Router();

router.post("/register", postRegister);

export default router;
