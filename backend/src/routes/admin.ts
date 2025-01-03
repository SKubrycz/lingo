import express from "express";

import { checkAuth, isAdmin, isAdminWithCode } from "../middleware/auth";
import {
  getAdminController,
  getAdminPanelController,
  postAdminController,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin", checkAuth, isAdmin, getAdminController);
router.get("/admin/panel", checkAuth, isAdminWithCode, getAdminPanelController);

router.post("/admin", checkAuth, isAdmin, postAdminController);

export default router;
