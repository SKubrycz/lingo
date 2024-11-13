import express from "express";
import { getVerify } from "../controllers/verifyController";

const router = express.Router();

router.get("/verify/:verifyId", getVerify);

export default router;
