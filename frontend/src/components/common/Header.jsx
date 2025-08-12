// frontend/src/components/common/Header.jsx

import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import { User, LogOut, BookOpen, Calendar, Mic, Home, BarChart3, GraduationCap, Menu, X } from 'lucide-react';
import api from '../../services/api';
// Corrected import path: Go up one directory (from 'common') then down into 'voice'
import VoiceAssistantComponent from "../voice/VoiceAssistantComponent.jsx";// <--- CORRECTED IMPORT PATH
import '../../styles/Header.css'; // CSS file for styling

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const dropdownRef = useRef(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const config = { headers: { Authorization: `Bearer ${token}` } };
                    const userResponse = await api.get('/auth/profile', config);
                    setUser(userResponse.data);
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const isActive = (path) => {
        return location.pathname === path;
    };

    const userRole = localStorage.getItem('role');

    const navigationItems = [
        { path: '/', label: 'Home', icon: Home },
        { path: '/courses', label: 'Courses', icon: GraduationCap },
        { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    ];

    return (
        <React.Fragment>
            <header className="modern-header">
                <div className="header-gradient-bg">
                    <div className="gradient-orb orb-1"></div>
                    <div className="gradient-orb orb-2"></div>
                    <div className="gradient-orb orb-3"></div>
                </div>

                <div className="header-content">
                    {/* Logo Section */}
                    <div className="logo-section">
                        <Link to="/" className="logo-container">
                            <div className="logo-wrapper">
                                <img
                                    src="/logo.png"
                                    alt="E-GURU Logo"
                                    className="logo-image"
                                    onError={(e) => {
                                        console.log('Logo failed to load from:', e.target.src);
                                        e.target.style.display = 'none';
                                    }}
                                />
                                <div className="logo-glow"></div>
                            </div>
                            <div className="brand-text">
                                <h1 className="brand-name">E-GURU</h1>
                                <span className="brand-tagline">Learning Excellence</span>
                            </div>
                        </Link>
                    </div>

                    {/* Right Side Container - Navigation, Voice Assistant, and User Section */}
                    <div className="right-section">
                        {/* Desktop Navigation */}
                        <nav className="desktop-nav">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
                                    >
                                        <div className="nav-item-content">
                                            <IconComponent className="nav-icon" size={18} />
                                            <span className="nav-text">{item.label}</span>
                                            <div className="nav-indicator"></div>
                                        </div>
                                    </Link>
                                );
                            })}
                        </nav>



                        {/* User Section */}
                        <div className="user-section">
                            {/* User Profile Dropdown */}
                            <div className="user-profile" ref={dropdownRef}>
                                <button
                                    className="profile-trigger"
                                    onClick={toggleDropdown}
                                    aria-expanded={isDropdownOpen}
                                >
                                    <div className="profile-avatar">
                                        {user ? (
                                            <img
                                                src={user.avatar || '/default-avatar.png'}
                                                alt={user.fullName || user.name}
                                                className="avatar-image"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        ) : null}
                                        <User size={20} className="avatar-fallback" />
                                        <div className="online-indicator"></div>
                                    </div>
                                    <div className="profile-info">
                                        <span className="user-name">
                                            {user ? (user.fullName || user.name) : 'Guest'}
                                        </span>
                                        <span className="user-role">{userRole || 'Student'}</span>
                                    </div>
                                </button>

                                {isDropdownOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-header">
                                            <div className="user-details">
                                                <h4>{user ? (user.fullName || user.name) : 'Guest'}</h4>
                                                <p>{user?.email}</p>
                                            </div>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <div className="dropdown-items">
                                            <Link to="/dashboard" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                                <User size={16} />
                                                <span>My Profile</span>
                                            </Link>
                                            <Link to="/courses" className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
                                                <BookOpen size={16} />
                                                <span>My Courses</span>
                                            </Link>
                                            <button className="dropdown-item logout-item" onClick={handleLogout}>
                                                <LogOut size={16} />
                                                <span>Sign Out</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Mobile Menu Button */}
                            <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="mobile-nav">
                        <div className="mobile-nav-content">
                            {navigationItems.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <Link
                                        key={item.path}
                                        to={item.path}
                                        className={`mobile-nav-item ${isActive(item.path) ? 'active' : ''}`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <IconComponent size={20} />
                                        <span>{item.label}</span>
                                    </Link>
                                );
                            })}
                            <div className="mobile-nav-divider"></div>
                            <Link to="/profile" className="mobile-nav-item" onClick={() => setIsMobileMenuOpen(false)}>
                                <User size={20} />
                                <span>Profile</span>
                            </Link>
                            <button className="mobile-nav-item logout" onClick={handleLogout}>
                                <LogOut size={20} />
                                <span>Sign Out</span>
                            </button>
                        </div>
                    </div>
                )}
            </header>

            {/* Voice Assistant positioned as a floating button in bottom right */}
            <div className="voice-assistant-floating">
                <VoiceAssistantComponent />
            </div>
        </React.Fragment>
    );
}