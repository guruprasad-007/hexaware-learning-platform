import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursePage from "./pages/CoursePage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from './pages/AdminDashboardPage';
import PrivateRoute from "./PrivateRoute";
import AddCoursePage from './pages/AddCoursePage.jsx';
import AdminCoursesPage from './pages/AdminCoursesPage';
import CourseDetailsPage from './pages/CourseDetailsPage';
import QuizPage from './pages/QuizPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* Protected Routes */}
        <Route path="/courses" element={<ProtectedRoute><CoursePage /></ProtectedRoute>} />
        <Route path="/courses/:id" element={<ProtectedRoute><CourseDetailsPage /></ProtectedRoute>} />
        <Route path="/courses/:id/quiz" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        {/* Admin Protected Routes */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/admin/courses" element={<ProtectedRoute adminOnly={true}><AdminCoursesPage /></ProtectedRoute>} />
        <Route path="/admin/courses/add" element={<ProtectedRoute adminOnly={true}><AddCoursePage /></ProtectedRoute>} />

      </Routes>
    </Router>
  );
}
