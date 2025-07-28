import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, Award, Flame, BookCheck, Gauge, User, Play, Clock, ArrowRight } from "lucide-react";

// Custom Progress Component
const Progress = ({ value }) => (
  <div className="w-full bg-gray-200 rounded-full h-2 mt-2 relative overflow-hidden">
    <div 
      className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full transition-all duration-1000 ease-out relative"
      style={{ width: `${value}%` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
    </div>
  </div>
);
import Header from "../components/common/Header";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const allCourses = [
    { 
      id: 1, 
      title: "React Mastery", 
      progress: 80, 
      type: "ongoing",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&auto=format",
      category: "Frontend",
      level: "Intermediate",
      duration: "12 hrs"
    },
    { 
      id: 2, 
      title: "AWS Essentials", 
      progress: 45, 
      type: "ongoing",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
      category: "Cloud & DevOps",
      level: "Beginner",
      duration: "20 hrs"
    },
    { 
      id: 3, 
      title: "MongoDB Basics", 
      progress: 100, 
      type: "completed",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&auto=format",
      category: "Backend",
      level: "Beginner",
      duration: "8 hrs"
    },
    { 
      id: 4, 
      title: "JavaScript Deep Dive", 
      progress: 100, 
      type: "completed",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&auto=format",
      category: "Web Development",
      level: "Advanced",
      duration: "15 hrs"
    },
    { 
      id: 5, 
      title: "DevOps Fundamentals", 
      progress: 0, 
      type: "popular",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop&auto=format",
      category: "DevOps",
      level: "Intermediate",
      duration: "16 hrs"
    },
    { 
      id: 6, 
      title: "Python for Data Science", 
      progress: 20, 
      type: "popular",
      image: "https://images.unsplash.com/photo-1526379879981-0f0a5a34bdb6?w=400&h=250&fit=crop&auto=format",
      category: "Data Science",
      level: "Intermediate",
      duration: "22 hrs"
    },
  ];

  const completedCoursesCount = allCourses.filter(course => course.progress === 100).length;
  const currentUserPoints = 75;

  const filteredCourses =
    filter === "all"
      ? allCourses
      : allCourses.filter((course) => course.type === filter);

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-300/5 to-pink-300/5 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <div className="relative z-10">
          {/* Profile Card */}
          <div className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 mb-8 flex flex-col md:flex-row md:items-start justify-between animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-grow mb-6 md:mb-0">
              
              {/* Animated Profile Avatar */}
              <div className="relative animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 hover:rotate-12 transition-all duration-300 animate-pulse-gentle">
                  <User className="w-8 h-8 text-white animate-bounce-gentle" />
                  
                  {/* Floating particles around avatar */}
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-ping"></div>
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-green-400 rounded-full animate-pulse delay-500"></div>
                  <div className="absolute top-1/2 -right-2 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-1000"></div>
                </div>
                
                {/* Animated ring around avatar */}
                <div className="absolute inset-0 w-16 h-16 border-2 border-purple-300/30 rounded-full animate-spin-slow"></div>
                <div className="absolute inset-0 w-16 h-16 border border-indigo-200/40 rounded-full animate-ping"></div>
              </div>

              <div className="text-center sm:text-left flex-grow">
                <h2 className="text-2xl font-bold text-purple-800 animate-gradient-text">
                  John Kevin
                </h2>

                {/* Stats Grid with Enhanced Animations */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  
                  {/* Current Points Card */}
                  <div className="group bg-gradient-to-br from-blue-50/80 to-indigo-50/80 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center text-center border border-blue-200/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-200">
                    <div className="relative">
                      <Gauge className="w-10 h-10 text-blue-600 mb-1 group-hover:animate-spin transition-all duration-500" />
                      <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-lg group-hover:animate-pulse"></div>
                    </div>
                    <p className="font-semibold text-gray-700 text-lg group-hover:text-blue-700 transition-colors duration-300">
                      {currentUserPoints}/100
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                      Current Points
                    </p>
                  </div>

                  {/* Badges Card */}
                  <div className="group bg-gradient-to-br from-purple-50/80 to-pink-50/80 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center text-center border border-purple-200/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-400">
                    <div className="relative">
                      <Award className="w-10 h-10 text-purple-600 mb-1 group-hover:animate-bounce transition-all duration-500" />
                      <div className="absolute inset-0 bg-purple-400/20 rounded-full blur-lg group-hover:animate-pulse"></div>
                    </div>
                    <p className="font-semibold text-gray-700 text-lg group-hover:text-purple-700 transition-colors duration-300">3</p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Badges Earned</p>
                  </div>

                  {/* Streak Card */}
                  <div className="group bg-gradient-to-br from-orange-50/80 to-red-50/80 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center text-center border border-orange-200/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-600">
                    <div className="relative">
                      <Flame className="w-10 h-10 text-orange-500 mb-1 group-hover:animate-wiggle transition-all duration-500" />
                      <div className="absolute inset-0 bg-orange-400/20 rounded-full blur-lg group-hover:animate-pulse"></div>
                    </div>
                    <p className="font-semibold text-gray-700 text-lg group-hover:text-orange-700 transition-colors duration-300">7 Days</p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Current Streak</p>
                  </div>

                  {/* Completed Courses Card */}
                  <div className="group bg-gradient-to-br from-green-50/80 to-emerald-50/80 backdrop-blur-sm p-5 rounded-xl shadow-md hover:shadow-lg flex flex-col items-center justify-center text-center border border-green-200/30 transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-fade-in-up delay-800">
                    <div className="relative">
                      <BookCheck className="w-10 h-10 text-green-600 mb-1 group-hover:animate-bounce-gentle transition-all duration-500" />
                      <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg group-hover:animate-pulse"></div>
                    </div>
                    <p className="font-semibold text-gray-700 text-lg group-hover:text-green-700 transition-colors duration-300">
                      {completedCoursesCount}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors duration-300">Courses Completed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="group mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 self-end md:self-start animate-fade-in-up delay-1000"
            >
              <span className="group-hover:animate-pulse">Logout</span>
            </button>
          </div>

          {/* Your Learning Journey */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 mb-10 animate-fade-in-up delay-300">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 animate-gradient-text">
              Your Learning Journey
            </h3>
            
            <div className="flex space-x-4 mb-6">
              {["all", "ongoing", "completed", "popular"].map((tab, index) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 ${
                    filter === tab
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg animate-pulse-gentle"
                      : "bg-gray-200/80 backdrop-blur-sm text-gray-700 hover:bg-gray-300/80 hover:shadow-md"
                  }`}
                  onClick={() => setFilter(tab)}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div
                  key={course.id}
                  className="group bg-gradient-to-br from-gray-50/80 to-gray-100/80 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up border border-white/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Course Image with Enhanced Overlay Effects */}
                  <div className="relative rounded-lg h-40 w-full mb-4 overflow-hidden group-hover:scale-105 transition-transform duration-500">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    
                    {/* Multi-layer Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Progress Badge */}
                    {course.progress > 0 && (
                      <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-gray-700 text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                        {course.progress}%
                      </div>
                    )}

                    {/* Category Badge */}
                    <div className="absolute top-3 left-3 bg-purple-600/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                      {course.category}
                    </div>

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-5 h-5 text-purple-600 ml-0.5" />
                      </div>
                    </div>

                    {/* Status Indicator */}
                    <div className="absolute bottom-3 left-3">
                      {course.progress === 100 ? (
                        <div className="flex items-center gap-1 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          <BookCheck className="w-3 h-3" />
                          Complete
                        </div>
                      ) : course.progress > 0 ? (
                        <div className="flex items-center gap-1 bg-blue-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          <Clock className="w-3 h-3" />
                          In Progress
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 bg-orange-500/90 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          <Star className="w-3 h-3" />
                          Popular
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors duration-300 leading-tight">
                        {course.title}
                      </h4>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                        course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {course.level}
                      </span>
                    </div>

                    {/* Duration */}
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progress</span>
                        <span className="text-sm font-semibold text-gray-700">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} />
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-medium text-sm shadow-md hover:shadow-lg transform hover:scale-105 group/button">
                      <span className="flex items-center justify-center gap-2">
                        {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 mb-10 animate-fade-in-up delay-500">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 animate-gradient-text">
              Additional Achievements
            </h3>
            <div className="flex flex-wrap gap-4">
              {[
                { emoji: "🏅", text: "Top Learner", delay: "0" },
                { emoji: "📚", text: "5 Courses", delay: "200" },
                { emoji: "⏰", text: "50 Hours", delay: "400" }
              ].map((achievement, index) => (
                <div 
                  key={index}
                  className="group bg-gradient-to-br from-gray-100/80 to-gray-200/80 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg w-40 text-center transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${achievement.delay}ms` }}
                >
                  <div className="text-2xl mb-2 group-hover:animate-bounce transition-all duration-300">
                    {achievement.emoji}
                  </div>
                  <p className="font-medium group-hover:text-indigo-700 transition-colors duration-300">
                    {achievement.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="animate-fade-in-up delay-700">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 animate-gradient-text">
              Recent Activity
            </h3>
            <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 space-y-4 mb-10">
              {[
                { color: "purple", text: 'Completed "React Mastery" module', time: "2 hours ago", delay: "0" },
                { color: "blue", text: 'Attempted "AWS Quiz"', time: "Yesterday", delay: "200" },
                { color: "green", text: 'Joined "MongoDB Basics"', time: "3 days ago", delay: "400" }
              ].map((activity, index) => (
                <div 
                  key={index}
                  className={`group border-l-4 border-${activity.color}-500 pl-4 transform hover:translate-x-2 transition-all duration-300 animate-fade-in-up hover:bg-${activity.color}-50/30 rounded-r-lg py-2`}
                  style={{ animationDelay: `${activity.delay}ms` }}
                >
                  <p className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors duration-300">
                    {activity.text}
                  </p>
                  <span className="text-xs text-gray-400 group-hover:text-gray-500 transition-colors duration-300">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(-5deg); }
          }
          
          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.3; }
          }
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
          }
          
          @keyframes wiggle {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(3deg); }
            75% { transform: rotate(-3deg); }
          }
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradient-x {
            0%, 100% {
              transform: translateX(0%);
            }
            50% {
              transform: translateX(100%);
            }
          }
          
          @keyframes gradient-text {
            0%, 100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }
          
          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          .animate-float-slow {
            animation: float-slow 6s ease-in-out infinite;
          }
          
          .animate-float-reverse {
            animation: float-reverse 8s ease-in-out infinite;
          }
          
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 4s ease-in-out infinite;
          }
          
          .animate-bounce-gentle {
            animation: bounce-gentle 3s ease-in-out infinite;
          }
          
          .animate-wiggle {
            animation: wiggle 2s ease-in-out infinite;
          }
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .animate-gradient-x {
            animation: gradient-x 15s ease infinite;
          }
          
          .animate-gradient-text {
            background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
            background-size: 400% 400%;
            animation: gradient-text 4s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          .animate-shimmer {
            animation: shimmer 2s infinite;
          }
          
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
          
          .delay-200 { animation-delay: 200ms; }
          .delay-300 { animation-delay: 300ms; }
          .delay-400 { animation-delay: 400ms; }
          .delay-500 { animation-delay: 500ms; }
          .delay-600 { animation-delay: 600ms; }
          .delay-700 { animation-delay: 700ms; }
          .delay-800 { animation-delay: 800ms; }
          .delay-1000 { animation-delay: 1000ms; }
        `}</style>
      </div>
    </>
  );
};

export default DashboardPage;