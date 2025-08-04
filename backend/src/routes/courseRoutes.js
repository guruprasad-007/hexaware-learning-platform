// backend/src/routes/courseRoutes.js
import express from 'express';
import { getEnrolledCourses, getAllCourses, getCourseCategories, getCourseDetails, userEnrollInCourse } from '../controllers/courseController.js';
import { protect } from '../middleware/auth.js';


const router = express.Router();

router.get('/all', getAllCourses);
router.get('/categories', getCourseCategories);
router.get('/enrolled', protect, getEnrolledCourses);
router.post('/enroll', protect, userEnrollInCourse); // Ensure this route is present if not already
router.get('/:id', getCourseDetails); // <--- ADD THIS NEW ROUTE

export default router;