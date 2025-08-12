import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// IMPORTANT: Import all your Mongoose models here to ensure they are registered
import Course from './src/models/Course.js'; 
import User from './src/models/User.js';   

import compilerRoutes from './src/routes/compilerRoutes.js';
import authRoutes from "./src/routes/authRoutes.js";
import chatbotRoutes from './src/routes/chatbot.js';
import voiceAssistantRoutes from './src/routes/voiceAssistant.js';
import adminRoutes from './src/routes/adminRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import assessmentRoutes from './src/routes/assessmentRoutes.js';
import Assessment from './src/models/Assessment.js'; 
dotenv.config();
connectDB(); // Connect to MongoDB. Models should be imported AFTER DB connection.


const app = express();
app.use(cors());
app.use(express.json());

// Define your API routes
app.use('/api/courses', courseRoutes);
app.use("/api/auth", authRoutes);
app.use('/api/chatbot', chatbotRoutes);

// console.log("Attempting to register voice assistant routes."); // Removed debugging log
// console.log("voiceAssistantRoutes object:", voiceAssistantRoutes); // Removed debugging log
app.use('/api/voice-command', voiceAssistantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assessments', assessmentRoutes);
app.use('/api/compiler', compilerRoutes);
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
