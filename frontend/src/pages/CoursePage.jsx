import { BookOpen, Star, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function CoursePage() {
  const courses = [
    {
      title: "Mastering JavaScript",
      description: "Dive deep into ES6+, DOM manipulation, and real-world projects with hands-on exercises.",
      duration: "12 hrs",
      rating: 4.8,
      students: "1.2k",
      image: "https://source.unsplash.com/400x250/?javascript,code",
      link: "/courses/javascript",
      category: "Web Development",
      level: "Intermediate"
    },
    {
      title: "React for Beginners",
      description: "Learn to build powerful UIs with hooks, state management, and routing through practical examples.",
      duration: "10 hrs",
      rating: 4.9,
      students: "2.1k",
      image: "https://source.unsplash.com/400x250/?react,web",
      link: "/courses/react",
      category: "Frontend",
      level: "Beginner"
    },
    {
      title: "Python Programming",
      description: "Understand Python fundamentals with data structures and OOP concepts through coding challenges.",
      duration: "15 hrs",
      rating: 4.7,
      students: "3.4k",
      image: "https://source.unsplash.com/400x250/?python,coding",
      link: "/courses/python",
      category: "Backend",
      level: "Beginner"
    },
  ];

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50">
      {/* Floating background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-60 h-60 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-full blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      <section className="relative z-10 py-20 px-6 md:px-12 lg:px-24 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Explore Our Courses
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Personalized learning paths designed to bridge your skill gaps and accelerate your career
          </p>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div 
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-white/20 hover:border-purple-200/50"
            >
              {/* Image with overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                
                {/* Category badge */}
                <div className="absolute top-4 right-4 bg-white/90 text-purple-600 text-xs font-semibold px-3 py-1 rounded-full shadow">
                  {course.category}
                </div>
              </div>

              {/* Course content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                  <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full">
                    {course.level}
                  </span>
                </div>
                
                <p className="text-gray-600 text-sm mb-5">{course.description}</p>
                
                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-purple-600" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <BookOpen className="w-4 h-4 text-indigo-600" />
                    <span>{course.students}</span>
                  </div>
                </div>
                
                {/* Button */}
                <Link
                  to={course.link}
                  className="w-full flex items-center justify-between bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 group"
                >
                  <span>Start Learning</span>
                  <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-16">
          <Link 
            to="/courses" 
            className="inline-flex items-center text-purple-600 hover:text-purple-800 font-medium transition-colors"
          >
            View all courses
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}