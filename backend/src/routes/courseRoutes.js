// backend/src/routes/courseRoutes.js
import express from 'express';
import { 
  getEnrolledCourses, 
  getAllCourses, 
  getCourseCategories, 
  getCourseDetails, 
  userEnrollInCourse,
  getCourseVideos,
  generateCourseContent 
} from '../controllers/courseController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/all', getAllCourses);
router.get('/categories', getCourseCategories);
router.get('/enrolled', protect, getEnrolledCourses); 
router.post('/enroll', protect, userEnrollInCourse);
router.get('/:id/videos', getCourseVideos);
router.get('/:id', getCourseDetails);

router.post('/:id/generate-content', protect, generateCourseContent); 

export default router;