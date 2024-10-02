import express from "express";
import {
  register,
  login,
  logout,
  getMyProfile,
  getAdmins,
} from "../controller/user.controller.js";
import { isAuthenticated, isAdmin } from "../middleware/authUser.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", isAuthenticated, logout);
router.get("/getmyprofile", isAuthenticated, getMyProfile);
router.get("/admins", getAdmins);
export default router;
