import express from "express";
import { registerUser, loginUser, getUserProfile } from "../controllers/authController.js";
import { getAllCourses, createCourse, getCourseById, enrollInCourse } from '../controllers/courseController.js';

import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", protect, getUserProfile); // Only logged-in users

router.route('/profile').get(protect, getUserProfile);
router.route('/courses').get(getAllCourses);
router.route('/courses').post(createCourse);
router.route('/courses/:id').get(getCourseById);
router.route('/enroll').post(protect,enrollInCourse)

router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Welcome Admin" });
});

export default router;
