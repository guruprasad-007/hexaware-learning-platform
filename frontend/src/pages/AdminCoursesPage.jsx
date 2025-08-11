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

  if (isLoading) {
    return (
      <>
        <AdminHeader />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          </div>
          
          <div className="text-center space-y-6 relative z-10">
            <div className="relative">
              <div className="animate-spin rounded-full h-20 w-20 border-4 border-purple-200 border-t-purple-600 mx-auto shadow-lg"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-20 w-20 border-2 border-purple-300 opacity-20"></div>
            </div>
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/30">
              <p className="text-gray-700 font-semibold text-lg">Loading Courses...</p>
              <p className="text-gray-500 text-sm mt-2">Please wait while we fetch the data</p>
            </div>
          </div>
        </div>
      </>
    );
  }
  
  if (error) {
    return (
      <>
        <AdminHeader />
        <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 flex items-center justify-center relative overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-red-400/20 to-orange-400/20 rounded-full blur-3xl animate-float-slow"></div>
            <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-red-400/15 to-pink-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          </div>
          
          <div className="text-center max-w-md relative z-10">
            <div className="bg-white/80 backdrop-blur-xl border-2 border-red-200/50 text-red-700 p-8 rounded-2xl shadow-xl">
              <div className="w-16 h-16 text-red-500 mx-auto mb-4">
                <svg className="w-full h-full animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Error Loading Courses</h2>
              <p className="font-semibold mb-6">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminHeader />
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
        
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse-gentle"></div>
        </div>

        <main className="container mx-auto p-8 relative z-10">
          
          {/* Enhanced Header Section */}
          <div className="mb-10 animate-fade-in-up">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden">
              {/* Header with gradient background */}
              <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-2xl">
                        <svg className="w-8 h-8 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-emerald-400 rounded-full border-3 border-white animate-pulse"></div>
                    </div>
                    <div>
                      <h1 className="text-4xl font-bold text-white drop-shadow-lg">
                        Course <span className="animate-gradient-text">Management</span>
                      </h1>
                      <p className="text-white/90 text-lg font-medium">Manage and organize all courses</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Stats and Actions Bar */}
              <div className="bg-white/50 backdrop-blur-sm px-8 py-6 flex items-center justify-between border-t border-white/20">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{courses.length}</span>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm font-medium">Total Courses</p>
                      <p className="text-gray-800 font-bold">Available Now</p>
                    </div>
                  </div>
                </div>
                
                <Link 
                  to="/admin/courses/add" 
                  className="group relative inline-flex items-center gap-3 py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
                >
                  <div className="absolute inset-0 bg-white/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <svg className="w-5 h-5 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="relative z-10">Add New Course</span>
                </Link>
              </div>
            </div>
          </div>

          {courses.length === 0 ? (
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 p-12 text-center animate-fade-in-up delay-200">
              <div className="max-w-md mx-auto">
                <div className="w-24 h-24 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">No Courses Found</h3>
                <p className="text-gray-600 text-lg mb-8">Get started by creating your first course</p>
                <Link 
                  to="/admin/courses/add" 
                  className="inline-flex items-center gap-3 py-3 px-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-300 font-semibold shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add Your First Course
                </Link>
              </div>
            </div>
          ) : (
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/30 overflow-hidden animate-fade-in-up delay-400">
              
              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200/50">
                  <thead className="bg-gradient-to-r from-gray-50/80 to-white/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Course</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Details</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Stats</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200/50">
                    {courses.map((course, index) => (
                      <tr key={course._id} className="group bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-4">
                            <div className="relative">
                              {course.imageUrl ? (
                                <img 
                                  src={course.imageUrl} 
                                  alt={course.title}
                                  className="h-16 w-16 rounded-xl object-cover shadow-lg group-hover:scale-110 transition-transform duration-300"
                                  onError={(e) => {
                                    e.target.style.display = 'none';
                                  }}
                                />
                              ) : (
                                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                  </svg>
                                </div>
                              )}
                            </div>
                            <div>
                              <p className="text-lg font-semibold text-gray-800 group-hover:text-purple-700 transition-colors duration-300">
                                {course.title}
                              </p>
                              <p className="text-gray-600 font-medium">by {course.instructor}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-2">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium text-gray-700">Category:</span>
                              <span className="text-sm text-gray-900 bg-purple-50 px-2 py-1 rounded-full">{course.category || 'N/A'}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-sm text-gray-900 font-medium">{course.duration || 'N/A'}</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <div className="flex items-center">
                                {course.rating > 0 ? (
                                  <>
                                    <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                    <span className="ml-1 text-sm font-semibold text-gray-900">{course.rating}</span>
                                  </>
                                ) : (
                                  <span className="text-sm text-gray-400">No rating</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                              </svg>
                              <span className="text-sm text-gray-900 font-medium">{course.lessons || 0} lessons</span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-semibold ${
                            course.isPublished 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                              : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                          }`}>
                            <div className={`w-2 h-2 rounded-full mr-2 ${course.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            {course.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </td>
                        <td className="px-6 py-6">
                          <div className="flex items-center space-x-3">
                            <button 
                              className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-lg hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 transition-all duration-300 font-medium border border-indigo-200/50 hover:border-indigo-300"
                              onClick={() => {
                                // Add edit functionality here
                                console.log('Edit course:', course._id);
                              }}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button 
                              className="group inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-lg hover:from-red-100 hover:to-pink-100 hover:text-red-700 transition-all duration-300 font-medium border border-red-200/50 hover:border-red-300"
                              onClick={() => handleDelete(course._id)}
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Card View */}
              <div className="lg:hidden">
                {courses.map((course, index) => (
                  <div key={course._id} className="border-b border-gray-200/50 p-6 animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
                    <div className="flex items-start space-x-4">
                      <div className="relative flex-shrink-0">
                        {course.imageUrl ? (
                          <img 
                            src={course.imageUrl} 
                            alt={course.title}
                            className="h-20 w-20 rounded-xl object-cover shadow-lg"
                            onError={(e) => {
                              e.target.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                            </svg>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{course.title}</h3>
                            <p className="text-sm text-gray-600 font-medium">by {course.instructor}</p>
                          </div>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold flex-shrink-0 ${
                            course.isPublished 
                              ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 border border-green-200' 
                              : 'bg-gradient-to-r from-yellow-100 to-amber-100 text-yellow-700 border border-yellow-200'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full mr-2 ${course.isPublished ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                            {course.isPublished ? 'Published' : 'Draft'}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-purple-50 p-3 rounded-lg">
                            <span className="text-xs font-medium text-purple-600 block mb-1">Category</span>
                            <span className="text-sm font-semibold text-gray-900">{course.category || 'N/A'}</span>
                          </div>
                          <div className="bg-indigo-50 p-3 rounded-lg">
                            <span className="text-xs font-medium text-indigo-600 block mb-1">Duration</span>
                            <span className="text-sm font-semibold text-gray-900">{course.duration || 'N/A'}</span>
                          </div>
                          <div className="bg-yellow-50 p-3 rounded-lg">
                            <span className="text-xs font-medium text-yellow-600 block mb-1">Rating</span>
                            <div className="flex items-center">
                              {course.rating > 0 ? (
                                <>
                                  <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  <span className="text-sm font-semibold text-gray-900">{course.rating}</span>
                                </>
                              ) : (
                                <span className="text-sm text-gray-400">No rating</span>
                              )}
                            </div>
                          </div>
                          <div className="bg-emerald-50 p-3 rounded-lg">
                            <span className="text-xs font-medium text-emerald-600 block mb-1">Lessons</span>
                            <span className="text-sm font-semibold text-gray-900">{course.lessons || 0}</span>
                          </div>
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600 rounded-lg hover:from-indigo-100 hover:to-purple-100 hover:text-indigo-700 transition-all duration-300 font-medium border border-indigo-200/50"
                            onClick={() => {
                              // Add edit functionality here
                              console.log('Edit course:', course._id);
                            }}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                            Edit
                          </button>
                          <button 
                            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-red-50 to-pink-50 text-red-600 rounded-lg hover:from-red-100 hover:to-pink-100 hover:text-red-700 transition-all duration-300 font-medium border border-red-200/50"
                            onClick={() => handleDelete(course._id)}
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
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

        {/* Enhanced Custom CSS */}
        <style jsx>{`
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
          
          @keyframes pulse-gentle {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.8; }
          }
          
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes gradient-text {
            0%, 100% {
              background-size: 200% 200%;
              background-position: left center;
            }
            50% {
              background-size: 200% 200%;
              background-position: right center;
            }
          }
          
          /* Animation Classes */
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
          
          .animate-pulse-gentle {
            animation: pulse-gentle 3s ease-in-out infinite;
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .animate-gradient-text {
            background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
            background-size: 400% 400%;
            animation: gradient-text 4s ease infinite;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          /* Delay Classes */
          .delay-200 { animation-delay: 200ms; }
          .delay-400 { animation-delay: 400ms; }

          /* Enhanced glass morphism effects */
          .glass-effect {
            background: rgba(255, 255, 255, 0.25);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.18);
          }

          /* Custom scrollbar */
          ::-webkit-scrollbar {
            width: 8px;
            height: 8px;
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

          /* Enhanced focus states for accessibility */
          button:focus,
          select:focus {
            outline: 2px solid #8b5cf6;
            outline-offset: 2px;
          }

          /* Responsive improvements */
          @media (max-width: 768px) {
            .animate-fade-in-up {
              animation-delay: 0ms !important;
            }
          }

          /* Accessibility improvements */
          @media (prefers-reduced-motion: reduce) {
            .animate-float-slow,
            .animate-float-reverse,
            .animate-pulse-slow,
            .animate-bounce-gentle,
            .animate-pulse-gentle,
            .animate-gradient-text {
              animation: none;
            }
            
            .transform {
              transform: none !important;
            }
          }
        `}</style>
      </div>
      <Footer />
    </>
  );
}