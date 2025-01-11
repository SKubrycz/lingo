import express from "express";

import { checkAuth, isAdmin, isAdminWithCode } from "../middleware/auth";
import {
  deleteAdminPanelLessonsCreatorController,
  getAdminController,
  getAdminPanelController,
  getAdminPanelLessonsController,
  getAdminPanelLessonsCreatorController,
  getAdminPanelLessonsEditController,
  getAdminPanelSubpagesController,
  getAdminPanelSubpagesEditController,
  postAdminController,
  postAdminLogoutController,
  postAdminPanelLessonsAddController,
  postAdminPanelLessonsAddLanguageController,
  postAdminPanelLessonsCreatorController,
  postAdminPanelLessonsEditController,
  postAdminPanelSubpagesAddController,
  putAdminPanelLessonsEditController,
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
router.get(
  "/admin/panel/lessons/edit/:lessonId",
  checkAuth,
  isAdminWithCode,
  getAdminPanelLessonsEditController
);
router.get(
  "/admin/panel/lessons/creator/:lessonId/:exerciseId",
  checkAuth,
  isAdminWithCode,
  getAdminPanelLessonsCreatorController
);
router.get(
  "/admin/panel/subpages/edit",
  checkAuth,
  isAdminWithCode,
  getAdminPanelSubpagesEditController
);

router.post("/admin", checkAuth, isAdmin, postAdminController);
router.post(
  "/admin/panel/subpages/add",
  checkAuth,
  isAdminWithCode,
  postAdminPanelSubpagesAddController
);
router.post(
  "/admin/panel/lessons/edit/:lessonId",
  checkAuth,
  isAdminWithCode,
  postAdminPanelLessonsEditController
);
router.post(
  "/admin/panel/lessons/add/:lessonId",
  checkAuth,
  isAdminWithCode,
  postAdminPanelLessonsAddController
);
router.post(
  "/admin/panel/lessons/add/language/:lessonId",
  checkAuth,
  isAdminWithCode,
  postAdminPanelLessonsAddLanguageController
);
router.post(
  "/admin/panel/lessons/creator/:lessonId/:exerciseId",
  checkAuth,
  isAdminWithCode,
  postAdminPanelLessonsCreatorController
);
router.post(
  "/admin/logout",
  checkAuth,
  isAdminWithCode,
  postAdminLogoutController
);

router.put(
  "/admin/panel/subpages/edit",
  checkAuth,
  isAdminWithCode,
  putAdminPanelSubpagesEditController
);
router.put(
  "/admin/panel/lessons/edit/:lessonId",
  checkAuth,
  isAdminWithCode,
  putAdminPanelLessonsEditController
);

router.delete(
  "/admin/panel/lessons/creator/:lessonId/:exerciseId",
  checkAuth,
  isAdminWithCode,
  deleteAdminPanelLessonsCreatorController
);

export default router;
