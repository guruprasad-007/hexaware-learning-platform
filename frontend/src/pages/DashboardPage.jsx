import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Star, Award, Flame, BookCheck, Gauge, User, Play, Clock, ArrowRight } from "lucide-react";
import Header from "../components/common/Header";

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

// A simple loading spinner component
const LoadingSpinner = () => (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
    </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // This would typically be fetched from a separate API endpoint
  const popularCourses = [
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
      progress: 0, 
      type: "popular",
      image: "https://images.unsplash.com/photo-1526379879981-0f0a5a34bdb6?w=400&h=250&fit=crop&auto=format",
      category: "Data Science",
      level: "Intermediate",
      duration: "22 hrs"
    },
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        // Fetch user data from your protected backend route
        const { data } = await axios.get("http://localhost:5000/api/auth/profile", { // Make sure this endpoint exists on your backend
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user data:", err);
        setError("Could not load your profile. Please try logging in again.");
        localStorage.removeItem("token");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Combine user's courses with other course categories for display
  // Assumes your API populates the course details
  const allCourses = user ? [
    ...(user.courses?.ongoing?.map(c => ({ ...c, type: 'ongoing' })) || []),
    ...(user.courses?.completed?.map(c => ({ ...c, type: 'completed' })) || []),
    ...popularCourses
  ] : popularCourses;

  const filteredCourses = filter === "all"
    ? allCourses
    : allCourses.filter((course) => course.type === filter);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="text-center text-red-500 p-8">{error}</div>;
  }

  return (
    <>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 relative overflow-hidden">
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float-reverse"></div>
        </div>

        <div className="relative z-10">
          {/* Profile Card */}
          <div className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 mb-8 flex flex-col md:flex-row md:items-start justify-between animate-fade-in-up">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4 flex-grow mb-6 md:mb-0">
              
              {/* Animated Profile Avatar */}
              <div className="relative animate-fade-in-up">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
              </div>

              <div className="text-center sm:text-left flex-grow">
                <h2 className="text-2xl font-bold text-purple-800 animate-gradient-text">
                  {user?.name}
                </h2>

                {/* Stats Grid */}
                <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                  
                  {/* Current Points Card */}
                  <div className="group bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-5 rounded-xl shadow-md">
                      <Gauge className="w-10 h-10 text-blue-600 mb-1" />
                      <p className="font-semibold text-gray-700 text-lg">{user?.currentPoints || 0}/100</p>
                      <p className="text-sm text-gray-500">Current Points</p>
                  </div>

                  {/* Badges Card */}
                  <div className="group bg-gradient-to-br from-purple-50/80 to-pink-50/80 p-5 rounded-xl shadow-md">
                      <Award className="w-10 h-10 text-purple-600 mb-1" />
                      <p className="font-semibold text-gray-700 text-lg">{user?.badges?.length || 0}</p>
                      <p className="text-sm text-gray-500">Badges Earned</p>
                  </div>

                  {/* Streak Card */}
                  <div className="group bg-gradient-to-br from-orange-50/80 to-red-50/80 p-5 rounded-xl shadow-md">
                      <Flame className="w-10 h-10 text-orange-500 mb-1" />
                      <p className="font-semibold text-gray-700 text-lg">{user?.currentStreak || 0} Days</p>
                      <p className="text-sm text-gray-500">Current Streak</p>
                  </div>

                  {/* Completed Courses Card */}
                  <div className="group bg-gradient-to-br from-green-50/80 to-emerald-50/80 p-5 rounded-xl shadow-md">
                      <BookCheck className="w-10 h-10 text-green-600 mb-1" />
                      <p className="font-semibold text-gray-700 text-lg">{user?.courses?.completed?.length || 0}</p>
                      <p className="text-sm text-gray-500">Courses Completed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="group mt-4 md:mt-0 px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Logout</span>
            </button>
          </div>

          {/* Your Learning Journey */}
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 animate-gradient-text">
              Your Learning Journey
            </h3>
            
            <div className="flex space-x-4 mb-6">
              {["all", "ongoing", "completed", "popular"].map((tab) => (
                <button
                  key={tab}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    filter === tab
                      ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg"
                      : "bg-gray-200/80 text-gray-700 hover:bg-gray-300/80"
                  }`}
                  onClick={() => setFilter(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="group bg-gradient-to-br from-gray-50/80 to-gray-100/80 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative rounded-lg h-40 w-full mb-4 overflow-hidden">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover"/>
                  </div>
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold text-gray-700">{course.title}</h4>
                    <Progress value={course.progress} />
                    <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg">
                      {course.progress === 100 ? 'Review Course' : 'Continue Learning'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <style jsx>{`
            /* Minimal keyframes for brevity */
            @keyframes float-slow { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
            @keyframes float-reverse { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(20px); } }
            @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
            @keyframes gradient-text { 0%, 100% { background-position: left center; } 50% { background-position: right center; } }
            @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
            .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
            .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
            .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
            .animate-gradient-text { background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981); background-size: 400% 400%; animation: gradient-text 4s ease infinite; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
            .animate-shimmer { animation: shimmer 2s infinite; }
        `}</style>
      </div>
    </>
  );
};

export default DashboardPage;
