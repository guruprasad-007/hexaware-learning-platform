// frontend/src/pages/DashboardPage.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Star, Award, Flame, BookCheck, Gauge, User, Play, Clock, ArrowRight, TrendingUp, Calendar, Target, ChevronRight } from "lucide-react";
import api from '../services/api';

// Custom Progress Component with enhanced animations
const Progress = ({ value }) => (
  <div className="w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-full h-3 mt-3 relative overflow-hidden shadow-inner">
    <div 
      className="bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500 h-3 rounded-full transition-all duration-1500 ease-out relative shadow-lg"
      style={{ width: `${value}%` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
      <div className="absolute right-1 top-1/2 transform -translate-y-1/2 w-1 h-1 bg-white/80 rounded-full animate-pulse"></div>
    </div>
  </div>
);

// Enhanced Stats Card Component
const StatCard = ({ icon: Icon, value, label, color, delay, onClick }) => (
  <div 
    className={`group relative bg-gradient-to-br ${color} backdrop-blur-lg p-6 rounded-2xl shadow-lg hover:shadow-2xl border border-white/20 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up cursor-pointer overflow-hidden`}
    style={{ animationDelay: `${delay}ms` }}
    onClick={onClick}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Floating particles */}
    <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
    <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-700"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center space-y-3">
      <div className="relative">
        <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm">
          <Icon className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-bounce transition-all duration-500" />
        </div>
        <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg group-hover:animate-pulse"></div>
      </div>
      
      <div className="space-y-1">
        <p className="text-2xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {value}
        </p>
        <p className="text-sm text-white/90 font-medium group-hover:text-white transition-colors duration-300">
          {label}
        </p>
      </div>
      
      {/* Hover indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ChevronRight className="w-4 h-4 text-white/80" />
      </div>
    </div>
  </div>
);

// Enhanced Course Card Component
const CourseCard = ({ course, index, onClick, prediction }) => (
  <div
    className="group relative bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 animate-fade-in-up border border-white/30 cursor-pointer overflow-hidden"
    style={{ animationDelay: `${index * 150}ms` }}
    onClick={onClick}
  >
    {/* Gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
    
    {/* Course Image with enhanced effects */}
    <div className="relative rounded-t-2xl h-48 w-full overflow-hidden">
      <img
        src={course.image}
        alt={course.title || 'Course'}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format';
        }}
      />
      
      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Enhanced badges */}
      <div className="absolute top-4 left-4">
        <div className="bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg border border-purple-200/50">
          {course.category}
        </div>
      </div>
      
      <div className="absolute top-4 right-4">
        {course.progress > 0 && (
          <div className="bg-gradient-to-r from-emerald-400 to-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
            {course.progress}%
          </div>
        )}
      </div>

      {/* Status indicator */}
      <div className="absolute bottom-4 left-4">
        {course.progress === 100 ? (
          <div className="flex items-center gap-2 bg-emerald-500/95 backdrop-blur-sm text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg">
            <BookCheck className="w-4 h-4" />
            Completed
          </div>
        ) : course.progress > 0 ? (
          <div className="flex items-center gap-2 bg-blue-500/95 backdrop-blur-sm text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg">
            <Play className="w-4 h-4" />
            Continue
          </div>
        ) : (
          <div className="flex items-center gap-2 bg-orange-500/95 backdrop-blur-sm text-white text-sm font-semibold px-3 py-2 rounded-full shadow-lg">
            <Star className="w-4 h-4" />
            Start Now
          </div>
        )}
      </div>
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform duration-300">
          <Play className="w-8 h-8 text-white drop-shadow-lg" />
        </div>
      </div>
    </div>

    {/* Course content */}
    <div className="p-6 space-y-4">
      {/* Title and level */}
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 leading-tight flex-1 pr-2">
          {course.title || 'Course Title'}
        </h4>
        <span className={`text-xs font-semibold px-3 py-1.5 rounded-full whitespace-nowrap ${
          course.level === 'Beginner' ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' :
          course.level === 'Intermediate' ? 'bg-amber-100 text-amber-700 border border-amber-200' :
          'bg-red-100 text-red-700 border border-red-200'
        }`}>
          {course.level}
        </span>
      </div>

      {/* Duration */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <Clock className="w-4 h-4 text-purple-500" />
        <span className="font-medium">{course.duration}</span>
      </div>

      {/* Progress section */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm font-semibold text-gray-700">Learning Progress</span>
          <span className="text-sm font-bold text-purple-600">{course.progress}%</span>
        </div>
        <Progress value={course.progress} />
      </div>

      {/* Prediction Display with enhanced styling */}
      {prediction && (
        <div className="mt-5 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200/50 shadow-inner">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-blue-800 text-sm mb-1">AI Performance Insight</p>
              <p className="text-blue-700 text-sm leading-relaxed">{prediction.prediction}</p>
              {prediction.averageScore !== "N/A" && (
                <p className="mt-2 text-xs text-blue-600 font-medium">
                  Average Quiz Score: <span className="font-bold">{prediction.averageScore}%</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Action button */}
      <div className="pt-2">
        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold py-3 rounded-xl hover:from-purple-600 hover:to-indigo-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
          {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coursePredictions, setCoursePredictions] = useState({});

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  const completedCoursesCount = enrolledCourses.filter(course => course.progress === 100).length;
  const currentUserPoints = 75;

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate("/login");
          return;
        }
        
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const userResponse = await api.get('/auth/profile', config);
        setUser(userResponse.data);

        const coursesResponse = await api.get('/courses/enrolled', config);
        const formattedCourses = coursesResponse.data.map(course => ({
          ...course,
          progress: Math.floor(Math.random() * 101), 
          type: "ongoing", 
          category: course.category || "General", 
          level: "Intermediate", 
          duration: course.duration || "N/A", 
          image: course.imageUrl || "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&auto=format",
        }));
        setEnrolledCourses(formattedCourses);

        const predictions = {};
        for (const course of formattedCourses) {
            try {
                if (course._id) { 
                    const predictionResponse = await api.get(`/assessments/prediction/${course._id}`, config);
                    predictions[course._id] = predictionResponse.data;
                }
            } catch (predError) {
                console.warn(`Could not fetch prediction for course ${course.title}:`, predError.response?.data?.message || predError.message);
                predictions[course._id] = { prediction: "No data for prediction.", averageScore: "N/A" };
            }
        }
        setCoursePredictions(predictions);

      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login"); 
        } else {
          setError("Failed to fetch dashboard data. Please try again.");
        }
      } finally {
        setLoading(false); 
      }
    };
    
    fetchDashboardData();
  }, [navigate]); 

  const filteredCourses = filter === "all" 
    ? enrolledCourses 
    : enrolledCourses.filter((course) => course.type === filter);

  if (loading) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600 mx-auto"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-2 border-purple-300 opacity-20"></div>
            </div>
            <p className="text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="bg-white/80 backdrop-blur-lg border border-red-200 text-red-700 px-6 py-8 rounded-2xl shadow-lg">
              <div className="text-4xl mb-4">⚠️</div>
              <p className="font-semibold mb-4">Error: {error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse-gentle"></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Enhanced Welcome Section */}
          <div className="mb-10">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-up">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
                <div className="flex flex-col lg:flex-row items-center justify-between">
                  <div className="flex items-center space-x-6 mb-6 lg:mb-0">
                    {/* Enhanced Avatar */}
                    <div className="relative">
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl transform hover:scale-110 hover:rotate-6 transition-all duration-500">
                        <User className="w-10 h-10 text-white drop-shadow-lg" />
                      </div>
                      
                      {/* Status indicators */}
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-3 border-white animate-pulse flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      
                      {/* Floating rings */}
                      <div className="absolute inset-0 w-20 h-20 border-2 border-white/30 rounded-2xl animate-spin-slow"></div>
                      <div className="absolute -inset-2 w-24 h-24 border border-white/20 rounded-2xl animate-pulse"></div>
                    </div>

                    <div className="text-center lg:text-left">
                      <h1 className="text-3xl lg:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                        Welcome back, <span className="animate-gradient-text">{user?.fullName || user?.name || 'User'}</span>!
                      </h1>
                      <p className="text-white/90 text-lg font-medium">Ready to continue your learning journey?</p>
                    </div>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="group bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white font-semibold px-6 py-3 rounded-xl border border-white/30 hover:border-white/50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    <span className="group-hover:animate-pulse">Sign Out</span>
                  </button>
                </div>
              </div>

              {/* Stats Grid with enhanced design */}
              <div className="p-8">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatCard
                    icon={Gauge}
                    value={`${currentUserPoints}/100`}
                    label="Learning Points"
                    color="from-blue-500/90 to-indigo-600/90"
                    delay={0}
                  />
                  <StatCard
                    icon={Award}
                    value="3"
                    label="Badges Earned"
                    color="from-purple-500/90 to-violet-600/90"
                    delay={200}
                  />
                  <StatCard
                    icon={Flame}
                    value="7 Days"
                    label="Current Streak"
                    color="from-orange-500/90 to-red-500/90"
                    delay={400}
                  />
                  <StatCard
                    icon={BookCheck}
                    value={completedCoursesCount}
                    label="Completed Courses"
                    color="from-emerald-500/90 to-green-600/90"
                    delay={600}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Learning Journey Section */}
          <div className="mb-10">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 animate-fade-in-up delay-300">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Your Learning <span className="animate-gradient-text">Journey</span>
                </h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Updated today</span>
                </div>
              </div>
              
              {/* Enhanced Filter Tabs */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["all", "ongoing", "completed", "popular"].map((tab, index) => (
                  <button
                    key={tab}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up ${
                      filter === tab
                        ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg border-2 border-transparent"
                        : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md border-2 border-gray-200/50 hover:border-purple-300"
                    }`}
                    onClick={() => setFilter(tab)}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>

              {/* Enhanced Course Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course._id || index}
                    course={course}
                    index={index}
                    onClick={() => navigate(`/courses/${course._id}`)}
                    prediction={coursePredictions[course._id]}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Side by Side Layout for Achievements and Activity */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
            
            {/* Enhanced Achievements Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 animate-fade-in-up delay-500">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { emoji: "🏅", text: "Top Learner", subtitle: "Ranked #1 this month", delay: "0" },
                  { emoji: "📚", text: "Course Explorer", subtitle: "Enrolled in 5+ courses", delay: "200" },
                  { emoji: "⏰", text: "Time Master", subtitle: "50+ hours learned", delay: "400" }
                ].map((achievement, index) => (
                  <div 
                    key={index}
                    className="group bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-300 animate-fade-in-up border border-gray-200/50"
                    style={{ animationDelay: `${achievement.delay}ms` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-3xl group-hover:animate-bounce transition-all duration-300">
                        {achievement.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                          {achievement.text}
                        </p>
                        <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                          {achievement.subtitle}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Enhanced Recent Activity Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-8 animate-fade-in-up delay-700">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Recent Activity</h3>
              </div>
              
              <div className="space-y-4">
                {[
                  { color: "purple", icon: BookCheck, text: 'Completed "React Mastery" module', time: "2 hours ago", delay: "0" },
                  { color: "blue", icon: Target, text: 'Attempted "AWS Quiz" - 85% score', time: "Yesterday", delay: "200" },
                  { color: "green", icon: Play, text: 'Started "MongoDB Basics" course', time: "3 days ago", delay: "400" }
                ].map((activity, index) => (
                  <div 
                    key={index}
                    className={`group relative pl-6 py-4 border-l-4 ${
                      activity.color === 'purple' ? 'border-purple-500 bg-purple-50/50' :
                      activity.color === 'blue' ? 'border-blue-500 bg-blue-50/50' :
                      'border-green-500 bg-green-50/50'
                    } rounded-r-xl transform hover:translate-x-2 transition-all duration-300 animate-fade-in-up hover:shadow-lg`}
                    style={{ animationDelay: `${activity.delay}ms` }}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        activity.color === 'purple' ? 'bg-purple-100' :
                        activity.color === 'blue' ? 'bg-blue-100' :
                        'bg-green-100'
                      }`}>
                        <activity.icon className={`w-4 h-4 ${
                          activity.color === 'purple' ? 'text-purple-600' :
                          activity.color === 'blue' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800 group-hover:text-gray-900 transition-colors duration-300">
                          {activity.text}
                        </p>
                        <span className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors duration-300">
                          {activity.time}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Custom CSS */}
        <style jsx>{`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          
          @keyframes float-reverse {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(20px) rotate(-5deg); }
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
          
          .animate-gradient-text {
            background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
            background-size: 400% 400%;
            animation: gradient-text 4s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          @keyframes gradient-text {
            0%, 100% {
              background-position: 0% 50%;
            }
            50% {
              background-position: 100% 50%;
            }
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

          /* Enhanced glass morphism effects */
          .glass-effect {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
          }

          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: rgba(147, 51, 234, 0.5);
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: rgba(147, 51, 234, 0.7);
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}