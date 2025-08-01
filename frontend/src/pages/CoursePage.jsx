import { BookOpen, Star, Clock, ArrowRight, Users, Play, TrendingUp, Award, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import Header from "../components/common/Header";

export default function CoursePage() {
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const courses = [
    {
      title: "Mastering JavaScript",
      description: "Dive deep into ES6+, DOM manipulation, and real-world projects with hands-on exercises.",
      duration: "12 hrs",
      rating: 4.8,
      students: "1.2k",
      lessons: 45,
      instructor: "John Doe",
      image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&auto=format",
      link: "/courses/javascript",
      category: "Web Development",
      level: "Intermediate",
      filterCategory: "web",
      trending: true,
      price: "$89"
    },
    {
      title: "React for Beginners",
      description: "Learn to build powerful UIs with hooks, state management, and routing through practical examples.",
      duration: "10 hrs",
      rating: 4.9,
      students: "2.1k",
      lessons: 38,
      instructor: "Jane Smith",
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&auto=format",
      link: "/courses/react",
      category: "Frontend",
      level: "Beginner",
      filterCategory: "web",
      price: "$79"
    },
    {
      title: "Python for Data Science",
      description: "Master pandas, numpy, and matplotlib for data analysis and visualization with real datasets.",
      duration: "15 hrs",
      rating: 4.7,
      students: "3.5k",
      lessons: 52,
      instructor: "Dr. Sarah Wilson",
      image: "https://images.unsplash.com/photo-1526379879981-0f0a5a34bdb6?w=400&h=250&fit=crop&auto=format",
      link: "/courses/python-data-science",
      category: "Data Science",
      level: "Intermediate",
      filterCategory: "data",
      trending: true,
      price: "$99"
    },
    {
      title: "Flutter Mobile Development",
      description: "Build cross-platform mobile apps with Flutter and Dart, from basics to advanced concepts.",
      duration: "18 hrs",
      rating: 4.6,
      students: "1.8k",
      lessons: 64,
      instructor: "Mike Johnson",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&auto=format",
      link: "/courses/flutter",
      category: "Mobile Dev",
      level: "Advanced",
      filterCategory: "mobile",
      price: "$109"
    },
    {
      title: "Node.js Backend Mastery",
      description: "Build scalable REST APIs, authentication, databases, and deploy to cloud platforms.",
      duration: "14 hrs",
      rating: 4.8,
      students: "2.7k",
      lessons: 48,
      instructor: "Alex Chen",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&auto=format",
      link: "/courses/nodejs",
      category: "Backend",
      level: "Intermediate",
      filterCategory: "backend",
      price: "$94"
    },
    {
      title: "AWS Cloud Practitioner",
      description: "Get AWS certified with hands-on labs covering EC2, S3, Lambda, and cloud architecture.",
      duration: "20 hrs",
      rating: 4.9,
      students: "4.2k",
      lessons: 67,
      instructor: "David Kim",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop&auto=format",
      link: "/courses/aws",
      category: "Cloud & DevOps",
      level: "Beginner",
      filterCategory: "cloud",
      trending: true,
      price: "$129"
    },
    {
      title: "Machine Learning Fundamentals",
      description: "Learn supervised and unsupervised learning with scikit-learn and real-world projects.",
      duration: "22 hrs",
      rating: 4.7,
      students: "2.9k",
      lessons: 58,
      instructor: "Prof. Lisa Anderson",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop&auto=format",
      link: "/courses/machine-learning",
      category: "AI & ML",
      level: "Intermediate",
      filterCategory: "ai",
      price: "$139"
    },
    {
      title: "Docker & Kubernetes",
      description: "Containerize applications and orchestrate with Kubernetes for production deployments.",
      duration: "16 hrs",
      rating: 4.8,
      students: "1.6k",
      lessons: 42,
      instructor: "Tom Rodriguez",
      image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=250&fit=crop&auto=format",
      link: "/courses/docker-kubernetes",
      category: "DevOps",
      level: "Advanced",
      filterCategory: "cloud",
      price: "$119"
    },
    {
      title: "Swift iOS Development",
      description: "Create stunning iOS apps with SwiftUI, Core Data, and publish to the App Store.",
      duration: "17 hrs",
      rating: 4.6,
      students: "1.4k",
      lessons: 55,
      instructor: "Emma Taylor",
      image: "https://images.unsplash.com/photo-1621839673705-6617adf9e890?w=400&h=250&fit=crop&auto=format",
      link: "/courses/swift-ios",
      category: "Mobile Dev",
      level: "Intermediate",
      filterCategory: "mobile",
      price: "$104"
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

  const filteredCourses = selectedFilter === "all"
    ? courses
    : courses.filter(course => course.filterCategory === selectedFilter);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">
      <Header /> {/* Your Navbar component */}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Loading Overlay with Enhanced Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-white/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center">
            <div className="relative w-16 h-16 mx-auto mb-4">
              <div className="absolute inset-0 w-16 h-16 border-4 border-gray-200 rounded-full"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-purple-600 border-r-purple-600 rounded-full animate-spin"></div>
            </div>
            <div className="text-gray-600 font-medium animate-pulse">Loading amazing courses...</div>
          </div>
        </div>
      )}

      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Enhanced Header with Animation */}
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

        {/* Enhanced Filters with Icons */}
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

        {/* Enhanced Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.map((course, index) => (
            <div
              key={course.title}
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

              {/* Course Image with Enhanced Overlay */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-2"
                />
                
                {/* Multi-layer Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Category Badge with Animation */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-lg transform group-hover:scale-110 transition-transform duration-300">
                  {course.category}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-4 right-4 bg-green-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                  {course.price}
                </div>

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <Play className="w-6 h-6 text-purple-600 ml-1" />
                  </div>
                </div>
              </div>

              {/* Enhanced Course Info with Better Spacing */}
              <div className="p-8 relative">
                {/* Level Indicator */}
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

                {/* Instructor & Lessons with Enhanced Spacing */}
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500 pb-4 border-b border-gray-100">
                  <span className="flex items-center gap-2 font-medium">
                    <Users className="w-4 h-4 text-purple-500" /> {course.instructor}
                  </span>
                  <span className="bg-gray-100 px-3 py-1.5 rounded-full text-xs font-semibold">
                    {course.lessons} Lessons
                  </span>
                </div>

                {/* Enhanced Stats - Horizontal Layout */}
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
                    <span className="font-semibold text-gray-700">{course.students}</span>
                  </div>
                </div>

                {/* Enhanced CTA Button */}
                <a
                  href={course.link}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 group/button"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/button:translate-x-1" />
                </a>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>

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