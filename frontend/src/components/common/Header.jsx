// frontend/src/components/common/Header.jsx
import { Link } from "react-router-dom";
// Corrected import path: Go up one directory (from 'common') then down into 'voice'
import VoiceAssistantComponent from "../voice/VoiceAssistantComponent.jsx";// <--- CORRECTED IMPORT PATH

export default function Header() {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-white">
          E-GURU
        </h1>
        <nav className="space-x-6">
          <Link to="/" className="text-white">Home</Link>
          <Link to="/courses" className="text-white">Courses</Link>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
          <Link to="/profile" className="text-white">Profile</Link>
        </nav>
      </div>
      <VoiceAssistantComponent />
    </header>
  );
}