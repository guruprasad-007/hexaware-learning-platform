// frontend/src/pages/AdminCoursesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import AdminHeader from '../components/common/AdminHeader';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function AdminCoursesPage() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in as an admin.');
            setIsLoading(false);
            return;
        }

        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await api.get('/admin/courses', config);
        setCourses(response.data);
      } catch (err) {
        setError('Failed to fetch courses. Please ensure you are logged in as admin.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Course Management</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg text-gray-600">Total Courses: {courses.length}</p>
          <Link to="/admin/courses/add" className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
            Add New Course
          </Link>
        </div>
        {/* Display courses in a table or list */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map(course => (
                <tr key={course._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{course.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{course.instructor}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button className="text-indigo-600 hover:text-indigo-900 mr-4">Edit</button>
                    <button className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
      <Footer />
    </>
  );
}