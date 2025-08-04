// frontend/src/pages/AdminDashboardPage.jsx (COMPLETE AND MODIFIED)

import React, { useState, useEffect } from 'react';
import AdminHeader from '../components/common/AdminHeader'; // Use the new admin header
import Footer from '../components/common/Footer';
import api from '../services/api'; // Use your core API instance

export default function AdminDashboardPage() {
    const [stats, setStats] = useState({ totalUsers: 0, totalCourses: 0 });
    const [users, setUsers] = useState([]);
    const [allCourses, setAllCourses] = useState([]); // State for all courses for the dropdown
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    // Helper to get token and config for protected routes
    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error("No token found");
        }
        return {
            headers: { Authorization: `Bearer ${token}` }
        };
    };

    // Fetch all data for the dashboard on initial load
    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const config = getAuthHeaders();
                
                // Fetch stats data
                const statsResponse = await api.get('/admin/dashboard-stats', config);
                setStats(statsResponse.data);

                // Fetch all users
                const usersResponse = await api.get('/admin/users', config);
                setUsers(usersResponse.data);

                // Fetch all available courses for the dropdown
                const coursesResponse = await api.get('/admin/courses', config);
                setAllCourses(coursesResponse.data);

            } catch (err) {
                setError('Failed to fetch dashboard data. Please log in as admin.');
            } finally {
                setLoading(false);
            }
        };
        fetchDashboardData();
    }, []);

    // Handle the action of adding a course to a user
    const handleAddCourse = async (userId, selectedCourseId) => {
        if (!selectedCourseId) {
            alert("Please select a course to add.");
            return;
        }
        try {
            const config = getAuthHeaders();
            // Call the enroll-course API endpoint
            await api.post('/admin/enroll-course', { userId, courseId: selectedCourseId }, config);

            // Re-fetch users to update the list and reflect the new course
            const usersResponse = await api.get('/admin/users', config);
            setUsers(usersResponse.data);
            alert("Course added successfully!");
        } catch (err) {
            setError('Failed to add course. Please try again.');
        }
    };

    if (loading) return <div>Loading Admin Dashboard...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <AdminHeader />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

                {/* Stats section */}
                <div className="flex space-x-8 mb-8">
                    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                        <h2 className="text-xl font-semibold text-gray-600">Total No. of Users</h2>
                        <p className="text-4xl font-bold mt-2">{stats.totalUsers}</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md flex-1">
                        <h2 className="text-xl font-semibold text-gray-600">Total No. of Courses</h2>
                        <p className="text-4xl font-bold mt-2">{stats.totalCourses}</p>
                    </div>
                </div>

                {/* User list table */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-4">User List</h2>
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead>
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Enrolled Courses</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Days Logged In</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map(user => (
                                <tr key={user._id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.fullName}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {user.enrolledCourses.map(course => course.title).join(', ')}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">{user.loginHistory.length}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {/* Dropdown for selecting a course to add */}
                                        <select
                                            onChange={(e) => handleAddCourse(user._id, e.target.value)}
                                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                            defaultValue=""
                                        >
                                            <option value="" disabled>Add a Course</option>
                                            {allCourses.map(course => (
                                                <option key={course._id} value={course._id}>
                                                    {course.title}
                                                </option>
                                            ))}
                                        </select>
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