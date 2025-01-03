import express from "express";

import { checkAuth, isAdmin, isAdminWithCode } from "../middleware/auth";
import {
  getAdminController,
  getAdminPanelController,
  getAdminPanelLessonsController,
  getAdminPanelSubpagesController,
  postAdminController,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin", checkAuth, isAdmin, getAdminController);
router.get("/admin/panel", checkAuth, isAdminWithCode, getAdminPanelController);
router.get(
  "/admin/panel/subpages",
  checkAuth,
  isAdminWithCode,
  getAdminPanelSubpagesController
);
router.get(
  "/admin/panel/lessons",
  checkAuth,
  isAdminWithCode,
  getAdminPanelLessonsController
);

router.post("/admin", checkAuth, isAdmin, postAdminController);

export default router;
