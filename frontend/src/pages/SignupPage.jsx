import { Link } from "react-router-dom";
import "./SignUpPage.css"; // We'll create this CSS file for animations

export default function SignUpPage() {
  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-purple-400/15 to-indigo-400/15 rounded-full blur-3xl orb-animation"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl orb-reverse-animation"></div>
        <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/10 to-pink-400/10 rounded-full blur-3xl float-diagonal-animation"></div>
        
        {/* Particles */}
        <div className="absolute top-20 right-20">
          <div className="w-3 h-3 bg-purple-400 rounded-full particle-dance-animation"></div>
        </div>
        <div className="absolute bottom-32 left-24">
          <div className="w-4 h-4 bg-indigo-400 rounded-full particle-float-animation"></div>
        </div>
      </div>

      {/* Form Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transition-all duration-300 form-entrance-animation">
        {/* Decorative Elements */}
        <div className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-70 orb-small-animation"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Join the Future
            </h1>
          </div>
          <p className="text-gray-600/80 text-lg font-medium fade-in-up-animation delay-300">
            Start your personalized learning adventure
          </p>
          
          {/* Icon */}
          <div className="mt-6 flex justify-center fade-in-up-animation delay-500">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl backdrop-blur-sm border border-white/30 flex items-center justify-center rotate-12 hover:rotate-0 transition-transform duration-700 icon-breathe-animation">
                <svg className="w-10 h-10 text-purple-600 icon-pulse-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="space-y-6">
          {/* Name Field */}
          <div className="relative group fade-in-up-animation delay-700">
            <label className="block text-sm font-semibold text-gray-700/80 mb-2 transform group-focus-within:text-purple-600 transition-colors duration-300">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2 bounce-gentle-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Full Name
              </span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your full name"
                className="w-full px-5 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 outline-none transition-all duration-300 placeholder-gray-500/60 text-gray-800 hover:bg-white/30"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="relative group fade-in-up-animation delay-900">
            <label className="block text-sm font-semibold text-gray-700/80 mb-2 transform group-focus-within:text-purple-600 transition-colors duration-300">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2 pulse-gentle-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                Email Address
              </span>
            </label>
            <div className="relative">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-5 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 outline-none transition-all duration-300 placeholder-gray-500/60 text-gray-800 hover:bg-white/30"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="relative group fade-in-up-animation delay-1100">
            <label className="block text-sm font-semibold text-gray-700/80 mb-2 transform group-focus-within:text-purple-600 transition-colors duration-300">
              <span className="inline-flex items-center">
                <svg className="w-4 h-4 mr-2 wiggle-gentle-animation" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </span>
            </label>
            <div className="relative">
              <input
                type="password"
                placeholder="Create a strong password"
                className="w-full px-5 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 outline-none transition-all duration-300 placeholder-gray-500/60 text-gray-800 hover:bg-white/30"
              />
            </div>
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden fade-in-up-animation delay-1500"
          >
            <span className="relative z-10 inline-flex items-center justify-center">
              Begin Your Journey
              <svg className="w-5 h-5 ml-2 transition-all duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center fade-in-up-animation delay-1700">
          <p className="text-gray-600/80 text-sm">
            Already part of our universe?{" "}
            <Link 
              to="/login" 
              className="font-semibold text-purple-600 hover:text-purple-700 transition-colors duration-300 relative group"
            >
              Sign In
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}