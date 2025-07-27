import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section */}
      <main className="relative bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 min-h-screen overflow-hidden">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Floating Orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-32 right-32 w-80 h-80 bg-gradient-to-r from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Geometric Shapes */}
          <div className="absolute top-1/4 right-1/5 w-32 h-32 border-2 border-purple-200/40 rounded-3xl animate-spin-very-slow"></div>
          <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-indigo-200/30 rotate-45 animate-bounce-gentle"></div>
          <div className="absolute top-2/3 right-2/3 w-16 h-16 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rotate-12 animate-wiggle"></div>
          
          {/* Abstract Particles */}
          <div className="absolute top-10 right-10">
            <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          </div>
          <div className="absolute bottom-20 left-16">
            <div className="w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
          </div>
          <div className="absolute top-1/3 left-10">
            <div className="w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500"></div>
          </div>
          
          {/* Animated Lines */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q500,600 1000,300" stroke="url(#lineGradient1)" strokeWidth="2" fill="none" className="animate-draw-line">
              <animate attributeName="stroke-dasharray" dur="8s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
            <path d="M0,800 Q300,400 1000,700" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none" className="animate-draw-line delay-1000">
              <animate attributeName="stroke-dasharray" dur="10s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  <span className="inline-block animate-fade-in-up">Meet your new</span>{' '}
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-gradient-x animate-fade-in-up delay-300">
                    AI learning
                  </span>{' '}
                  <span className="inline-block animate-fade-in-up delay-500">companion</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-700">
                  Personalized Learning Platform is the interactive way to practice your 
                  skills and get customized learning paths designed just for you.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-1000">
                <Link 
                  to="/login" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-pulse-gentle"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">Get Started Today</span>
                  <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border-2 border-gray-200 hover:border-purple-300 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <svg className="w-5 h-5 mr-2 group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Right Content - Enhanced Image Area */}
            <div className="lg:w-1/2 relative animate-fade-in-right">
              <div className="relative bg-gradient-to-br from-yellow-200 via-purple-200 to-blue-200 rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-700 animate-float">
                
                {/* Main Image Placeholder with Animation */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-6 transform hover:scale-105 transition-transform duration-500">
                  <div className="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-10">
                      <div className="absolute top-4 left-4 w-8 h-8 bg-purple-400 rounded-full animate-ping"></div>
                      <div className="absolute bottom-4 right-4 w-6 h-6 bg-indigo-400 rounded-full animate-pulse delay-500"></div>
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 border border-purple-300 rounded-full animate-spin-slow"></div>
                    </div>
                    
                    <div className="text-center space-y-4 relative z-10">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full mx-auto flex items-center justify-center animate-bounce-gentle hover:animate-spin transition-all duration-300">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <p className="text-gray-500 font-medium animate-pulse">Insert your hero image here</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Floating Cards */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 max-w-xs animate-float-card hover:scale-110 transition-transform duration-300">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center animate-pulse-gentle">
                      <svg className="w-6 h-6 text-white animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">Excellent Work!</p>
                      <p className="text-sm text-gray-600">Keep up the great progress</p>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-md rounded-xl shadow-lg p-4 max-w-xs animate-float-card-reverse hover:scale-110 transition-transform duration-300">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-gray-800">Learning Progress</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>JavaScript</span>
                        <span className="text-purple-600 font-medium">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 relative overflow-hidden">
                        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-2 rounded-full animate-progress-bar" style={{width: '85%'}}></div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Video Placeholder */}
                <div className="absolute top-1/2 right-6 transform translate-y-1/2 bg-white/90 backdrop-blur-md rounded-lg shadow-lg p-3 hover:scale-110 transition-all duration-300 animate-wiggle-gentle">
                  <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 animate-pulse"></div>
                    <svg className="w-6 h-6 text-gray-400 animate-pulse hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Section */}
        <div className="bg-white/80 backdrop-blur-sm py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 animate-gradient-x"></div>
          <div className="container mx-auto px-4 relative z-10">
            <p className="text-center text-gray-600 text-lg mb-12 font-medium animate-fade-in-up">
              Trusted by over 10,000+ learners and companies around the world
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center justify-items-center opacity-60">
              {[...Array(7)].map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-200/80 backdrop-blur-sm rounded-lg p-4 w-24 h-12 flex items-center justify-center hover:bg-gray-300/80 transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 animate-fade-in-up"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <span className="text-xs font-semibold text-gray-500">LOGO</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Enhanced Features Section */}
        <div className="bg-gray-50/80 backdrop-blur-sm py-20 relative overflow-hidden">
          {/* Background Animation Elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-indigo-400/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-float-reverse"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-gradient-text">
                Why choose our platform?
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experience personalized learning like never before with AI-powered recommendations
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: "M13 10V3L4 14h7v7l9-11h-7z",
                  title: "Smart Learning",
                  description: "AI analyzes your progress and adapts to your learning style for maximum efficiency",
                  gradient: "from-blue-500 to-indigo-600",
                  delay: "0"
                },
                {
                  icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                  title: "Personalized Path",
                  description: "Get customized learning journeys based on your goals and current skill level",
                  gradient: "from-purple-500 to-pink-600",
                  delay: "200"
                },
                {
                  icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1",
                  title: "Track Progress",
                  description: "Monitor your learning journey with detailed analytics and achievement tracking",
                  gradient: "from-green-500 to-teal-600",
                  delay: "400"
                }
              ].map((feature, index) => (
                <div 
                  key={index}
                  className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 hover:rotate-1 animate-fade-in-up"
                  style={{animationDelay: `${feature.delay}ms`}}
                >
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300 animate-pulse-gentle`}>
                    <svg className="w-8 h-8 text-white group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={feature.icon} />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes float-card {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(2deg); }
        }
        
        @keyframes float-card-reverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-2deg); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        @keyframes spin-very-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        @keyframes wiggle {
          0%, 100% { transform: rotate(12deg); }
          25% { transform: rotate(15deg); }
          75% { transform: rotate(9deg); }
        }
        
        @keyframes wiggle-gentle {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
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
        
        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes gradient-x {
          0%, 100% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(100%);
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
        
        @keyframes progress-bar {
          0% { width: 0%; }
          100% { width: 85%; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }
        
        .animate-float-reverse {
          animation: float-reverse 8s ease-in-out infinite;
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        .animate-float-card {
          animation: float-card 5s ease-in-out infinite;
        }
        
        .animate-float-card-reverse {
          animation: float-card-reverse 6s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-spin-very-slow {
          animation: spin-very-slow 20s linear infinite;
        }
        
        .animate-bounce-gentle {
          animation: bounce-gentle 3s ease-in-out infinite;
        }
        
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        
        .animate-wiggle-gentle {
          animation: wiggle-gentle 4s ease-in-out infinite;
        }
        
        .animate-pulse-gentle {
          animation: pulse-gentle 3s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
        }
        
        .animate-gradient-x {
          animation: gradient-x 15s ease infinite;
        }
        
        .animate-gradient-text {
          background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
          background-size: 400% 400%;
          animation: gradient-text 4s ease infinite;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        .animate-progress-bar {
          animation: progress-bar 2s ease-out;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        .delay-300 {
          animation-delay: 300ms;
        }
        
        .delay-500 {
          animation-delay: 500ms;
        }
        
        .delay-700 {
          animation-delay: 700ms;
        }
        
        .delay-1000 {
          animation-delay: 1000ms;
        }
      `}</style>
    </>
  );
}