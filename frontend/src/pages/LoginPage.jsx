import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Send login request to backend
      const { data } = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Save JWT token and user role
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);
      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error)

      alert(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 overflow-hidden">
      
      {/* Abstract Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-r from-indigo-400/15 to-pink-400/15 rounded-full blur-3xl animate-pulse delay-500"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-purple-300/30 rounded-3xl rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/4 left-1/4 w-24 h-24 border-2 border-indigo-300/30 rounded-full animate-bounce-slow"></div>
        <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-gradient-to-r from-purple-300/20 to-blue-300/20 transform rotate-12 animate-float"></div>
        
        {/* Abstract Lines */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
              <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1"/>
            </linearGradient>
          </defs>
          <path d="M0,20 Q50,60 100,30" stroke="url(#gradient1)" strokeWidth="0.5" fill="none" className="animate-pulse"/>
          <path d="M0,80 Q30,40 100,70" stroke="url(#gradient1)" strokeWidth="0.3" fill="none" className="animate-pulse delay-700"/>
        </svg>
      </div>

      {/* Login Form Container */}
      <div className="relative z-10 bg-white/10 backdrop-blur-2xl p-10 rounded-3xl shadow-2xl w-full max-w-md border border-white/20 transform hover:scale-105 transition-all duration-500">
        
        {/* Decorative Elements */}
        <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full opacity-80 animate-ping"></div>
        <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-60 animate-pulse"></div>
        
        {/* Header */}
        <div className="text-center mb-8 relative">
          <div className="inline-block relative">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h1>
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur opacity-25 animate-pulse"></div>
          </div>
          <p className="text-gray-600/80 text-lg font-medium">
            Enter your digital universe
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700/80 mb-2 transform group-focus-within:text-purple-600 transition-colors duration-200">
              Email Address
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 outline-none transition-all duration-300 placeholder-gray-500/60 text-gray-800"
            />
          </div>

          <div className="relative group">
            <label className="block text-sm font-semibold text-gray-700/80 mb-2 transform group-focus-within:text-purple-600 transition-colors duration-200">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-sm focus:ring-2 focus:ring-purple-400/50 focus:border-purple-400/50 outline-none transition-all duration-300 placeholder-gray-500/60 text-gray-800"
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="relative w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105 transition-all duration-300"
          >
            Enter the Experience
          </button>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600/80 text-sm">
            New to our universe?{" "}
            <Link
              to="/signup"
              className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 relative group"
            >
              Create Account
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </p>
        </div>
      </div>

      {/* Additional Animated Elements */}
      <div className="absolute bottom-10 left-10 opacity-30">
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
