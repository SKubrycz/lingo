import express from "express";

import { checkAuth } from "../middleware/auth";
import {
  getDeleteAccount,
  postDeleteAccount,
  postPrepareDelete,
} from "../controllers/deleteAccountController";

const router = express.Router();

router.post("/delete-account", checkAuth, postPrepareDelete);

router.get("/delete-account/:deleteId", checkAuth, getDeleteAccount);
router.post("/delete-account/:deleteId", checkAuth, postDeleteAccount);

export default router;
