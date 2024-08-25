import express from "express";

import { getLogout } from "../controllers/logoutController";

const router = express.Router();

router.get("/logout", getLogout);

export default router;
