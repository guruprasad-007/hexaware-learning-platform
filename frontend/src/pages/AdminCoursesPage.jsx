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

  const handleDelete = async (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      await api.delete(`/admin/courses/${courseId}`, config);
      
      // Remove the deleted course from the state
      setCourses(courses.filter(course => course._id !== courseId));
    } catch (err) {
      alert('Failed to delete course: ' + (err.response?.data?.message || 'Unknown error'));
    }
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-lg">Loading courses...</div>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="text-red-600 text-lg">Error: {error}</div>
    </div>
  );

  return (
    <>
      <AdminHeader />
      <main className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Admin Course Management</h1>
        <div className="flex justify-between items-center mb-6">
          <p className="text-lg text-gray-600">Total Courses: {courses.length}</p>
          <Link 
            to="/admin/courses/add" 
            className="py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Add New Course
          </Link>
        </div>

        {courses.length === 0 ? (
          <div className="bg-gray-50 p-8 rounded-lg text-center">
            <p className="text-gray-600 text-lg mb-4">No courses found.</p>
            <Link 
              to="/admin/courses/add" 
              className="inline-block py-2 px-4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
            >
              Add Your First Course
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stats
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {courses.map(course => (
                    <tr key={course._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          {course.imageUrl && (
                            <img 
                              src={course.imageUrl} 
                              alt={course.title}
                              className="h-12 w-12 rounded-lg object-cover mr-4"
                              onError={(e) => {
                                e.target.style.display = 'none';
                              }}
                            />
                          )}
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {course.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              by {course.instructor}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="mb-1">
                            <span className="font-medium">Category:</span> {course.category || 'N/A'}
                          </div>
                          <div>
                            <span className="font-medium">Duration:</span> {course.duration || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          <div className="mb-1 flex items-center">
                            <span className="font-medium mr-2">Rating:</span>
                            <div className="flex items-center">
                              {course.rating > 0 ? (
                                <>
                                  <span className="text-yellow-400">★</span>
                                  <span className="ml-1">{course.rating}</span>
                                </>
                              ) : (
                                <span className="text-gray-400">No rating</span>
                              )}
                            </div>
                          </div>
                          <div>
                            <span className="font-medium">Lessons:</span> {course.lessons || 0}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"
                          onClick={() => {
                            // Add edit functionality here
                            console.log('Edit course:', course._id);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 transition-colors"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden">
              {courses.map(course => (
                <div key={course._id} className="border-b border-gray-200 p-6">
                  <div className="flex items-start space-x-4">
                    {course.imageUrl && (
                      <img 
                        src={course.imageUrl} 
                        alt={course.title}
                        className="h-16 w-16 rounded-lg object-cover flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {course.title}
                          </h3>
                          <p className="text-sm text-gray-500">by {course.instructor}</p>
                        </div>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          course.isPublished 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {course.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </div>
                      
                      <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Category:</span>
                          <div className="text-gray-900">{course.category || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Duration:</span>
                          <div className="text-gray-900">{course.duration || 'N/A'}</div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Rating:</span>
                          <div className="flex items-center text-gray-900">
                            {course.rating > 0 ? (
                              <>
                                <span className="text-yellow-400 mr-1">★</span>
                                {course.rating}
                              </>
                            ) : (
                              'No rating'
                            )}
                          </div>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Lessons:</span>
                          <div className="text-gray-900">{course.lessons || 0}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex space-x-3">
                        <button 
                          className="text-indigo-600 hover:text-indigo-900 text-sm font-medium transition-colors"
                          onClick={() => {
                            // Add edit functionality here
                            console.log('Edit course:', course._id);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-900 text-sm font-medium transition-colors"
                          onClick={() => handleDelete(course._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}