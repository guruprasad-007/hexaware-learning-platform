// backend/src/controllers/courseController.js

import { getVideosByQuery } from '../services/youtubeService.js';
import * as aiService from '../services/aiService.js'; 
import mongoose from "mongoose";

export const getEnrolledCourses = async (req, res) => {
    const userId = req.user._id;

    try {
      const User = (await import("../models/User.js")).default; 
      const userWithCourses = await User.findById(userId).populate("enrolledCourses");
      if (!userWithCourses) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(userWithCourses.enrolledCourses);
    } catch (error) {
      console.error("Error fetching enrolled courses:", error);
      res.status(500).json({ message: "Error fetching enrolled courses", error: error.message });
    }
};

export const getAllCourses = async (req, res) => {
    try {
        const Course = (await import("../models/Course.js")).default; 
        const courses = await Course.find({}); 
        res.status(200).json(courses);
    } catch (error) {
        console.error("Error in getAllCourses:", error); 
        res.status(500).json({ message: "Error fetching courses", error: error.message });
    }
};

export const getCourseCategories = async (req, res) => {
    try {
        const Course = (await import("../models/Course.js")).default; 
        const categories = await Course.distinct('category');
        res.status(200).json(categories);
    } catch (error) {
        console.error("Error fetching categories:", error); 
        res.status(500).json({ message: "Error fetching categories", error: error.message });
    }
};

export const getCourseDetails = async (req, res) => {
    try {
        const courseId = req.params.id;

        if (!mongoose.isValidObjectId(courseId)) {
            return res.status(404).json({ message: "Invalid course ID" });
        }

        const Course = (await import("../models/Course.js")).default; 
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        console.error("Error fetching course details:", error);
        res.status(500).json({ message: "Error fetching course details", error: error.message });
    }
};

export const userEnrollInCourse = async (req, res) => {
    const { courseId } = req.body;
    const userId = req.user._id;

    try {
        const User = (await import("../models/User.js")).default; 
        const Course = (await import("../models/Course.js")).default; 

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const course = await Course.findById(courseId);
        if (!course) return res.status(404).json({ message: "Course not found" });

        if (user.enrolledCourses.includes(courseId)) {
            return res.status(400).json({ message: "User is already enrolled in this course" });
        }

        user.enrolledCourses.push(courseId);
        await user.save();

        res.status(200).json({ message: "Successfully enrolled in the course" });
    } catch (error) {
        console.error("Error enrolling user:", error);
        res.status(500).json({ message: "Error enrolling user", error: error.message });
    }
};

export const getCourseVideos = async (req, res) => {
    const { id } = req.params;
    try {
        const Course = (await import("../models/Course.js")).default; 
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const videoUrls = await getVideosByQuery(course.title, course.lessons);
        res.json(videoUrls);
    } catch (error) {
        console.error("Error fetching course videos:", error);
        res.status(500).json({ message: error.message });
    }
};

export const generateCourseContent = async (req, res) => {
    const { id } = req.params;

    try {
        const Course = (await import("../models/Course.js")).default; 
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        const numLessons = course.lessons || 3; // Use course.lessons or default to 3
        if (numLessons <= 0) {
            return res.status(400).json({ message: "Course has no lessons specified to generate content for." });
        }

        // Clear existing generated content before regenerating
        course.generatedLessonContent = []; 

        // Loop based on the 'lessons' count, not the 'modules' array
        for (let i = 1; i <= numLessons; i++) {
            const lessonTitle = `${course.title} - Lesson ${i}`; // Dynamic title for video/quiz query
            let lessonContent = {
                lessonNumber: i,
                title: lessonTitle,
                youtubeVideo: {},
                quiz: {}
            };

            // 1. Fetch a video from YouTube
            try {
                const videos = await getVideosByQuery(lessonTitle, 1); 
                if (videos && videos.length > 0) {
                    const bestVideo = videos[0]; 
                    lessonContent.youtubeVideo = {
                        videoId: bestVideo.videoId,
                        title: bestVideo.title,
                        description: bestVideo.description,
                        thumbnail: bestVideo.thumbnail,
                        channelTitle: bestVideo.channelTitle,
                        embedUrl: `https://www.youtube.com/embed/${bestVideo.videoId}`,
                        duration: bestVideo.duration 
                    };
                }
            } catch (videoError) {
                console.error(`Error fetching video for lesson '${lessonTitle}':`, videoError.message);
            }

            // 2. Generate a quiz using aiService's generateQuiz
            try { 
                const quizQuestions = await aiService.generateQuiz(lessonTitle); 
                if (quizQuestions && quizQuestions.length > 0) {
                    lessonContent.quiz = {
                        questions: quizQuestions,
                        isGenerated: true
                    };
                } else {
                    lessonContent.quiz = { questions: [], isGenerated: false };
                }
            } catch (quizError) {
                console.error(`Error generating quiz for lesson '${lessonTitle}':`, quizError.message);
                lessonContent.quiz = { questions: [], isGenerated: false };
            }

            course.generatedLessonContent.push(lessonContent);
        }
        
        course.youtubeVideosGenerated = true;
        course.lastYouTubeSync = new Date();

        const updatedCourse = await course.save();
        
        res.status(200).json({ 
            message: "Course content generated successfully!", 
            course: updatedCourse
        });

    } catch (error) {
        console.error("Error generating course content:", error);
        res.status(500).json({ 
            message: "Failed to generate course content", 
            error: error.message
        });
    }
};
