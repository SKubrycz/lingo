import express from "express";
import { getVerify, postVerify } from "../controllers/verifyController";

const router = express.Router();

router.get("/verify/:verifyId", getVerify);
router.post("/verify/:verifyId", postVerify);

export default router;
