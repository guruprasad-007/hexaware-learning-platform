import { BookOpen, Star, Clock, ArrowRight, Users, Play, TrendingUp, Award, Zap, ChevronRight, Sparkles, Target, Globe } from "lucide-react";
import { useState, useEffect } from "react";
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';
import { Link, useNavigate } from "react-router-dom";

// Enhanced Stats Card Component
const StatCard = ({ icon: Icon, label, value, color, delay }) => (
  <div 
    className={`group relative bg-white/70 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl border border-white/30 transform hover:-translate-y-4 hover:scale-105 transition-all duration-500 animate-fade-in-up overflow-hidden`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Floating particles */}
    <div className="absolute top-3 right-3 w-2 h-2 bg-purple-300/50 rounded-full animate-ping"></div>
    <div className="absolute bottom-4 left-4 w-1 h-1 bg-indigo-300/60 rounded-full animate-pulse delay-700"></div>
    
    <div className="relative z-10 text-center space-y-4">
      <div className="relative mx-auto w-fit">
        <div className={`p-4 rounded-2xl ${color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-bounce transition-all duration-500" />
        </div>
        <div className="absolute inset-0 bg-white/30 rounded-2xl blur-xl group-hover:animate-pulse"></div>
      </div>
      
      <div className="space-y-2">
        <p className="text-3xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
          {value}
        </p>
        <p className="text-sm font-medium text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
          {label}
        </p>
      </div>
      
      {/* Hover indicator */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 pt-2">
        <div className="w-8 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto"></div>
      </div>
    </div>
  </div>
);

// Enhanced Filter Button Component
const FilterButton = ({ filter, selectedFilter, onClick, index }) => {
  const Icon = filter.icon;
  const isSelected = selectedFilter === filter.id;
  
  return (
    <button
      onClick={() => onClick(filter.id)}
      className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-sm transition-all duration-500 transform hover:-translate-y-2 hover:scale-105 animate-fade-in-up overflow-hidden ${
        isSelected
          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-xl border-2 border-transparent"
          : "bg-white/70 backdrop-blur-xl text-gray-700 hover:bg-white/90 hover:shadow-lg border-2 border-white/30 hover:border-purple-300/50"
      }`}
      style={{ animationDelay: `${index * 100 + 300}ms` }}
    >
      {/* Background glow for selected state */}
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 blur-xl"></div>
      )}
      
      {/* Icon with animation */}
      <div className="relative">
        <Icon className={`w-5 h-5 transition-all duration-300 ${
          isSelected ? 'text-white drop-shadow-lg' : 'text-purple-600 group-hover:text-purple-700'
        } group-hover:animate-bounce`} />
      </div>
      
      {/* Label */}
      <span className="relative font-semibold">{filter.label}</span>
      
      {/* Active indicator */}
      {isSelected && (
        <div className="relative">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute inset-0 w-2 h-2 bg-white rounded-full animate-ping opacity-40"></div>
        </div>
      )}
      
      {/* Hover effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
    </button>
  );
};

// Enhanced Course Card Component
const CourseCard = ({ course, index, isEnrolled, onEnroll }) => (
  <div
    className="group relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-105 animate-fade-in-up border border-white/30"
    style={{ animationDelay: `${index * 150}ms` }}
  >
    {/* Gradient overlay for depth */}
    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
    
    {/* Course Image with enhanced effects */}
    <div className="relative h-56 overflow-hidden rounded-t-3xl">
      <img
        src={course.imageUrl}
        alt={course.title}
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format';
        }}
      />
      
      {/* Multi-layer gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-indigo-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Enhanced badges */}
      <div className="absolute top-4 left-4">
        <div className="bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-4 py-2 rounded-full shadow-lg border border-purple-200/50 flex items-center gap-2">
          <Sparkles className="w-3 h-3" />
          {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
        </div>
      </div>
      
      {/* Enrollment Status Badge */}
      {isEnrolled && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-green-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <span>Enrolled</span>
        </div>
      )}
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="relative">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play className="w-8 h-8 text-white drop-shadow-lg ml-1" />
          </div>
          <div className="absolute inset-0 w-20 h-20 border-2 border-white/30 rounded-full animate-ping"></div>
        </div>
      </div>
      
      {/* Rating and popularity indicators */}
      <div className="absolute bottom-4 left-4 flex items-center gap-2">
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-500 fill-current" />
          <span className="text-xs font-bold text-gray-800">{course.rating}</span>
        </div>
        <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
          <Users className="w-3 h-3 text-purple-500" />
          <span className="text-xs font-bold text-gray-800">{course.students}</span>
        </div>
      </div>
    </div>

    {/* Enhanced Course content */}
    <div className="p-8 space-y-6">
      {/* Title and instructor */}
      <div className="space-y-3">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
          {course.title}
        </h3>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center">
            <Users className="w-3 h-3 text-white" />
          </div>
          <span className="font-medium">{course.instructor}</span>
        </div>
      </div>
      
      {/* Description */}
      <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">
        {course.description || "Enhance your skills with this comprehensive course designed for all skill levels. Master the latest technologies and best practices."}
      </p>
      
      {/* Course stats */}
      <div className="grid grid-cols-3 gap-4 py-4 bg-gradient-to-r from-gray-50/80 to-purple-50/80 rounded-2xl border border-gray-100/50">
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Clock className="w-4 h-4 text-blue-500" />
          </div>
          <p className="text-xs text-gray-600">Duration</p>
          <p className="text-sm font-bold text-gray-800">{course.duration}</p>
        </div>
        <div className="text-center border-x border-gray-200/50">
          <div className="flex items-center justify-center mb-1">
            <BookOpen className="w-4 h-4 text-purple-500" />
          </div>
          <p className="text-xs text-gray-600">Lessons</p>
          <p className="text-sm font-bold text-gray-800">{course.lessons}</p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center mb-1">
            <Target className="w-4 h-4 text-green-500" />
          </div>
          <p className="text-xs text-gray-600">Level</p>
          <p className="text-sm font-bold text-gray-800">All</p>
        </div>
      </div>
      
      {/* Action button */}
      <div className="pt-2">
        {isEnrolled ? (
          <Link
            to={`/courses/${course._id}`}
            className="group/button w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-4 rounded-2xl hover:from-emerald-600 hover:to-green-600 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Play className="w-5 h-5" />
            <span>Continue Learning</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/button:translate-x-1" />
          </Link>
        ) : (
          <button
            onClick={() => onEnroll(course._id)}
            className="group/button w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            <Sparkles className="w-5 h-5" />
            <span>Enroll Now</span>
            <ArrowRight className="w-5 h-5 transition-transform group-hover/button:translate-x-1" />
          </button>
        )}
      </div>
    </div>
    
    {/* Enhanced hover glow effect */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    
    {/* Corner accent */}
    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
  </div>
);

export default function CoursePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set());
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const filters = [
    { id: "all", label: "All Courses", icon: BookOpen },
    { id: "web", label: "Web Development", icon: Globe },
    { id: "mobile", label: "Mobile Development", icon: Play },
    { id: "backend", label: "Backend", icon: TrendingUp },
    { id: "cloud", label: "Cloud & DevOps", icon: Award },
    { id: "data", label: "Data Science", icon: Star },
    { id: "ai", label: "AI & ML", icon: Zap }
  ];

  useEffect(() => {
    const fetchCoursesData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Fetching all courses...');
        const allCoursesResponse = await api.get('/courses/all');
        console.log('All courses response:', allCoursesResponse.data);
        
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
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center">
          <div className="text-center space-y-6">
            <div className="relative mx-auto w-20 h-20">
              <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 rounded-full"></div>
              <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-2 w-16 h-16 border-2 border-purple-300 rounded-full animate-ping opacity-20"></div>
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-gray-800">Loading Amazing Courses</h3>
              <p className="text-gray-600 font-medium animate-pulse">Preparing your learning journey...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center p-6">
          <div className="text-center max-w-md">
            <div className="bg-white/80 backdrop-blur-xl border border-red-200/50 text-red-700 px-8 py-10 rounded-3xl shadow-2xl">
              <div className="text-5xl mb-6">⚠️</div>
              <h3 className="text-xl font-bold mb-4">Oops! Something went wrong</h3>
              <p className="text-gray-600 mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-2xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-40 w-80 h-80 bg-gradient-to-bl from-blue-400/12 to-purple-400/12 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          <div className="absolute top-20 right-1/4 w-48 h-48 bg-gradient-to-l from-yellow-300/8 to-orange-300/8 rounded-full blur-2xl animate-bounce-gentle"></div>
        </div>

        <div className="relative z-10 p-6 max-w-7xl mx-auto">
          {/* Enhanced Header Section */}
          <div className="text-center mb-16 pt-10 animate-fade-in-up">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent animate-gradient-text">
                  Discover Amazing
                </span>
                <br />
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-gradient-text">
                  Courses
                </span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-16 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full"></div>
                <Sparkles className="w-6 h-6 text-purple-500 animate-pulse" />
                <div className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full"></div>
              </div>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Unlock your potential with our comprehensive collection of courses designed by industry experts. 
                Start your journey to mastery today.
              </p>
            </div>
          </div>

          {/* Enhanced Filter Section */}
          <div className="mb-16 animate-fade-in-up delay-300">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Choose Your Path</h2>
              <p className="text-gray-600">Select a category to explore specialized courses</p>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {filters.map((filter, index) => (
                <FilterButton
                  key={filter.id}
                  filter={filter}
                  selectedFilter={selectedFilter}
                  onClick={setSelectedFilter}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Stats Section */}
          <div className="mb-16 animate-fade-in-up delay-500">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                icon={BookOpen}
                label="Total Courses"
                value={courses.length}
                color="bg-gradient-to-br from-purple-500 to-purple-600"
                delay={0}
              />
              <StatCard
                icon={Users}
                label="Active Students"
                value="10,000+"
                color="bg-gradient-to-br from-blue-500 to-blue-600"
                delay={200}
              />
              <StatCard
                icon={Star}
                label="Average Rating"
                value="4.8"
                color="bg-gradient-to-br from-yellow-500 to-orange-500"
                delay={400}
              />
              <StatCard
                icon={Award}
                label="Certificates"
                value="5,000+"
                color="bg-gradient-to-br from-emerald-500 to-green-600"
                delay={600}
              />
            </div>
          </div>

          {/* No courses found state */}
          {filteredCourses.length === 0 && !isLoading && (
            <div className="text-center py-20 animate-fade-in-up">
              <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-xl border border-white/30 p-12 max-w-2xl mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Courses Found</h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  {selectedFilter === "all" 
                    ? "We're working hard to bring you amazing courses. Check back soon!"
                    : `No courses found in the "${filters.find(f => f.id === selectedFilter)?.label}" category. Try exploring other categories.`
                  }
                </p>
                <button 
                  onClick={() => setSelectedFilter("all")}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-xl"
                >
                  View All Courses
                </button>
              </div>
            </div>
          )}

          {/* Enhanced Courses Grid */}
          {filteredCourses.length > 0 && (
            <div className="animate-fade-in-up delay-700">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  {selectedFilter === "all" ? "All Courses" : `${filters.find(f => f.id === selectedFilter)?.label} Courses`}
                </h2>
                <p className="text-gray-600">
                  {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10">
                {filteredCourses.map((course, index) => (
                  <CourseCard
                    key={course._id}
                    course={course}
                    index={index}
                    isEnrolled={enrolledCourseIds.has(course._id)}
                    onEnroll={handleEnroll}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Custom CSS */}
        <style jsx>{`
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
          
          @keyframes bounce-gentle {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
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
          
          .animate-bounce-gentle {
            animation: bounce-gentle 3s ease-in-out infinite;
          }
          
          .animate-gradient-text {
            background: linear-gradient(-45deg, #9333ea, #4f46e5, #0ea5e9, #10b981);
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
          .delay-700 { animation-delay: 700ms; }

          /* Enhanced glass morphism effects */
          .glass-effect {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }

          /* Smooth scroll behavior */
          html {
            scroll-behavior: smooth;
          }

          /* Custom scrollbar styling */
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

          /* Enhanced hover effects */
          .hover-glow {
            position: relative;
            overflow: hidden;
          }

          .hover-glow::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
            transition: left 0.5s;
          }

          .hover-glow:hover::before {
            left: 100%;
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}