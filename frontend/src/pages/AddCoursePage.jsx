// frontend/src/pages/AddCoursePage.jsx

import React, { useState } from 'react';
import AdminHeader from '../components/common/AdminHeader';
import Footer from '../components/common/Footer';
import api from '../services/api';

export default function AddCoursePage() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructor, setInstructor] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [duration, setDuration] = useState('');
    const [rating, setRating] = useState(0);
    const [lessons, setLessons] = useState(0); 
    const [category, setCategory] = useState('');

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

        const courseData = {
            title,
            description,
            instructor,
            imageUrl,
            duration,
            rating,
            lessons: parseInt(lessons, 10), 
            category,
        };

        try {
            const response = await api.post('/admin/courses', courseData, config);
            setStatus(`Success: ${response.data.message}`);
            setTitle('');
            setDescription('');
            setInstructor('');
            setImageUrl('');
            setDuration('');
            setRating(0);
            setLessons(0);
            setCategory('');
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
                <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
                    {status && (
                        <div className={`p-4 mb-4 rounded-md ${status.startsWith('Success') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {status}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Course Title" className="w-full border p-2 rounded" required />
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" className="w-full border p-2 rounded" rows="3" required />
                        <input type="text" value={instructor} onChange={(e) => setInstructor(e.target.value)} placeholder="Instructor" className="w-full border p-2 rounded" required />
                        <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="w-full border p-2 rounded" required />
                        <input type="text" value={duration} onChange={(e) => setDuration(e.target.value)} placeholder="Duration" className="w-full border p-2 rounded" required />
                        <input type="number" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="Rating (0-5)" className="w-full border p-2 rounded" min="0" max="5" step="0.1" required />
                        <input 
                            type="number" 
                            value={lessons} 
                            onChange={(e) => setLessons(e.target.value)} 
                            placeholder="Number of Lessons" 
                            className="w-full border p-2 rounded" 
                            min="0" 
                            required 
                        />
                        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Category" className="w-full border p-2 rounded" required />

                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-indigo-600 text-white rounded hover:bg-indigo-700 disabled:opacity-50"
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
