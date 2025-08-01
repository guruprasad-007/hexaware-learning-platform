import React, { useState, useEffect } from "react";
import axios from "axios"; // Make sure to import axios
import { BookOpen, Star, Clock, ArrowRight, Users, Play, TrendingUp, Award, Zap } from "lucide-react";
import Header from "../components/common/Header";

// --- Helper Components ---

const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50">
    <div className="text-center">
      <div className="relative w-16 h-16 mx-auto mb-4">
        <div className="absolute inset-0 w-16 h-16 border-4 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin"></div>
      </div>
      <div className="text-gray-600 font-medium animate-pulse">Loading amazing courses...</div>
    </div>
  </div>
);

// --- Main Component ---

export default function CoursePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]); // State to hold courses from the API
  const [error, setError] = useState(null); // State to handle any API errors
  const [hoveredCard, setHoveredCard] = useState(null);

  const filters = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "web", label: "Web Development", icon: Zap },
    { id: "mobile", label: "Mobile Development", icon: Play },
    { id: "backend", label: "Backend", icon: TrendingUp },
    { id: "cloud", label: "Cloud & DevOps", icon: Award },
    { id: "data", label: "Data Science", icon: Star },
    { id: "ai", label: "AI & ML", icon: Zap }
  ];

  // Fetch courses from the backend when the component mounts
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/auth/courses"); // This calls your backend endpoint
        setCourses(data);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
        setError("Could not load courses. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []); // Empty dependency array ensures this runs only once

  const filteredCourses = selectedFilter === "all"
    ? courses
    : courses.filter(course => course.filterCategory === selectedFilter);

  // Helper function to format student count (e.g., 1200 -> 1.2k)
  const formatStudents = (num) => {
    if (!num) return 0;
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <Header />

      {isLoading && <LoadingSpinner />}

      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeInUp">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 animate-bounce">
            <Star className="w-4 h-4" />
            Featured Courses
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-6 animate-gradient">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            Personalized learning paths designed to bridge your skill gaps and accelerate your career with industry experts.
          </p>
        </div>

        {/* Filters Section */}
        <div className="flex justify-center gap-3 mb-16 flex-wrap animate-fadeInUp animation-delay-200">
          {filters.map((filter, index) => {
            const IconComponent = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`group px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                  selectedFilter === filter.id
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                    : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-purple-600 border border-gray-200/50 hover:border-purple-300 hover:shadow-md"
                }`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-2">
                  <IconComponent className="w-4 h-4 transition-transform group-hover:rotate-12" />
                  {filter.label}
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Error Message Display */}
        {error && <div className="text-center text-red-500 text-lg p-8">{error}</div>}

        {/* Courses Grid */}
        {!error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div
                key={course._id} // Use the unique _id from the database
                className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 animate-fadeInUp"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Trending Badge */}
                {course.trending && (
                  <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    🔥 Trending
                  </div>
                )}

                {/* Course Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={course.thumbnailUrl} // Use thumbnailUrl from the model
                    alt={course.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    {course.category}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                    ${course.price} {/* Format the price */}
                  </div>
                   <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-6 h-6 text-purple-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Course Info */}
                <div className="p-8 relative">
                  <div className="flex justify-between items-center mb-4">
                    <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  <div className="flex items-center justify-between mb-6 text-sm text-gray-500 pb-4 border-b border-gray-100">
                    <span className="flex items-center gap-2 font-medium">
                      <Users className="w-4 h-4 text-purple-500" /> {course.instructor}
                    </span>
                    <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold">
                      {course.modules?.length || 0} Lessons {/* Get lessons from modules array */}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-8 text-sm bg-gray-50 rounded-xl p-4 group-hover:bg-purple-50 transition-colors duration-300">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-semibold text-gray-700">{course.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-semibold text-gray-700">{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-gray-700">{formatStudents(course.students)}</span>
                    </div>
                  </div>
                  <a
                    href={`/courses/${course._id}`} // Create dynamic link
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group/button"
                  >
                    <span>Start Learning</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-20 text-center animate-fadeInUp animation-delay-1000">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-gray-600">Courses Available</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-indigo-600 mb-2">50k+</div>
              <div className="text-gray-600">Students Enrolled</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-pink-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="p-6 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-gray-600">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes gradient {
          0%, 100% { background-size: 200% 200%; background-position: left center; }
          50% { background-size: 200% 200%; background-position: right center; }
        }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animation-delay-200 { animation-delay: 200ms; }
        .animation-delay-1000 { animation-delay: 1000ms; }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
