import { Link } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ChatbotComponent from "../components/chatbot/ChatbotComponent";
import { Play, ArrowRight, CheckCircle, Zap, BookOpen, Users, Award, Star, TrendingUp, Globe } from "lucide-react";

// Enhanced Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, gradient, delay, image }) => (
  <div 
    className={`group relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-2xl hover:shadow-3xl border border-white/30 transform hover:-translate-y-6 hover:scale-105 transition-all duration-700 animate-fade-in-up cursor-pointer overflow-hidden`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Background Image */}
    <div className="absolute top-0 right-0 w-32 h-32 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
      <img 
        src={image}
        alt={title}
        className="w-full h-full object-cover rounded-2xl"
      />
    </div>
    
    {/* Floating particles */}
    <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
    <div className="absolute bottom-6 left-6 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse delay-700"></div>
    
    <div className="relative z-10">
      <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 shadow-lg`}>
        <Icon className="w-8 h-8 text-white group-hover:animate-bounce" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
        {description}
      </p>
      
      {/* Hover indicator */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <ArrowRight className="w-5 h-5 text-purple-600 group-hover:translate-x-2 transition-transform duration-300" />
      </div>
    </div>
  </div>
);

// Enhanced Stat Card Component
const StatCard = ({ value, label, icon: Icon, color, delay }) => (
  <div 
    className={`group relative bg-gradient-to-br ${color} backdrop-blur-xl p-6 rounded-2xl shadow-xl hover:shadow-2xl border border-white/20 transform hover:-translate-y-3 hover:scale-105 transition-all duration-500 animate-fade-in-up overflow-hidden`}
    style={{ animationDelay: `${delay}ms` }}
  >
    {/* Background glow effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Floating particles */}
    <div className="absolute top-2 right-2 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
    <div className="absolute bottom-3 left-3 w-1 h-1 bg-white/40 rounded-full animate-pulse delay-700"></div>
    
    <div className="relative z-10 flex flex-col items-center text-center space-y-3">
      <div className="relative">
        <div className="p-3 bg-white/15 rounded-xl backdrop-blur-sm">
          <Icon className="w-8 h-8 text-white drop-shadow-lg group-hover:animate-bounce transition-all duration-500" />
        </div>
        <div className="absolute inset-0 bg-white/20 rounded-xl blur-lg group-hover:animate-pulse"></div>
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl font-bold text-white drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {value}
        </p>
        <p className="text-sm text-white/90 font-medium group-hover:text-white transition-colors duration-300">
          {label}
        </p>
      </div>
    </div>
  </div>
);

// Enhanced Brand Logo Component
const BrandLogo = ({ src, alt, delay }) => (
  <div 
    className="bg-white/80 backdrop-blur-sm rounded-xl p-4 w-32 h-20 flex items-center justify-center hover:bg-white transition-all duration-500 transform hover:scale-110 hover:-translate-y-2 animate-fade-in-up shadow-lg hover:shadow-xl border border-white/30"
    style={{animationDelay: `${delay}ms`}}
  >
    <img 
      src={src}
      alt={alt}
      className="h-8 w-auto filter grayscale hover:grayscale-0 transition-all duration-500"
    />
  </div>
);

export default function HomePage() {
  return (
    <>
      <Header />
      
      {/* Hero Section with Enhanced Background */}
      <main className="relative bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 min-h-screen overflow-hidden">
        
        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main floating orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse-gentle"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/4 right-1/5 w-32 h-32 border-2 border-purple-200/40 rounded-3xl animate-spin-very-slow"></div>
          <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-indigo-200/30 rotate-45 animate-bounce-gentle"></div>
          
          {/* Animated particles */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-16 w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500"></div>
          
          {/* Animated SVG lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <path d="M0,200 Q500,600 1000,300" stroke="url(#lineGradient1)" strokeWidth="3" fill="none">
              <animate attributeName="stroke-dasharray" dur="8s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
            <path d="M0,800 Q300,400 1000,700" stroke="url(#lineGradient2)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" dur="10s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
          </svg>
        </div>

        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            
            {/* Enhanced Left Content */}
            <div className="lg:w-1/2 space-y-8 animate-fade-in-up">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                  <span className="inline-block animate-fade-in-up">Meet your new</span>{' '}
                  <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 animate-gradient-text animate-fade-in-up delay-300">
                    AI learning
                  </span>{' '}
                  <span className="inline-block animate-fade-in-up delay-500">companion</span>
                </h1>
                
                <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-700">
                  Unlock your potential with a learning path as unique as you are. We transform education into an engaging adventure, helping you master skills with interactive practice and personalized guidance.</p>

                  <p className="text-xl text-gray-600 leading-relaxed max-w-lg animate-fade-in-up delay-700">This isn't just learning; it's your personal evolution, built to fit your goals and lifestyle. Start your journey today and define your future.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-1000">
                <Link 
                  to="/login" 
                  className="group inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-500 animate-pulse-gentle"
                >
                  <span className="mr-2 transform group-hover:translate-x-1 transition-transform duration-300">Get Started Today</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
                
                <button className="group inline-flex items-center justify-center px-8 py-4 bg-white/80 backdrop-blur-sm text-gray-700 font-semibold rounded-xl border-2 border-gray-200/50 hover:border-purple-300 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                  <Play className="w-5 h-5 mr-2 group-hover:animate-spin" />
                  Watch Demo
                </button>
              </div>
            </div>

            {/* Enhanced Right Content - Dashboard Preview */}
            <div className="lg:w-1/2 relative animate-fade-in-right">
              <div className="relative bg-gradient-to-br from-white/70 to-white/50 backdrop-blur-xl rounded-3xl p-8 shadow-2xl transform hover:rotate-1 transition-transform duration-700 animate-float border border-white/30">
                
                {/* Main Hero Image with Dashboard Preview */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden mb-6 transform hover:scale-105 transition-transform duration-500 border border-white/40">
                  <div className="h-64 relative overflow-hidden">
                    <img 
                      src="https://plus.unsplash.com/premium_photo-1683121710572-7723bd2e235d?q=80&w=1632&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="AI Learning Platform Dashboard"
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Enhanced overlay with multiple gradients */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/30 via-transparent to-indigo-500/20"></div>
                    <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-blue-500/10 to-purple-500/20"></div>
                    
                    {/* Animated floating elements */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-gradient-to-r from-purple-400 to-indigo-400 rounded-full animate-ping opacity-80"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse delay-500 opacity-80"></div>
                    <div className="absolute top-1/2 left-6 w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full animate-bounce opacity-60"></div>
                  </div>
                </div>

                {/* Enhanced Floating Achievement Card */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl p-4 max-w-xs animate-float-card hover:scale-110 transition-transform duration-300 border border-white/50">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center animate-pulse-gentle shadow-lg">
                      <CheckCircle className="w-6 h-6 text-white animate-bounce" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">Excellent Work!</p>
                      <p className="text-sm text-gray-600">Keep up the progress</p>
                    </div>
                  </div>
                </div>

                {/* Enhanced Progress Card */}
                <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl p-4 max-w-xs animate-float-card-reverse hover:scale-110 transition-transform duration-300 border border-white/50">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-purple-600" />
                      <h3 className="font-bold text-gray-800">Learning Progress</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">JavaScript</span>
                        <span className="text-purple-600 font-bold">85%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden shadow-inner">
                        <div className="bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-600 h-3 rounded-full animate-progress-bar shadow-lg" style={{width: '85%'}}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Enhanced Video Preview */}
                <div className="absolute top-1/2 right-6 transform translate-y-1/2 bg-white/90 backdrop-blur-xl rounded-xl shadow-xl p-3 hover:scale-110 transition-all duration-300 animate-wiggle-gentle border border-white/50">
                  <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden shadow-inner">
                    <img 
                      src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Video Preview"
                      className="w-full h-full object-cover rounded opacity-80"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:animate-pulse">
                        <Play className="w-4 h-4 text-purple-600 ml-0.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Trust Section */}
        <div className="bg-white/70 backdrop-blur-xl py-20 relative border-t border-white/30">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-indigo-50/50 animate-gradient-x"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-12 animate-fade-in-up">
              <p className="text-gray-600 text-lg mb-4 font-medium">
                Trusted by over 10,000+ learners and companies around the world
              </p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6 items-center justify-items-center">
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg"
                alt="Google"
                delay={0}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg"
                alt="Microsoft"
                delay={100}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
                alt="Amazon"
                delay={200}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
                alt="Netflix"
                delay={300}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg"
                alt="Spotify"
                delay={400}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg"
                alt="Airbnb"
                delay={500}
              />
              <BrandLogo 
                src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
                alt="Uber"
                delay={600}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Section */}
        <div className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-xl py-20 relative overflow-hidden border-t border-white/30">
          {/* Background elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-r from-purple-400/5 to-indigo-400/5 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-r from-blue-400/5 to-purple-400/5 rounded-full blur-3xl animate-float-reverse"></div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16 animate-fade-in-up">
              <h2 className="text-4xl font-bold text-gray-800 mb-4 animate-gradient-text">
                Impressive Learning Results
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Join thousands of learners who have transformed their careers with our platform
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              <StatCard
                value="10K+"
                label="Active Learners"
                icon={Users}
                color="from-blue-500/90 to-indigo-600/90"
                delay={0}
              />
              <StatCard
                value="500+"
                label="Expert Courses"
                icon={BookOpen}
                color="from-purple-500/90 to-violet-600/90"
                delay={200}
              />
              <StatCard
                value="95%"
                label="Success Rate"
                icon={Award}
                color="from-emerald-500/90 to-green-600/90"
                delay={400}
              />
              <StatCard
                value="4.8/5"
                label="Student Rating"
                icon={Star}
                color="from-orange-500/90 to-red-500/90"
                delay={600}
              />
            </div>
          </div>
        </div>

        {/* Enhanced Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Main floating orbs */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-float-slow"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/15 to-purple-400/15 rounded-full blur-3xl animate-float-reverse"></div>
          <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/10 to-pink-300/10 rounded-full blur-2xl animate-pulse-slow"></div>
          
          {/* Additional floating elements */}
          <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/20 to-orange-300/20 rounded-full blur-2xl animate-bounce-gentle"></div>
          <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/15 to-teal-300/15 rounded-full blur-2xl animate-pulse-gentle"></div>
          <div className="absolute top-60 left-40 w-40 h-40 bg-gradient-to-br from-violet-400/15 to-purple-500/10 rounded-full blur-2xl animate-float"></div>
          <div className="absolute bottom-40 right-1/3 w-56 h-56 bg-gradient-to-tl from-indigo-400/12 to-blue-500/8 rounded-full blur-3xl animate-pulse-gentle"></div>
          
          {/* Geometric shapes */}
          <div className="absolute top-1/4 right-1/5 w-32 h-32 border-2 border-purple-200/40 rounded-3xl animate-spin-very-slow"></div>
          <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-indigo-200/30 rotate-45 animate-bounce-gentle"></div>
          <div className="absolute top-1/2 left-1/4 w-20 h-20 border-2 border-violet-300/35 rounded-2xl animate-spin-slow transform rotate-12"></div>
          <div className="absolute bottom-1/4 right-1/6 w-28 h-28 border border-blue-200/25 rounded-full animate-pulse-slow"></div>
          <div className="absolute top-3/4 left-10 w-16 h-16 border-2 border-purple-300/30 rotate-45 animate-wiggle-gentle"></div>
          <div className="absolute top-1/5 right-1/3 w-36 h-36 border border-indigo-200/20 rounded-3xl animate-float-slow transform rotate-45"></div>
          
          {/* More geometric elements */}
          <div className="absolute top-2/3 right-1/4 w-14 h-14 bg-gradient-to-r from-purple-400/20 to-transparent rotate-45 animate-spin-slow"></div>
          <div className="absolute bottom-1/5 left-1/3 w-22 h-22 bg-gradient-to-br from-indigo-300/15 to-transparent rounded-full animate-bounce-gentle"></div>
          <div className="absolute top-1/6 left-1/5 w-18 h-18 bg-gradient-to-tl from-violet-400/18 to-transparent rotate-12 animate-pulse-gentle"></div>
          
          {/* Animated particles */}
          <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
          <div className="absolute bottom-20 left-16 w-3 h-3 bg-indigo-400 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-10 w-1 h-1 bg-blue-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute top-1/2 right-1/5 w-2 h-2 bg-violet-500 rounded-full animate-ping delay-300"></div>
          <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-purple-600 rounded-full animate-pulse delay-800"></div>
          <div className="absolute top-3/4 right-12 w-2 h-2 bg-indigo-500 rounded-full animate-ping delay-1200"></div>
          <div className="absolute bottom-10 right-1/3 w-1 h-1 bg-blue-500 rounded-full animate-pulse delay-400"></div>
          <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-violet-400 rounded-full animate-ping delay-600"></div>
          
          {/* Enhanced Animated SVG lines */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1000 1000" preserveAspectRatio="none">
            <defs>
              <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.4"/>
                <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="lineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="lineGradient3" x1="0%" y1="50%" x2="100%" y2="50%">
                <stop offset="0%" stopColor="rgb(139, 92, 246)" stopOpacity="0.25"/>
                <stop offset="100%" stopColor="rgb(59, 130, 246)" stopOpacity="0.1"/>
              </linearGradient>
              <linearGradient id="lineGradient4" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="rgb(139, 92, 246)" stopOpacity="0.08"/>
              </linearGradient>
              <linearGradient id="lineGradient5" x1="100%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" stopColor="rgb(79, 70, 229)" stopOpacity="0.2"/>
                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.05"/>
              </linearGradient>
            </defs>
            
            {/* Original animated paths */}
            <path d="M0,200 Q500,600 1000,300" stroke="url(#lineGradient1)" strokeWidth="3" fill="none">
              <animate attributeName="stroke-dasharray" dur="8s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
            <path d="M0,800 Q300,400 1000,700" stroke="url(#lineGradient2)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" dur="10s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
            
            {/* Additional animated paths */}
            <path d="M0,400 Q800,200 1000,600" stroke="url(#lineGradient3)" strokeWidth="2" fill="none">
              <animate attributeName="stroke-dasharray" dur="12s" repeatCount="indefinite" values="2000 0;0 2000;2000 0"/>
            </path>
            <path d="M200,0 Q600,500 400,1000" stroke="url(#lineGradient4)" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" dur="15s" repeatCount="indefinite" values="0 1500;1500 0;0 1500"/>
            </path>
            <path d="M1000,100 Q200,300 0,500" stroke="url(#lineGradient5)" strokeWidth="2.5" fill="none">
              <animate attributeName="stroke-dasharray" dur="9s" repeatCount="indefinite" values="1800 0;0 1800;1800 0"/>
            </path>
            <path d="M800,0 Q400,800 600,1000" stroke="url(#lineGradient1)" strokeWidth="1" fill="none">
              <animate attributeName="stroke-dasharray" dur="14s" repeatCount="indefinite" values="0 1600;1600 0;0 1600"/>
            </path>
            <path d="M0,600 Q1000,400 500,1000" stroke="url(#lineGradient2)" strokeWidth="1.5" fill="none">
              <animate attributeName="stroke-dasharray" dur="11s" repeatCount="indefinite" values="1700 0;0 1700;1700 0"/>
            </path>
            
            {/* Curved connector lines */}
            <path d="M100,100 Q500,300 900,200" stroke="url(#lineGradient3)" strokeWidth="1" fill="none" opacity="0.6">
              <animate attributeName="stroke-dasharray" dur="16s" repeatCount="indefinite" values="0 1200;1200 0;0 1200"/>
            </path>
            <path d="M900,800 Q300,600 100,900" stroke="url(#lineGradient4)" strokeWidth="1" fill="none" opacity="0.6">
              <animate attributeName="stroke-dasharray" dur="13s" repeatCount="indefinite" values="1300 0;0 1300;1300 0"/>
            </path>
            
            {/* Diagonal flowing lines */}
            <path d="M0,0 Q500,500 1000,1000" stroke="url(#lineGradient5)" strokeWidth="1" fill="none" opacity="0.4">
              <animate attributeName="stroke-dasharray" dur="18s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
            </path>
            <path d="M1000,0 Q500,500 0,1000" stroke="url(#lineGradient1)" strokeWidth="1" fill="none" opacity="0.4">
              <animate attributeName="stroke-dasharray" dur="17s" repeatCount="indefinite" values="2000 0;0 2000;2000 0"/>
            </path>
          </svg>
        </div>
      </main>
      
      <Footer />

      {/* Integrated Chatbot Component */}
      <ChatbotComponent />

      {/* Enhanced Custom CSS for animations */}
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
        
        /* Animation Classes */
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
        
        /* Delay Classes */
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

        /* Enhanced glass morphism effects */
        .glass-effect {
          background: rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.18);
        }

        /* Smooth scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Custom scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
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

        /* Enhanced hover effects */
        .hover-glow:hover {
          box-shadow: 0 0 30px rgba(147, 51, 234, 0.3);
        }

        /* Responsive design improvements */
        @media (max-width: 768px) {
          .animate-fade-in-up,
          .animate-fade-in-right {
            animation-delay: 0ms !important;
          }
          
          .text-5xl {
            font-size: 2.5rem;
          }
          
          .lg\\:text-6xl {
            font-size: 3rem;
          }
        }

        /* Performance optimizations */
        * {
          will-change: auto;
        }

        .animate-float-slow,
        .animate-float-reverse,
        .animate-float,
        .animate-pulse-slow {
          will-change: transform, opacity;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .animate-float-slow,
          .animate-float-reverse,
          .animate-float,
          .animate-float-card,
          .animate-float-card-reverse,
          .animate-pulse-slow,
          .animate-spin-very-slow,
          .animate-bounce-gentle,
          .animate-wiggle,
          .animate-wiggle-gentle,
          .animate-pulse-gentle,
          .animate-gradient-x,
          .animate-gradient-text,
          .animate-progress-bar,
          .animate-shimmer,
          .animate-spin-slow {
            animation: none;
          }
          
          .transform {
            transform: none !important;
          }
        }

        /* Enhanced focus states for accessibility */
        button:focus,
        a:focus {
          outline: 2px solid #8b5cf6;
          outline-offset: 2px;
        }

        /* Loading state improvements */
        .loading-skeleton {
          background: linear-gradient(90deg, #f0f0f0 25%, transparent 37%, #f0f0f0 63%);
          background-size: 400% 100%;
          animation: shimmer 1.4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}