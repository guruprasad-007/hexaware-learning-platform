import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import SignupPage from "./pages/SignupPage";
import CoursePage from "./pages/CoursePage";
import AddCoursePage from './pages/AddCoursePage.jsx';
import CourseDetailsPage from './pages/CourseDetailsPage';
import QuizPage from './pages/QuizPage';
import AdminCoursesPage from './pages/AdminCoursesPage';
import CodeCompilerPage from './pages/CodeCompilerPage';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/courses" element={<CoursePage />} />
        <Route path="/courses/:id" element={<CourseDetailsPage />} />
        <Route path="/courses/:id/quiz/:lessonNumber" element={<QuizPage />} /> 
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboardPage />} />
        <Route path="/admin/courses/add" element={<AddCoursePage />} />
        <Route path="/admin/courses" element={<AdminCoursesPage />} />
        <Route path="/compiler/:lang" element={<CodeCompilerPage />} />
        
      </Routes>
    </BrowserRouter>
  );
}
export default App;