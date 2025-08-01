import React from "react";
import { User, Users, BookOpen, FileText, Eye, BarChart2, Trash2 } from "lucide-react";
import Header from "../components/common/Header";

const AdminDashboardPage = () => {
  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com" },
    { id: 2, name: "Bob Smith", email: "bob@example.com" },
    { id: 3, name: "Charlie Davis", email: "charlie@example.com" },
  ];

  const userCount = users.length;
  const courseCount = 12;
  const assessmentCount = 27;


  return (
    <>
      <Header />


      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 p-6">
        {/* Profile Section */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl mb-8 animate-fade-in-up flex items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg animate-pulse-gentle">
              <User className="w-8 h-8" />
            </div>
            <div className="absolute inset-0 w-16 h-16 border-2 border-purple-300/30 rounded-full animate-spin-slow"></div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-purple-800">Admin Dashboard</h2>
            <p className="text-gray-600">Welcome, John Kevin</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <Card icon={<Users className="text-indigo-600" />} label="Users" count={userCount} color="indigo" />
          <Card icon={<BookOpen className="text-green-600" />} label="Courses" count={courseCount} color="green" />
          <Card icon={<FileText className="text-pink-600" />} label="Assessments" count={assessmentCount} color="pink" />
        </div>

        {/* Users List */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl shadow-xl animate-fade-in-up">
          <h3 className="text-xl font-semibold text-indigo-700 mb-6">Users Overview</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {users.map((user, i) => (
              <div
                key={user.id}
                className="bg-gradient-to-br from-gray-100/80 to-white/80 backdrop-blur-sm p-4 rounded-xl shadow-md hover:shadow-xl transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xl">
                    {user.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2 space-x-2">
                  <button className="flex-1 bg-indigo-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-indigo-600 flex items-center justify-center gap-1">
                    <Eye className="w-4 h-4" /> Profile
                  </button>
                  <button className="flex-1 bg-yellow-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-yellow-600 flex items-center justify-center gap-1">
                    <BarChart2 className="w-4 h-4" /> Analysis
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-1 px-3 rounded-lg text-sm hover:bg-red-600 flex items-center justify-center gap-1">
                    <Trash2 className="w-4 h-4" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .animate-fade-in-up {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .animate-pulse-gentle {
            animation: pulse 3s ease-in-out infinite;
          }
          .animate-spin-slow {
            animation: spin 10s linear infinite;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 1;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.75;
            }
          }

          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    </>
  );
};

const Card = ({ icon, label, count, color }) => (
  <div
    className={`group bg-gradient-to-br from-${color}-50/80 to-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center border border-${color}-200/30`}
  >
    <div className="relative mb-2">{icon}</div>
    <h4 className="text-xl font-bold text-gray-700">{count}</h4>
    <p className="text-sm text-gray-500">{label}</p>
  </div>
);

export default AdminDashboardPage;
