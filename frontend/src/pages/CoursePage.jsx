import { BookOpen, Star, Clock, ArrowRight, Users, Play, TrendingUp, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function CoursePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]); // All available courses
  const [enrolledCourseIds, setEnrolledCourseIds] = useState(new Set()); // IDs of courses the user is enrolled in
  const [error, setError] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Hardcoded sample courses
  const hardcodedCourses = [
    {
      _id: 'hardcoded-1',
      title: 'Introduction to the Course',
      description: 'Get started with the fundamentals of web development and learn the essential skills needed to build modern web applications.',
      category: 'web',
      level: 'Beginner',
      instructor: 'John Smith',
      rating: '4.8',
      duration: '3min',
      lessons: '2',
      students: '1.2k',
      imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      modules: [
        {
          title: 'Introduction to the Course',
          content: 'Welcome to the comprehensive web development course where you will learn HTML, CSS, JavaScript and modern frameworks.',
          lectures: 2,
          duration: '3min'
        },
        {
          title: 'Setting up Development Environment',
          content: 'Learn how to set up your development environment with VS Code, Node.js, and essential extensions.',
          lectures: 3,
          duration: '15min'
        }
      ]
    },
    {
      _id: 'hardcoded-2',
      title: 'Leveraging Generative AI for Data Analytics [NEW]',
      description: 'Master the power of generative AI tools like ChatGPT and Claude for advanced data analysis and insights generation.',
      category: 'ai',
      level: 'Intermediate',
      instructor: 'Dr. Sarah Johnson',
      rating: '4.9',
      duration: '1hr 29min',
      lessons: '7',
      students: '850',
      imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      modules: [
        {
          title: 'Understanding Generative AI Basics',
          content: 'Explore the fundamentals of generative AI and its applications in data analytics.',
          lectures: 3,
          duration: '25min'
        },
        {
          title: 'Prompt Engineering for Data Analysis',
          content: 'Learn effective prompt engineering techniques for data analysis tasks.',
          lectures: 4,
          duration: '1hr 4min'
        }
      ]
    },
    {
      _id: 'hardcoded-3',
      title: 'Introduction to Data Analytics',
      description: 'Comprehensive introduction to data analytics covering statistics, visualization, and modern analytical techniques.',
      category: 'data',
      level: 'Beginner',
      instructor: 'Michael Chen',
      rating: '4.7',
      duration: '58min',
      lessons: '13',
      students: '2.1k',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      modules: [
        {
          title: 'Data Analytics Fundamentals',
          content: 'Understanding data types, collection methods, and basic statistical concepts.',
          lectures: 5,
          duration: '30min'
        },
        {
          title: 'Data Visualization Techniques',
          content: 'Learn to create compelling visualizations using various tools and libraries.',
          lectures: 8,
          duration: '28min'
        }
      ]
    }
  ];

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
        
        // Try to fetch courses from backend, but don't fail if it's not available
        let backendCourses = [];
        try {
          const allCoursesResponse = await api.get('/courses/all');
          backendCourses = allCoursesResponse.data;
        } catch (backendError) {
          console.log('Backend courses not available, using hardcoded courses only');
        }
        
        // Combine hardcoded courses with backend courses
        const allCourses = [...hardcodedCourses, ...backendCourses];
        setCourses(allCourses);

        // Try to get enrolled courses if user is logged in
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const config = { headers: { Authorization: `Bearer ${token}` } };
            const enrolledResponse = await api.get('/courses/enrolled', config);
            const enrolledIds = new Set(enrolledResponse.data.map(course => course._id));
            setEnrolledCourseIds(enrolledIds);
          } catch (enrolledError) {
            console.log('Could not fetch enrolled courses');
          }
        }
      } catch (err) {
        console.error('Error in fetchCoursesData:', err);
        // If everything fails, just use hardcoded courses
        setCourses(hardcodedCourses);
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
      return;
    }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await api.post('/courses/enroll', { courseId }, config);
      setEnrolledCourseIds(prevIds => new Set(prevIds).add(courseId));
      alert("Successfully enrolled in the course!");
      // Redirect to the course details page immediately after enrollment
      navigate(`/courses/${courseId}`);
    } catch (err) {
      alert(`Enrollment failed: ${err.response?.data?.message || err.message}`);
    }
  };

  const filteredCourses = selectedFilter === "all"
    ? courses
    : courses.filter(course => course.category === selectedFilter);

  if (isLoading) {
    return (
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
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto p-8 text-center text-red-500">{error}</div>
        <Footer />
      </>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <Header />
      
      {/* Main Container with Perfect Centering */}
      <div className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Enhanced Header with Perfect Alignment */}
          <div className="text-center mb-20 animate-fadeInUp">
            <div className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 px-6 py-3 rounded-full text-sm font-semibold shadow-lg animate-bounce border border-purple-200">
                <Star className="w-4 h-4" />
                Featured Courses
              </div>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 bg-clip-text text-transparent mb-8 animate-gradient leading-tight">
              Explore Our Courses
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <p className="text-gray-600 text-xl md:text-2xl leading-relaxed font-light">
                Personalized learning paths designed to bridge your skill gaps and accelerate your career with industry experts.
              </p>
            </div>
          </div>

          {/* Enhanced Filters with Perfect Grid Alignment */}
          <div className="mb-20 animate-fadeInUp animation-delay-200">
            <div className="flex justify-center">
              <div className="inline-flex flex-wrap justify-center gap-3 p-2 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20">
                {filters.map((filter, index) => {
                  const IconComponent = filter.icon;
                  return (
                    <button
                      key={filter.id}
                      onClick={() => setSelectedFilter(filter.id)}
                      className={`group relative px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 min-w-[140px] ${
                        selectedFilter === filter.id
                          ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25"
                          : "bg-white/80 backdrop-blur-sm text-gray-600 hover:bg-white hover:text-purple-600 border border-gray-200/50 hover:border-purple-300 hover:shadow-md"
                      }`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="flex flex-col items-center gap-2">
                        <IconComponent className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        <span className="text-sm">{filter.label}</span>
                      </div>
                      
                      {/* Active indicator */}
                      {selectedFilter === filter.id && (
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Enhanced Courses Grid with Perfect Alignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-20">
          {filteredCourses.map((course, index) => {
            const isEnrolled = enrolledCourseIds.has(course._id); // Check if the user is enrolled
            return (
              <Link
                key={course._id}
                to={`/courses/${course._id}`}
                className="group relative bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:rotate-1 animate-fadeInUp h-full flex flex-col cursor-pointer"
                style={{ animationDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Course Image with Enhanced Overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={course.imageUrl} // Use imageUrl from the backend
                    alt={course.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                  />
                  
                  {/* Multi-layer Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Category Badge with Animation */}
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm text-purple-700 text-sm font-bold px-4 py-2 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                    {course.category}
                  </div>

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-20 h-20 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                      <Play className="w-8 h-8 text-purple-600 ml-1" />
                    </div>
                  </div>
                </div>

                {/* Enhanced Course Info with Perfect Spacing */}
                <div className="p-8 flex-1 flex flex-col">
                  {/* Level Indicator */}
                  <div className="flex justify-between items-center mb-6">
                    <span className={`text-sm font-semibold px-4 py-2 rounded-full ${
                      course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                      course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {course.level}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300 leading-tight">
                    {course.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-8 line-clamp-2 leading-relaxed flex-1">
                    {course.description}
                  </p>

                  {/* Instructor & Lessons with Enhanced Spacing */}
                  <div className="flex items-center justify-between mb-8 text-sm text-gray-500 pb-6 border-b border-gray-100">
                    <div className="flex items-center gap-2 font-medium">
                      <Users className="w-5 h-5 text-purple-500" /> 
                      <span>{course.instructor}</span>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 rounded-full text-sm font-semibold">
                      {course.lessons} Lessons
                    </div>
                  </div>

                  {/* Enhanced Stats - Better Alignment */}
                  <div className="grid grid-cols-3 gap-4 mb-8 bg-gradient-to-r from-gray-50 to-purple-50 rounded-2xl p-6 group-hover:from-purple-50 group-hover:to-indigo-50 transition-colors duration-300">
                    <div className="text-center">
                      <Clock className="w-5 h-5 text-blue-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-700 text-sm">{course.duration}</div>
                    </div>
                    <div className="text-center">
                      <Star className="w-5 h-5 text-yellow-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-700 text-sm">{course.rating}</div>
                    </div>
                    <div className="text-center">
                      <BookOpen className="w-5 h-5 text-green-500 mx-auto mb-2" />
                      <div className="font-semibold text-gray-700 text-sm">{course.students}</div>
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <div className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl transition-all duration-300 font-bold text-lg shadow-lg mt-auto">
                    {isEnrolled ? (
                      <div className="flex items-center gap-3 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-3 rounded-full">
                        <span>Start Learning</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full">
                        <span>View Course</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                
                {/* Card Border Glow */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-purple-300/50 transition-colors duration-500"></div>
              </Link>
            );
          })}
          </div>

          {/* Enhanced Stats Section with Perfect Alignment */}
          <div className="text-center animate-fadeInUp animation-delay-1000">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 border border-white/20">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="group p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl font-bold text-purple-600 mb-3 group-hover:scale-110 transition-transform duration-300">500+</div>
                  <div className="text-gray-600 font-medium">Courses Available</div>
                </div>
                
                <div className="group p-8 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl font-bold text-indigo-600 mb-3 group-hover:scale-110 transition-transform duration-300">50k+</div>
                  <div className="text-gray-600 font-medium">Students Enrolled</div>
                </div>
                
                <div className="group p-8 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl font-bold text-pink-600 mb-3 group-hover:scale-110 transition-transform duration-300">98%</div>
                  <div className="text-gray-600 font-medium">Satisfaction Rate</div>
                </div>
                
                <div className="group p-8 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="text-4xl font-bold text-green-600 mb-3 group-hover:scale-110 transition-transform duration-300">24/7</div>
                  <div className="text-gray-600 font-medium">Support Available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

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
        
        @keyframes gradient {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 200ms;
        }
        
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }
        
        .animation-delay-2000 {
          animation-delay: 2000ms;
        }
        
        .animation-delay-4000 {
          animation-delay: 4000ms;
        }
        
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