// backend/src/routes/authRoutes.js (MODIFIED)

import express from "express";
import { registerUser, login, getUserProfile } from "../controllers/authController.js"; // <--- CORRECTED IMPORT
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login); // <-- Correctly uses the 'login' function
router.get("/profile", protect, getUserProfile); // Only logged-in users

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;