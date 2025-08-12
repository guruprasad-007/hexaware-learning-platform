// frontend/src/pages/CodeCompilerPage.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { Play, Code, Terminal, Zap, CheckCircle, AlertCircle, RefreshCw, Maximize2, Settings, BookOpen } from "lucide-react";
import axios from 'axios';

export default function CodeCompilerPage() {
    const { lang } = useParams();
    const [selectedLanguage, setSelectedLanguage] = useState(lang);
    const [code, setCode] = useState('');
    const [output, setOutput] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const languages = [
        { name: 'Python', value: 'python', color: 'from-yellow-400 to-green-500', icon: '🐍' },
        { name: 'C', value: 'c', color: 'from-blue-500 to-indigo-600', icon: '⚡' },
        { name: 'Java', value: 'java', color: 'from-red-500 to-orange-600', icon: '☕' },
        { name: 'Ruby', value: 'ruby', color: 'from-red-600 to-pink-600', icon: '💎' },
        // Add more languages as needed
    ];

    useEffect(() => {
        const getDefaultCode = (language) => {
            switch (language) {
                case 'python':
                    return 'print("Hello, Python!")';
                case 'c':
                    return '#include <stdio.h>\n\nint main() {\n  printf("Hello, C!");\n  return 0;\n}';
                case 'java':
                    return 'public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}';
                case 'ruby':
                    return 'puts "Hello, Ruby!"';
                default:
                    return '// Select a language from the dropdown menu';
            }
        };
        setCode(getDefaultCode(selectedLanguage));
    }, [selectedLanguage]);

    const handleRunCode = async () => {
        setIsLoading(true);
        setOutput('');
        setError('');
        
        try {
            // This is a placeholder for a real API call to a code execution service.
            // You would need a backend endpoint that forwards the code to a service
            // like Judge0, Piston, or a custom execution environment.
            const response = await axios.post('http://localhost:5000/api/compiler/run', {
                language: selectedLanguage,
                code
            });
            setOutput(response.data.output);
        } catch (err) {
            console.error("Code execution error:", err);
            setError(err.response?.data?.error || 'Failed to run code. Please check your API endpoint.');
        } finally {
            setIsLoading(false);
        }
    };

    const currentLanguage = languages.find(lang => lang.value === selectedLanguage);

    return (
        <>
            <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-50 relative overflow-hidden">
                
                {/* Enhanced Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {/* Main floating orbs */}
                    <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-purple-400/15 to-indigo-400/15 rounded-full blur-3xl animate-float-slow"></div>
                    <div className="absolute top-1/3 -right-20 w-80 h-80 bg-gradient-to-bl from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-float-reverse"></div>
                    <div className="absolute bottom-20 left-1/4 w-64 h-64 bg-gradient-to-tr from-indigo-300/8 to-pink-300/8 rounded-full blur-2xl animate-pulse-slow"></div>
                    
                    {/* Additional floating elements */}
                    <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-r from-yellow-300/15 to-orange-300/15 rounded-full blur-2xl animate-bounce-gentle"></div>
                    <div className="absolute bottom-1/3 right-20 w-48 h-48 bg-gradient-to-l from-emerald-300/12 to-teal-300/12 rounded-full blur-2xl animate-pulse-gentle"></div>
                    
                    {/* Geometric shapes */}
                    <div className="absolute top-1/4 right-1/5 w-32 h-32 border-2 border-purple-200/30 rounded-3xl animate-spin-very-slow"></div>
                    <div className="absolute bottom-1/3 left-1/6 w-24 h-24 border border-indigo-200/25 rotate-45 animate-bounce-gentle"></div>
                    
                    {/* Animated particles */}
                    <div className="absolute top-10 right-10 w-2 h-2 bg-purple-400/70 rounded-full animate-ping"></div>
                    <div className="absolute bottom-20 left-16 w-3 h-3 bg-indigo-400/70 rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/3 left-10 w-1 h-1 bg-blue-400/70 rounded-full animate-ping delay-500"></div>
                    
                    {/* Animated SVG lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-15" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="codeLineGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                                <stop offset="0%" stopColor="rgb(147, 51, 234)" stopOpacity="0.3"/>
                                <stop offset="100%" stopColor="rgb(79, 70, 229)" stopOpacity="0.1"/>
                            </linearGradient>
                            <linearGradient id="codeLineGradient2" x1="100%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="rgb(59, 130, 246)" stopOpacity="0.25"/>
                                <stop offset="100%" stopColor="rgb(147, 51, 234)" stopOpacity="0.1"/>
                            </linearGradient>
                        </defs>
                        <path d="M0,200 Q500,600 1000,300" stroke="url(#codeLineGradient1)" strokeWidth="2" fill="none">
                            <animate attributeName="stroke-dasharray" dur="12s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
                        </path>
                        <path d="M0,800 Q300,400 1000,700" stroke="url(#codeLineGradient2)" strokeWidth="1.5" fill="none">
                            <animate attributeName="stroke-dasharray" dur="15s" repeatCount="indefinite" values="0 2000;2000 0;0 2000"/>
                        </path>
                    </svg>
                </div>

                <Header />
                
                <main className="flex-1 p-6 max-w-7xl mx-auto w-full relative z-10">
                    {/* Enhanced Header Section */}
                    <div className="text-center mb-12 animate-fade-in-up">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl shadow-xl mb-6 animate-float">
                            <Code className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 mb-4 animate-gradient-text">
                            Code & Learn
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up delay-300">
                            Write, compile, and execute your code in real-time with our interactive coding environment
                        </p>
                    </div>

                    {/* Language Selector Section */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl mb-8 border border-white/30 animate-fade-in-up delay-500">
                        <div className="flex items-center justify-between flex-wrap gap-6">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Settings className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-800">Language</h3>
                                        <p className="text-sm text-gray-600">Select your programming language</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-4">
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => setSelectedLanguage(e.target.value)}
                                    className="px-6 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200/50 focus:outline-none focus:ring-4 focus:ring-purple-500/30 focus:border-purple-500 transition-all duration-300 text-gray-800 font-medium shadow-lg hover:shadow-xl min-w-[200px]"
                                >
                                    {languages.map((langOption) => (
                                        <option key={langOption.value} value={langOption.value}>
                                            {langOption.icon} {langOption.name}
                                        </option>
                                    ))}
                                </select>

                                {/* Language Info Card */}
                                {currentLanguage && (
                                    <div className="hidden lg:flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-3 shadow-lg border border-white/50">
                                        <div className={`w-8 h-8 bg-gradient-to-r ${currentLanguage.color} rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                            {currentLanguage.icon}
                                        </div>
                                        <span className="text-gray-700 font-medium">{currentLanguage.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Main Coding Interface */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                        {/* Enhanced Code Editor */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 animate-fade-in-up delay-700 relative overflow-hidden group">
                            {/* Background glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                            
                            {/* Floating particles */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full animate-ping"></div>
                            <div className="absolute bottom-6 left-6 w-1 h-1 bg-indigo-400/40 rounded-full animate-pulse delay-700"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:animate-bounce">
                                            <Code className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Code Editor</h2>
                                            <p className="text-sm text-gray-600">Write your code here</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button className="p-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors duration-200">
                                            <Maximize2 className="w-4 h-4 text-gray-600" />
                                        </button>
                                        <button className="p-2 bg-gray-100/80 hover:bg-gray-200/80 rounded-lg transition-colors duration-200">
                                            <RefreshCw className="w-4 h-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <textarea
                                        className="w-full h-96 bg-gray-900/95 backdrop-blur-sm text-green-400 p-6 rounded-2xl font-mono text-sm resize-none focus:outline-none focus:ring-4 focus:ring-purple-500/30 transition-all duration-300 shadow-inner border border-gray-700/50 hover:shadow-2xl"
                                        value={code}
                                        onChange={(e) => setCode(e.target.value)}
                                        placeholder="Write your code here..."
                                        style={{
                                            lineHeight: '1.6',
                                            tabSize: '2'
                                        }}
                                    ></textarea>
                                    
                                    {/* Code editor decorations */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                    
                                    {/* Line numbers effect */}
                                    <div className="absolute left-2 top-14 text-gray-600 text-xs font-mono leading-relaxed pointer-events-none opacity-50">
                                        {code.split('\n').map((_, index) => (
                                            <div key={index} className="h-5">
                                                {index + 1}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        {/* Enhanced Output Console */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 animate-fade-in-up delay-900 relative overflow-hidden group">
                            {/* Background glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>
                            
                            {/* Floating particles */}
                            <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-400/30 rounded-full animate-ping delay-300"></div>
                            <div className="absolute bottom-6 left-6 w-1 h-1 bg-purple-400/40 rounded-full animate-pulse delay-1000"></div>
                            
                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg group-hover:animate-bounce">
                                            <Terminal className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <h2 className="text-2xl font-bold text-gray-800">Output Console</h2>
                                            <p className="text-sm text-gray-600">Execution results</p>
                                        </div>
                                    </div>
                                    
                                    {/* Status Indicator */}
                                    <div className="flex items-center gap-2">
                                        {isLoading && (
                                            <div className="flex items-center gap-2 text-blue-600">
                                                <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
                                                <span className="text-sm font-medium">Running</span>
                                            </div>
                                        )}
                                        {error && (
                                            <div className="flex items-center gap-2 text-red-600">
                                                <AlertCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Error</span>
                                            </div>
                                        )}
                                        {output && !error && !isLoading && (
                                            <div className="flex items-center gap-2 text-green-600">
                                                <CheckCircle className="w-4 h-4" />
                                                <span className="text-sm font-medium">Success</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="relative">
                                    <pre className="w-full h-96 bg-gray-900/95 backdrop-blur-sm text-white p-6 rounded-2xl font-mono text-sm overflow-auto shadow-inner border border-gray-700/50 hover:shadow-2xl transition-shadow duration-300">
                                        {isLoading ? (
                                            <div className="flex items-center gap-3 text-blue-400">
                                                <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                                                <span className="animate-pulse">Executing code...</span>
                                            </div>
                                        ) : error ? (
                                            <div className="text-red-400">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <AlertCircle className="w-4 h-4" />
                                                    <span className="font-semibold">Execution Error</span>
                                                </div>
                                                <div className="pl-6 border-l-2 border-red-500/30">
                                                    {error}
                                                </div>
                                            </div>
                                        ) : output ? (
                                            <div className="text-green-400">
                                                <div className="flex items-center gap-2 mb-2 text-gray-400">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span className="font-semibold">Output:</span>
                                                </div>
                                                <div className="pl-6 border-l-2 border-green-500/30 text-white">
                                                    {output}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-gray-400 flex items-center justify-center h-full">
                                                <div className="text-center">
                                                    <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                                    <p>Your output will appear here</p>
                                                    <p className="text-sm mt-2 opacity-70">Click "Run Code" to execute</p>
                                                </div>
                                            </div>
                                        )}
                                    </pre>
                                    
                                    {/* Console decorations */}
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Action Section */}
                    <div className="text-center animate-fade-in-up delay-1100">
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/30 inline-block">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <button
                                    onClick={handleRunCode}
                                    className="group flex items-center gap-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-500 shadow-xl hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-2 hover:scale-105 min-w-[200px] justify-center"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            <span className="font-semibold">Running...</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:animate-bounce">
                                                <Play className="w-4 h-4 ml-0.5" />
                                            </div>
                                            <span className="font-semibold">Run Code</span>
                                            <Zap className="w-5 h-5 group-hover:animate-pulse" />
                                        </>
                                    )}
                                </button>
                                
                                <div className="flex items-center gap-4 text-gray-600">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
                                            <BookOpen className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium">Interactive Learning</span>
                                    </div>
                                    <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <span className="text-sm font-medium">Real-time Execution</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tips Section */}
                    <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-xl rounded-3xl p-8 border border-purple-200/30 animate-fade-in-up delay-1300">
                        <div className="text-center mb-6">
                            <h3 className="text-2xl font-bold text-gray-800 mb-2">💡 Quick Tips</h3>
                            <p className="text-gray-600">Make the most out of your coding experience</p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:bg-white/70 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Code className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Syntax Highlighting</h4>
                                <p className="text-sm text-gray-600">Code editor with built-in syntax highlighting for better readability</p>
                            </div>
                            
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:bg-white/70 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Terminal className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Real-time Output</h4>
                                <p className="text-sm text-gray-600">See your code results instantly with detailed error messages</p>
                            </div>
                            
                            <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/30 hover:bg-white/70 transition-all duration-300 transform hover:-translate-y-1">
                                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <Zap className="w-6 h-6 text-white" />
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Multi-Language</h4>
                                <p className="text-sm text-gray-600">Support for multiple programming languages in one place</p>
                            </div>
                        </div>
                    </div>
                </main>
                
                <Footer />
            </div>

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
                
                .animate-pulse-slow {
                    animation: pulse-slow 4s ease-in-out infinite;
                }
                
                .animate-spin-very-slow {
                    animation: spin-very-slow 20s linear infinite;
                }
                
                .animate-bounce-gentle {
                    animation: bounce-gentle 3s ease-in-out infinite;
                }
                
                .animate-pulse-gentle {
                    animation: pulse-gentle 3s ease-in-out infinite;
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out forwards;
                }
                
                .animate-gradient-text {
                    background: linear-gradient(-45deg, #6366f1, #8b5cf6, #06b6d4, #10b981);
                    background-size: 400% 400%;
                    animation: gradient-text 4s ease infinite;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
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
                
                .delay-900 {
                    animation-delay: 900ms;
                }
                
                .delay-1000 {
                    animation-delay: 1000ms;
                }
                
                .delay-1100 {
                    animation-delay: 1100ms;
                }
                
                .delay-1300 {
                    animation-delay: 1300ms;
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

                /* Code editor specific styles */
                .font-mono {
                    font-family: 'Fira Code', 'Monaco', 'Cascadia Code', 'Roboto Mono', monospace;
                }

                /* Enhanced focus states for accessibility */
                button:focus,
                select:focus,
                textarea:focus {
                    outline: 2px solid #8b5cf6;
                    outline-offset: 2px;
                }

                /* Responsive design improvements */
                @media (max-width: 768px) {
                    .animate-fade-in-up {
                        animation-delay: 0ms !important;
                    }
                    
                    .text-5xl {
                        font-size: 2.5rem;
                    }
                    
                    .lg\\:text-6xl {
                        font-size: 3rem;
                    }
                    
                    .grid.xl\\:grid-cols-2 {
                        grid-template-columns: 1fr;
                    }
                    
                    .h-96 {
                        height: 20rem;
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
                    .animate-pulse-slow,
                    .animate-spin-very-slow,
                    .animate-bounce-gentle,
                    .animate-pulse-gentle,
                    .animate-gradient-text {
                        animation: none;
                    }
                    
                    .transform {
                        transform: none !important;
                    }
                }

                /* Enhanced syntax highlighting effect */
                .syntax-highlight {
                    background: linear-gradient(45deg, rgba(16, 185, 129, 0.1), rgba(59, 130, 246, 0.1));
                    border-left: 3px solid #10b981;
                }

                /* Code execution status animations */
                @keyframes code-running {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }

                .executing-animation {
                    background: linear-gradient(45deg, #3b82f6, #8b5cf6, #3b82f6);
                    background-size: 400% 400%;
                    animation: code-running 2s ease infinite;
                }

                /* Terminal cursor effect */
                @keyframes cursor-blink {
                    0%, 50% { opacity: 1; }
                    51%, 100% { opacity: 0; }
                }

                .terminal-cursor::after {
                    content: '|';
                    animation: cursor-blink 1s infinite;
                    color: #10b981;
                }

                /* Loading dots animation */
                @keyframes loading-dots {
                    0%, 20% { opacity: 0; }
                    50% { opacity: 1; }
                    80%, 100% { opacity: 0; }
                }

                .loading-dot-1 { animation: loading-dots 1.4s infinite 0.0s; }
                .loading-dot-2 { animation: loading-dots 1.4s infinite 0.2s; }
                .loading-dot-3 { animation: loading-dots 1.4s infinite 0.4s; }

                /* Enhanced button animations */
                .btn-primary {
                    position: relative;
                    overflow: hidden;
                }

                .btn-primary::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: -100%;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                    transition: left 0.5s;
                }

                .btn-primary:hover::before {
                    left: 100%;
                }

                /* Code editor line highlight */
                .code-line-highlight {
                    background: rgba(16, 185, 129, 0.1);
                    border-left: 2px solid #10b981;
                    margin-left: -4px;
                    padding-left: 4px;
                }

                /* Console output styling */
                .console-success {
                    color: #10b981;
                    text-shadow: 0 0 5px rgba(16, 185, 129, 0.3);
                }

                .console-error {
                    color: #ef4444;
                    text-shadow: 0 0 5px rgba(239, 68, 68, 0.3);
                }

                .console-info {
                    color: #3b82f6;
                    text-shadow: 0 0 5px rgba(59, 130, 246, 0.3);
                }

                /* Floating action button style */
                .fab {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 3.5rem;
                    height: 3.5rem;
                    border-radius: 50%;
                    background: linear-gradient(45deg, #8b5cf6, #3b82f6);
                    box-shadow: 0 8px 25px rgba(139, 92, 246, 0.3);
                    z-index: 1000;
                    transition: all 0.3s ease;
                }

                .fab:hover {
                    transform: translateY(-2px) scale(1.1);
                    box-shadow: 0 12px 35px rgba(139, 92, 246, 0.4);
                }

                /* Progress indicator */
                @keyframes progress-pulse {
                    0% { width: 0%; }
                    50% { width: 70%; }
                    100% { width: 100%; }
                }

                .progress-bar {
                    height: 3px;
                    background: linear-gradient(90deg, #8b5cf6, #3b82f6);
                    border-radius: 2px;
                    animation: progress-pulse 2s ease-in-out;
                }

                /* Tooltip styles */
                .tooltip {
                    position: relative;
                }

                .tooltip::before {
                    content: attr(data-tooltip);
                    position: absolute;
                    bottom: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(0, 0, 0, 0.8);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    white-space: nowrap;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.3s;
                    font-size: 0.875rem;
                    z-index: 1000;
                }

                .tooltip:hover::before {
                    opacity: 1;
                }

                /* Enhanced card hover effects */
                .card-hover {
                    transition: all 0.3s ease;
                }

                .card-hover:hover {
                    transform: translateY(-5px) scale(1.02);
                    box-shadow: 0 20px 40px rgba(139, 92, 246, 0.15);
                }

                /* Glow effects */
                .glow-purple {
                    box-shadow: 0 0 20px rgba(139, 92, 246, 0.3);
                }

                .glow-blue {
                    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
                }

                .glow-green {
                    box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
                }

                /* Text effects */
                .text-glow {
                    text-shadow: 0 0 10px currentColor;
                }

                /* Enhanced animations for mobile */
                @media (max-width: 640px) {
                    .animate-float-slow,
                    .animate-float-reverse,
                    .animate-bounce-gentle {
                        animation-duration: 3s;
                    }
                }
            `}</style>
        </>
    );
}