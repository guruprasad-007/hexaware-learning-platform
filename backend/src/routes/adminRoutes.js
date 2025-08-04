// backend/src/routes/adminRoutes.js
    
import express from 'express';
// Assuming your auth middleware file is named auth.js
import { protect, adminOnly } from '../middleware/auth.js'; 
import { loginAdmin, getDashboardStats, getAllUsers, enrollUserInCourse, getAdminCourses, addCourse } from '../controllers/adminController.js'; 

    
const router = express.Router();
    
// Public route for admin login
router.post('/login', loginAdmin);
    
// Protected routes for admin dashboard data
// These routes are guarded by the 'protect' and 'adminOnly' middleware
router.get('/dashboard-stats', protect, adminOnly, getDashboardStats);
router.get('/users', protect, adminOnly, getAllUsers);
router.post('/enroll-course', protect, adminOnly, enrollUserInCourse);
router.get('/courses', protect, adminOnly, getAdminCourses);
router.post('/courses', protect, adminOnly, addCourse);
export default router;