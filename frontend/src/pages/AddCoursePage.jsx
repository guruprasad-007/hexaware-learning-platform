// frontend/src/pages/AddCoursePage.jsx (CORRECTED)
import React, { useState } from 'react';
import AdminHeader from '../components/common/AdminHeader';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function AddCoursePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    // --- New State Variables for new fields ---
    const [imageUrl, setImageUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [rating, setRating] = useState(0); //
    const [lessons, setLessons] = useState(0);
    // --- End New State Variables ---
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setStatus('');

        const token = localStorage.getItem('token');
        if (!token) {
            setStatus('Error: You are not logged in as admin.');
            setLoading(false);
            return;
        }

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // Update the courseData object to include the new fields
        const courseData = { 
            title, 
            description, 
            instructor,
            imageUrl,
            duration,
            rating,
            lessons
        };

        try {
            const response = await api.post('/admin/courses', courseData, config);
            setStatus(`Success: ${response.data.message}`);
            // Clear the form after successful submission
            setTitle('');
            setDescription('');
            setInstructor('');
            setImageUrl('');
            setDuration('');
            setRating(0);
            setLessons(0);
        } catch (err) {
            setStatus(`Error: ${err.response?.data?.message || 'Failed to add course.'}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <AdminHeader />
            <main className="container mx-auto p-8">
                <h1 className="text-3xl font-bold mb-8">Add New Course</h1>
                <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
                    {status && (
                        <div className={`p-4 mb-4 rounded-md ${status.startsWith('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Course Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                rows="4"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Instructor</label>
                            <input
                                type="text"
                                value={instructor}
                                onChange={(e) => setInstructor(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        {/* --- New Input Fields --- */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Image URL</label>
                            <input
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Duration (e.g., 10 hrs)</label>
                            <input
                                type="text"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rating (0-5)</label>
                            <input
                                type="number"
                                value={rating}
                                onChange={(e) => setRating(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                min="0"
                                max="5"
                                step="0.1"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Number of Lessons</label>
                            <input
                                type="number"
                                value={lessons}
                                onChange={(e) => setLessons(e.target.value)}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                                min="0"
                                required
                            />
                        </div>
                        {/* --- End New Input Fields --- */}
                        <button
                            type="submit"
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            disabled={loading}
                        >
                            {loading ? 'Adding...' : 'Add Course'}
                        </button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}