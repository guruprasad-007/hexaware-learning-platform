import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Linkedin, 
  Instagram,
  BookOpen,
  Users,
  Award,
  Heart,
  ArrowUp
} from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <style jsx>{`
        /* Modern Footer Styles */
        .modern-footer {
          position: relative;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
          color: #e5e7eb;
          margin-top: auto;
          overflow: hidden;
        }

        .footer-gradient-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .gradient-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          opacity: 0.3;
          animation: float 6s ease-in-out infinite;
        }

        .footer-orb-1 {
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          top: -150px;
          right: -150px;
          animation: float 8s ease-in-out infinite;
        }

        .footer-orb-2 {
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(72, 219, 251, 0.1), rgba(10, 189, 227, 0.1));
          bottom: -100px;
          left: -100px;
          animation: float 10s ease-in-out infinite reverse;
        }

        .footer-orb-3 {
          width: 150px;
          height: 150px;
          background: radial-gradient(circle, rgba(255, 159, 243, 0.1), rgba(243, 104, 224, 0.1));
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: float 6s ease-in-out infinite;
          animation-delay: 2s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(120deg); }
          66% { transform: translateY(10px) rotate(240deg); }
        }

        .footer-content {
          position: relative;
          z-index: 10;
        }

        .footer-main {
          padding: 4rem 2rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 3rem;
          margin-bottom: 3rem;
        }

        /* Brand Section */
        .brand-section {
          grid-column: span 2;
        }
        @media (max-width: 1024px) {
          .brand-section {
            grid-column: span 1;
          }
        }
        @media (max-width: 768px) {
          .brand-section {
            grid-column: span 1; /* Reset for smaller screens */
          }
        }

        .footer-logo {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .footer-logo .logo-wrapper {
          position: relative;
          margin-right: 1rem;
        }

        .footer-logo-image {
          width: 3rem;
          height: 3rem;
          object-fit: contain;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.25rem;
          backdrop-filter: blur(10px);
          border: 2px solid rgba(255, 255, 255, 0.1);
        }

        .footer-logo .logo-glow {
          position: absolute;
          top: -4px;
          left: -4px;
          right: -4px;
          bottom: -4px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 50%;
          z-index: -1;
          filter: blur(8px);
          opacity: 0.3;
        }

        .brand-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          background: linear-gradient(45deg, #fff, #e5e7eb);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .brand-tagline {
          font-size: 0.875rem;
          opacity: 0.8;
          margin: 0.25rem 0 0;
        }

        .brand-description {
          line-height: 1.6;
          opacity: 0.9;
          margin-bottom: 1.5rem;
          font-size: 0.95rem;
        }

        .social-links {
          display: flex;
          gap: 1rem;
          justify-content: flex-start;
        }
        @media (max-width: 480px) {
          .social-links {
            justify-content: center;
          }
        }

        .social-link {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 2.5rem;
          height: 2.5rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #e5e7eb;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .social-link:hover {
          background: rgba(102, 126, 234, 0.2);
          border-color: rgba(102, 126, 234, 0.3);
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.2);
        }

        /* Footer Sections */
        .footer-section {
          min-width: 0;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1.5rem;
          color: white;
          position: relative;
        }

        .section-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 2rem;
          height: 2px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 1px;
        }

        .footer-links {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-links li {
          margin-bottom: 0.75rem;
        }

        .footer-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          display: inline-block;
          position: relative;
        }

        .footer-link::before {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(45deg, #667eea, #764ba2);
          transition: width 0.3s ease;
        }

        .footer-link:hover {
          color: white;
          transform: translateX(4px);
        }

        .footer-link:hover::before {
          width: 100%;
        }

        /* Contact Info */
        .contact-info {
          margin-bottom: 2rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }

        .contact-link,
        .contact-text {
          color: #d1d5db;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .contact-link:hover {
          color: white;
        }

        /* Newsletter */
        /* Newsletter */
.newsletter {
  /* Removed background, border-radius, and border to eliminate the box */
  /* background: rgba(255, 255, 255, 0.05); */
  /* padding: 1.5rem; */
  /* border-radius: 12px; */
  /* border: 1px solid rgba(255, 255, 255, 0.1); */
  backdrop-filter: blur(10px);
}

        .newsletter-title {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: white;
        }

        .newsletter-form {
          display: flex;
          gap: 0.5rem;
        }

        .newsletter-input {
          flex: 1;
          padding: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          color: white;
          font-size: 0.875rem;
          transition: all 0.3s ease;
        }

        .newsletter-input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        .newsletter-input:focus {
          outline: none;
          border-color: #667eea;
          background: rgba(255, 255, 255, 0.15);
        }

        .newsletter-btn {
          padding: 0.75rem 1.5rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          border-radius: 8px;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
        }

        /* Footer Stats */
        .footer-stats {
          background: rgba(255, 255, 255, 0.05);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: 2rem;
          margin: 0 2rem;
          backdrop-filter: blur(10px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
          max-width: 1400px;
          margin: 0 auto;
        }
        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          text-align: left;
        }
        @media (max-width: 480px) {
          .stat-item {
            flex-direction: column;
            text-align: center;
            gap: 0.5rem;
          }
        }

        .stat-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border-radius: 12px;
          color: white;
          flex-shrink: 0;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: white;
        }

        .stat-label {
          font-size: 0.875rem;
          opacity: 0.8;
          margin: 0.25rem 0 0;
        }

        /* Footer Bottom */
        .footer-bottom {
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: 1.5rem 2rem;
        }

        .footer-bottom-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1400px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 1rem;
        }
        @media (max-width: 768px) {
          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
          }
        }

        .copyright p {
          margin: 0;
          font-size: 0.875rem;
          opacity: 0.8;
        }

        .powered-by {
          font-size: 0.75rem !important;
          opacity: 0.6 !important;
          font-style: italic;
        }

        .footer-bottom-links {
          display: flex;
          gap: 2rem;
        }
        @media (max-width: 768px) {
          .footer-bottom-links {
            gap: 1rem;
          }
        }
        @media (max-width: 480px) {
          .footer-bottom-links {
            flex-direction: column;
            gap: 0.5rem;
          }
        }

        .bottom-link {
          color: #d1d5db;
          text-decoration: none;
          font-size: 0.875rem;
          transition: color 0.3s ease;
        }

        .bottom-link:hover {
          color: white;
        }

        /* Scroll to Top Button */
        .scroll-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 3rem;
          height: 3rem;
          background: linear-gradient(45deg, #667eea, #764ba2);
          border: none;
          border-radius: 50%;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
          z-index: 50; /* Ensure it's above other content */
        }
        @media (max-width: 768px) {
          .scroll-to-top {
            bottom: 1rem;
            right: 1rem;
          }
        }

        .scroll-to-top:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.4);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .footer-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 2rem;
          }
        }

        @media (max-width: 768px) {
          .footer-main {
            padding: 3rem 1rem 1rem;
          }
          
          .footer-stats {
            margin: 0 1rem;
            padding: 1.5rem;
          }
          
          .stats-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 1.5rem;
          }
          
          .footer-bottom {
            padding: 1rem;
          }
        }

        @media (max-width: 480px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .newsletter-form {
            flex-direction: column;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .footer-orb-1,
          .footer-orb-2,
          .footer-orb-3 {
            animation: none;
          }
        }

        /* High contrast mode */
        @media (prefers-contrast: high) {
          .modern-footer {
            background: #000;
            border-top: 2px solid #fff;
          }
          
          .social-link,
          .newsletter-input {
            border: 2px solid #fff;
          }
          
          .newsletter-btn {
            background: #fff;
            color: #000;
            border: 2px solid #fff;
          }
        }
      `}</style>

      <footer className="modern-footer">
        <div className="footer-gradient-bg">
          <div className="gradient-orb footer-orb-1"></div>
          <div className="gradient-orb footer-orb-2"></div>
          <div className="gradient-orb footer-orb-3"></div>
        </div>

        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            <div className="footer-grid">
              {/* Brand Section */}
              <div className="footer-section brand-section">
                <div className="footer-logo">
                  <div className="logo-wrapper">
                    <img 
                      src="/logo.png" 
                      alt="E-GURU Logo" 
                      className="footer-logo-image"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    <div className="logo-glow"></div>
                  </div>
                  <div className="brand-text">
                    <h3 className="brand-name">E-GURU</h3>
                    <p className="brand-tagline">Empowering Learning Excellence</p>
                  </div>
                </div>
                <p className="brand-description">
                  Transform your learning journey with our cutting-edge educational platform. 
                  Join thousands of learners achieving their goals through innovative, 
                  personalized education experiences.
                </p>
                <div className="social-links">
                  <a href="#" className="social-link" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                  <a href="#" className="social-link" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                  <a href="https://www.linkedin.com/in/guru-prasad-818116254/" className="social-link" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                  <a href="https://www.instagram.com/iam_jb_guru/" className="social-link" aria-label="Instagram">
                    <Instagram size={20} />
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div className="footer-section">
                <h4 className="section-title">Quick Links</h4>
                <ul className="footer-links">
                  <li><Link to="/" className="footer-link">Home</Link></li>
                  <li><Link to="/courses" className="footer-link">All Courses</Link></li>
                  <li><Link to="/dashboard" className="footer-link">Dashboard</Link></li>
                  <li><Link to="/about" className="footer-link">About Us</Link></li>
                  <li><Link to="/contact" className="footer-link">Contact</Link></li>
                  <li><Link to="/blog" className="footer-link">Blog</Link></li>
                </ul>
              </div>

              {/* Categories */}
              <div className="footer-section">
                <h4 className="section-title">Categories</h4>
                <ul className="footer-links">
                  <li><Link to="/courses/technology" className="footer-link">Technology</Link></li>
                  <li><Link to="/courses/business" className="footer-link">Business</Link></li>
                  <li><Link to="/courses/design" className="footer-link">Design</Link></li>
                  <li><Link to="/courses/marketing" className="footer-link">Marketing</Link></li>
                  <li><Link to="/courses/development" className="footer-link">Development</Link></li>
                  <li><Link to="/courses/data-science" className="footer-link">Data Science</Link></li>
                </ul>
              </div>

              {/* Support */}
              <div className="footer-section">
                <h4 className="section-title">Support</h4>
                <ul className="footer-links">
                  <li><Link to="/help" className="footer-link">Help Center</Link></li>
                  <li><Link to="/faq" className="footer-link">FAQ</Link></li>
                  <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
                  <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
                  <li><Link to="/community" className="footer-link">Community</Link></li>
                  <li><Link to="/feedback" className="footer-link">Feedback</Link></li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="footer-section">
                <h4 className="section-title">Get in Touch</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <Mail size={16} />
                    <a href="mailto:support@e-guru.com" className="contact-link">
                      support@e-guru.com
                    </a>
                  </div>
                  <div className="contact-item">
                    <Phone size={16} />
                    <a href="tel:+1234567890" className="contact-link">
                      +91 8247319091
                    </a>
                  </div>
                  <div className="contact-item">
                    <MapPin size={16} />
                    <span className="contact-text">
                      D2-69, Pinnakini Nagar, Shriharikota, Andhra Pradesh
                    </span>
                  </div>
                </div>
                
                {/* Newsletter Signup */}
                <div className="newsletter">
                  <h5 className="newsletter-title">Stay Updated</h5>
                  <div className="newsletter-form">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="newsletter-input"
                    />
                    <button className="newsletter-btn">
                      Subscribe
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="footer-stats">
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-icon">
                  <Users size={24} />
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">50,000+</h4>
                  <p className="stat-label">Active Learners</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <BookOpen size={24} />
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">1,200+</h4>
                  <p className="stat-label">Courses Available</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Award size={24} />
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">25,000+</h4>
                  <p className="stat-label">Certificates Earned</p>
                </div>
              </div>
              <div className="stat-item">
                <div className="stat-icon">
                  <Heart size={24} />
                </div>
                <div className="stat-content">
                  <h4 className="stat-number">98%</h4>
                  <p className="stat-label">Satisfaction Rate</p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>© 2025 E-GURU Learning Platform. All rights reserved.</p>
                <p className="powered-by">Empowering minds, shaping futures.</p>
              </div>
              <div className="footer-bottom-links">
                <Link to="/accessibility" className="bottom-link">Accessibility</Link>
                <Link to="/cookies" className="bottom-link">Cookie Policy</Link>
                <Link to="/sitemap" className="bottom-link">Sitemap</Link>
              </div>
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button 
            className="scroll-to-top"
            onClick={scrollToTop}
            aria-label="Scroll to top"
          >
            <ArrowUp size={20} />
          </button>
        </div>
      </footer>
    </>
  );
}