// frontend/src/components/common/AdminHeader.jsx
import { Link } from "react-router-dom";

export default function AdminHeader() {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-white">
          E-GURU
        </h1>
        <nav className="space-x-6 flex items-center">
          <Link to="/admin/dashboard" className="text-white">Dashboard</Link>
          <Link to="/admin/courses" className="text-white">Courses</Link>
          <Link to="/admin/courses/add" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add Course
          </Link>
        </nav>
      </div>
    </header>
  );
}