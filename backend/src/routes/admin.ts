import express from "express";

import { checkAuth, isAdmin, isAdminWithCode } from "../middleware/auth";
import {
  getAdminController,
  getAdminPanelController,
  getAdminPanelLessonsController,
  getAdminPanelSubpagesController,
  getAdminPanelSubpagesEditController,
  postAdminController,
  postAdminLogoutController,
  postAdminPanelSubpagesAddController,
  putAdminPanelSubpagesEditController,
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
router.get("/admin/panel/subpages/edit", getAdminPanelSubpagesEditController);

router.post("/admin", checkAuth, isAdmin, postAdminController);
router.post(
  "/admin/panel/subpages/add",
  checkAuth,
  isAdmin,
  postAdminPanelSubpagesAddController
);
router.post("/admin/logout", checkAuth, isAdmin, postAdminLogoutController);

router.put(
  "/admin/panel/subpages/edit",
  checkAuth,
  isAdmin,
  putAdminPanelSubpagesEditController
);

export default router;
