import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CoursePage from "./pages/CoursePage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/AdminPage"; // ✅ Import the new Admin Dashboard
import PrivateRoute from "./PrivateRoute";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/" element={<PrivateRoute allowedRoles={["user"]}><HomePage /></PrivateRoute>} />
        <Route path="/courses" element={<PrivateRoute allowedRoles={["user"]}><CoursePage /></PrivateRoute>} />
        <Route path="/dashboard" element={<PrivateRoute allowedRoles={["user"]}><DashboardPage /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute allowedRoles={["admin"]}><AdminDashboardPage /></PrivateRoute>} /> {/* ✅ Added */}
      </Routes>
    </Router>
  );
}
