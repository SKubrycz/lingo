import express from "express";

import { checkAuth, isAdmin } from "../middleware/auth";
import {
  getAdminController,
  postAdminController,
} from "../controllers/adminController";

const router = express.Router();

router.get("/admin", checkAuth, isAdmin, getAdminController);

router.post("/admin", checkAuth, isAdmin, postAdminController);

export default router;
