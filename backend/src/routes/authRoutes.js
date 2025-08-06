// backend/src/routes/authRoutes.js (MODIFIED)

import express from 'express';
import { registerUser, login, getUserProfile } from '../controllers/authController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", login);
router.get("/profile", protect, getUserProfile); // Correctly uses 'protect' middleware

// Admin-only protected route
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;