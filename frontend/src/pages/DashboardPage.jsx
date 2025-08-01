import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Star, Award, Flame, BookCheck, Gauge, User, Clock, ArrowRight,
} from "lucide-react";
import Header from "../components/common/Header";

// Progress Bar Component
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

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50">
    <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-purple-600"></div>
  </div>
);

const DashboardPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const popularCourses = [
    {
      id: 5,
      title: "DevOps Fundamentals",
      progress: 0,
      type: "popular",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop&auto=format",
      category: "DevOps",
      level: "Intermediate",
      duration: "16 hrs",
    },
    {
      id: 6,
      title: "Python for Data Science",
      progress: 0,
      type: "popular",
      image: "https://images.unsplash.com/photo-1526379879981-0f0a5a34bdb6?w=400&h=250&fit=crop&auto=format",
      category: "Data Science",
      level: "Intermediate",
      duration: "22 hrs",
    },
  ];

  useEffect(() => {
 const fetchDashboardData = async () => {
  const token = localStorage.getItem("token");

  if (!token) {
    navigate("/login");
    return;
  }

  try {
    const userRes = await axios.get("http://localhost:5000/api/auth/profile", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const userData = userRes.data;
    setUser(userData);

    const progressList = userData.progress || [];

    const coursePromises = progressList.map(async (entry) => {
      try {
        const courseRes = await axios.get(`http://localhost:5000/api/auth/courses/${entry.courseId}`);
        const course = courseRes.data;
        return {
          id: course._id,
          title: course.title,
          image: course.thumbnailUrl || "https://placehold.co/400x250",
          category: course.category || "General",
          level: course.level || "Beginner",
          duration: course.duration || "N/A",
          progress: entry.status === "completed" ? 100 : 0,
          type: entry.status === "completed" ? "completed" : "ongoing"
        };
      } catch {
        return null;
      }
    });

    const userCourses = (await Promise.all(coursePromises)).filter(Boolean);
    setCourses([...userCourses, ...popularCourses]);

  } catch (error) {
    console.error("Error loading dashboard:", error);
    navigate("/login");
  } finally {
    setLoading(false);
  }
};
;

    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const filteredCourses = filter === "all" ? courses : courses.filter(course => course.type === filter);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/8 to-purple-400/8 rounded-full blur-3xl animate-float-reverse"></div>
        </div>

        <div className="relative z-10">
          <div className="w-full bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-lg mb-8 flex flex-col md:flex-row justify-between animate-fade-in-up">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                <User className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-purple-800">{user?.name}</h2>
            </div>

            <button
              onClick={handleLogout}
              className="px-5 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 mt-4 md:mt-0"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            <StatCard icon={<Gauge className="text-blue-600" />} label="Current Points" value={`${user?.currentPoints || 0}/100`} />
            <StatCard icon={<Award className="text-purple-600" />} label="Badges Earned" value={user?.badges?.length || 0} />
            <StatCard icon={<Flame className="text-orange-500" />} label="Current Streak" value={`${user?.currentStreak || 0} Days`} />
            <StatCard icon={<BookCheck className="text-green-600" />} label="Courses Completed" value={courses.filter(c => c.type === "completed").length} />
          </div>

          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4">Your Learning Journey</h3>

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
                <div key={course.id} className="bg-gradient-to-br from-gray-50/80 to-gray-100/80 p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-300">
                  <img src={course.image} alt={course.title} className="w-full h-40 object-cover rounded-lg mb-4" />
                  <h4 className="text-lg font-semibold text-gray-700">{course.title}</h4>
                  <p className="text-sm text-gray-500">{course.category} • {course.level} • {course.duration}</p>
                  <Progress value={course.progress} />
                  <button className="w-full mt-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg">
                    {course.progress === 100 ? "Review Course" : "Continue Learning"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CSS Animations */}
        <style jsx>{`
          @keyframes float-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-20px); } }
          @keyframes float-reverse { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(20px); } }
          @keyframes fade-in-up { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
          @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(100%); } }
          .animate-float-slow { animation: float-slow 6s ease-in-out infinite; }
          .animate-float-reverse { animation: float-reverse 8s ease-in-out infinite; }
          .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
          .animate-shimmer { animation: shimmer 2s infinite; }
        `}</style>
      </div>
    </>
  );
};

// Stats Card Component
const StatCard = ({ icon, label, value }) => (
  <div className="group bg-white/80 p-5 rounded-xl shadow-md hover:shadow-lg transition-all">
    <div className="w-10 h-10 mb-1">{icon}</div>
    <p className="font-semibold text-gray-700 text-lg">{value}</p>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default DashboardPage;
