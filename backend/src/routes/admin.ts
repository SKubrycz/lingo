import express from "express";

import { checkAuth, isAdmin } from "../middleware/auth";
import { getAdminController } from "../controllers/adminController";

const router = express.Router();

router.get("/admin", checkAuth, isAdmin, getAdminController);

export default router;
