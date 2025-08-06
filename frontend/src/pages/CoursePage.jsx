import { BookOpen, Star, Clock, ArrowRight, Users, Play, TrendingUp, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";

export default function CoursePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]); // All available courses from backend
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set()); // IDs of courses the user is enrolled in
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const filters = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "web", label: "Web Development", icon: Zap },
    { id: "mobile", label: "Mobile Development", icon: Play },
    { id: "backend", label: "Backend", icon: TrendingUp },
    { id: "cloud", label: "Cloud & DevOps", icon: Award },
    { id: "data", label: "Data Science", icon: Star },
    { id: "ai", label: "AI & ML", icon: Zap }
  ];

  // This useEffect fetches all courses and the user's enrolled courses
  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch all courses from the backend
        console.log('Fetching all courses...');
        const allCoursesResponse = await api.get('/courses/all');
        console.log('All courses response:', allCoursesResponse.data);
        
        // Format courses with fallback values
        const formattedCourses = allCoursesResponse.data.map(course => ({
          ...course,
          imageUrl: course.imageUrl || 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format',
          duration: course.duration || '6 weeks',
          rating: course.rating || 4.5,
          lessons: course.lessons || course.modules?.length || 12,
          students: course.students || Math.floor(Math.random() * 1000) + 100,
          category: course.category || 'web'
        }));
        
        setCourses(formattedCourses);

        // Fetch the user's enrolled courses if a token exists
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const enrolledResponse = await api.get('/courses/enrolled', config);
            console.log('Enrolled courses:', enrolledResponse.data);
            const enrolledIds = new Set(enrolledResponse.data.map(course => course._id || course.id));
            setEnrolledCourseIds(enrolledIds);
          } catch (enrollError) {
            console.warn('Could not fetch enrolled courses:', enrollError);
            // Don't throw error here, just continue without enrolled status
          }
        }
      } catch (err) {
        console.error('Error fetching courses:', err);
        setError('Failed to fetch courses. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCoursesData();
  }, []);

  const handleEnroll = async (courseId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Please log in to enroll in a course.");
      navigate('/login');
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post('/courses/enroll', { courseId }, config);
      setEnrolledCourseIds(prevIds => new Set(prevIds).add(courseId));
      alert("Successfully enrolled in the course!");
      navigate(`/courses/${courseId}`);
    } catch (err) {
      console.error('Enrollment error:', err);
      alert(`Enrollment failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const filteredCourses = selectedFilter === "all"
    ? courses
    : courses.filter(course => course.category === selectedFilter);

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin"></div>
            </div>
            <div className="text-gray-600 font-medium animate-pulse">Loading amazing courses...</div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-8 text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Retry
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
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
        
        @keyframes gradient-text {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
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
        
        .animate-gradient-text {
          background: linear-gradient(-45deg, #9333ea, #4f46e5, #0ea5e9);
          background-size: 400% 400%;
          animation: gradient-text 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .delay-300 { animation-delay: 300ms; }
        .delay-500 { animation-delay: 500ms; }
      `}</style>
      
      <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
        <Header />
        
        {/* Background Animation Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/5 to-indigo-400/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-300/3 to-pink-300/3 rounded-full blur-2xl animate-pulse-slow"></div>
        </div>

        <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
          
          {/* Header Section */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-gradient-text">
              Discover Amazing Courses
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Unlock your potential with our comprehensive collection of courses designed by industry experts
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-up delay-300">
            {filters.map((filter, index) => {
              const Icon = filter.icon;
              return (
                <button
                  key={filter.id}
                  onClick={() => setSelectedFilter(filter.id)}
                  className={`group flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 animate-fade-in-up ${
                    selectedFilter === filter.id
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg"
                      : "bg-white/70 backdrop-blur-sm text-gray-700 hover:bg-white hover:shadow-md"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <Icon className="w-5 h-5 group-hover:animate-bounce" />
                  <span>{filter.label}</span>
                  {selectedFilter === filter.id && (
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Course Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16 animate-fade-in-up delay-500">
            {[
              { icon: BookOpen, label: "Total Courses", value: courses.length, color: "purple" },
              { icon: Users, label: "Active Students", value: "10,000+", color: "blue" },
              { icon: Star, label: "Average Rating", value: "4.8", color: "yellow" },
              { icon: Award, label: "Certificates", value: "5,000+", color: "green" }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 500}ms` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${
                    stat.color === 'purple' ? 'from-purple-500 to-purple-600' :
                    stat.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    stat.color === 'yellow' ? 'from-yellow-500 to-yellow-600' :
                    'from-green-500 to-green-600'
                  } rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white group-hover:animate-bounce" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-1 group-hover:text-purple-700 transition-colors duration-300">
                    {stat.value}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        
          {/* Debug Info */}
          {courses.length === 0 && !isLoading && (
            <div className="text-center py-12 bg-white/80 backdrop-blur-sm rounded-2xl mb-8">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
              <p className="text-gray-500 mb-4">
                {selectedFilter === "all" 
                  ? "No courses are available at the moment."
                  : `No courses found in the "${selectedFilter}" category.`
                }
              </p>
              <button 
                onClick={() => setSelectedFilter("all")}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-300"
              >
                View All Courses
              </button>
            </div>
          )}

          {/* Enhanced Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => {
              const isEnrolled = enrolledCourseIds.has(course._id); // Check if the user is enrolled
              return (
                <div
                  key={course._id}
                  className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-4 hover:rotate-1 animate-fade-in-up"
                  style={{ animationDelay: `${index * 150}ms` }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Course Image with Enhanced Overlay */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={course.imageUrl}
                      alt={course.title}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format';
                      }}
                    />
                    
                    {/* Multi-layered Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                    </div>
                    
                    {/* Enrollment Status Badge */}
                    {isEnrolled && (
                      <div className="absolute top-4 right-4 bg-green-500/90 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                        <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        Enrolled
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                        <Play className="w-6 h-6 text-purple-600 ml-1" />
                      </div>
                    </div>
                    
                    {/* Floating Action Bubbles */}
                    <div className={`absolute bottom-4 right-4 flex gap-2 transition-all duration-500 ${hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <Star className="w-4 h-4 text-yellow-500" />
                      </div>
                      <div className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
                        <BookOpen className="w-4 h-4 text-blue-500" />
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Course Info with Conditional Buttons */}
                  <div className="p-8 relative">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                      {course.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-2 leading-relaxed">
                      {course.description || "Enhance your skills with this comprehensive course designed for all skill levels."}
                    </p>
                    
                    <div className="flex items-center justify-between mb-6 text-sm text-gray-500 pb-4 border-b border-gray-100">
                      <span className="flex items-center gap-2 font-medium">
                        <Users className="w-4 h-4 text-purple-500" /> 
                        {course.instructor}
                      </span>
                      <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold">
                        {course.lessons} Lessons
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
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-gray-700">{course.students}</span>
                      </div>
                    </div>
                    
                    {isEnrolled ? (
                      <Link
                        to={`/courses/${course._id}`}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group/button"
                      >
                        <span>Continue Learning</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                      </Link>
                    ) : (
                      <button
                        onClick={() => handleEnroll(course._id)}
                        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group/button"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                      </button>
                    )}
                    
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
}