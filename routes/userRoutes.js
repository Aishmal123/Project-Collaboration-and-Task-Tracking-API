import express from "express";
import {
  LoginUser,
  getCurrentUser,
  RegisterUser,
  updatePassword,
  updateProfile
} from "../controllers/userController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// AUTH
router.post("/register", RegisterUser);
router.post("/login", LoginUser);

// USER
router.get("/gp", authMiddleware, getCurrentUser);
router.put("/profile", authMiddleware, updateProfile);
router.put("/password", authMiddleware, updatePassword);

export default router;