// src/components/courses/CourseDetails.jsx
import { useParams, Link } from "react-router-dom";
import { Clock, Star, BookOpen, ArrowRight } from "lucide-react";

export default function CourseDetails({ courses }) {
  const { courseId } = useParams();
  const course = courses.find((c) => c.link.includes(courseId));

  if (!course) {
    return <div className="p-10 text-center text-red-600">Course not found!</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-purple-50 to-indigo-50 p-6 md:p-12">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-3xl overflow-hidden">
        {/* Course Image Banner */}
        <div className="relative h-64 md:h-96">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{course.title}</h1>
            <p className="text-gray-200 mt-2">{course.category} • {course.level}</p>
          </div>
        </div>

        {/* Course Content */}
        <div className="p-6 md:p-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Overview</h2>
          <p className="text-gray-600 mb-6">{course.description}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center gap-2 text-gray-700">
              <Clock className="w-5 h-5 text-purple-600" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>{course.rating} Rating</span>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <BookOpen className="w-5 h-5 text-indigo-600" />
              <span>{course.students} Students</span>
            </div>
          </div>

          {/* Call to Action */}
          <Link
            to="#"
            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all font-semibold text-lg"
          >
            Start Learning
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
