import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import chatbotRoutes from './src/routes/chatbot.js';
import voiceAssistantRoutes from './src/routes/voiceAssistant.js';
import adminRoutes from './src/routes/adminRoutes.js';
import courseRoutes from './src/routes/courseRoutes.js';
import assessmentRoutes from './src/routes/assessmentRoutes.js';
dotenv.config();
connectDB();


const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/courses', courseRoutes);

app.use("/api/auth", authRoutes);
app.use('/api/chatbot', chatbotRoutes);

console.log("Attempting to register voice assistant routes."); // <--- ADD THIS
console.log("voiceAssistantRoutes object:", voiceAssistantRoutes);
app.use('/api/voice-command', voiceAssistantRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/assessments', assessmentRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server running on port ${process.env.PORT || 5000}`);
});
