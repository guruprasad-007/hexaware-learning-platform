// frontend/src/components/common/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { User, LogOut, BookOpen, Calendar, Mic } from 'lucide-react';
import api from '../../services/api';
// Corrected import path: Go up one directory (from 'common') then down into 'voice'
import VoiceAssistantComponent from "../voice/VoiceAssistantComponent.jsx";// <--- CORRECTED IMPORT PATH
import '../../styles/Header.css'; // CSS file for styling

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [enrolledCoursesCount, setEnrolledCoursesCount] = useState(0);
    const [loginStreak, setLoginStreak] = useState(7); // Placeholder for days logged in
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const userResponse = await api.get('/auth/profile', config);
                    setUser(userResponse.data);

                    const coursesResponse = await api.get('/courses/enrolled', config);
                    setEnrolledCoursesCount(coursesResponse.data.length);
                } catch (error) {
                    console.error("Failed to fetch user data for header:", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                }
            }
            setLoading(false);
        };
        fetchUserData();
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsDropdownOpen(false);
        navigate("/login");
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const userRole = localStorage.getItem('role');

    return (
        <React.Fragment>
            <header className="header">
                <div className="header-background">
                    <div className="floating-element floating-element-1"></div>
                    <div className="floating-element floating-element-2"></div>
                    <div className="floating-element floating-element-3"></div>
                </div>

                <div className="header-container">
                    <div className="header-logo">
                        <Link to="/" className="logo-link">
                            <div className="logo-icon" style={{ borderRadius: '50%' }}>
                                <img 
                                    src="/logo.png" 
                                    alt="E-GURU Logo" 
                                    className="logo-svg"
                                    style={{
                                        width: '3rem',
                                        height: '3rem',
                                        objectFit: 'contain',
                                        backgroundColor: 'transparent',
                                        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
                                        mixBlendMode: 'multiply'
                                    }}
                                    onError={(e) => {
                                        console.log('Logo failed to load from:', e.target.src);
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className="logo-indicator"></div>
                            </div>
                        </Link>
                        <h1 className="header-title">E-GURU</h1>
                    </div>

                    <nav className="header-nav">
                        <Link to="/" className="nav-link">
                            <div className="nav-shimmer"></div>
                            <span className="nav-content">
                                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Home
                            </span>
                        </Link>

                        <Link to="/courses" className="nav-link">
                            <div className="nav-shimmer"></div>
                            <span className="nav-content">
                                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                                Courses
                            </span>
                        </Link>

                        <Link to="/dashboard" className="nav-link">
                            <div className="nav-shimmer"></div>
                            <span className="nav-content">
                                <svg className="nav-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                                Dashboard
                            </span>
                        </Link>

                        {/* Profile Link with User Name */}
                        <Link to="/" className="nav-link">
                            <div className="nav-shimmer"></div>
                            <span className="nav-content">
                                <User className="nav-icon" />
                                {user ? user.fullName || user.name : 'Profile'}
                            </span>
                        </Link>
                    </nav>
                </div>
            </header>

             {/* Voice Assistant positioned as a floating button in bottom right */}
            <div className="voice-assistant-floating">
                <VoiceAssistantComponent />
            </div>
        </React.Fragment>
    );
}