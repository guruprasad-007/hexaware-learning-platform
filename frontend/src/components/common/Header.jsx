import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Hexaware Learning</h1>
        <nav className="space-x-6">
          <Link to="/" className="hover:text-secondary">Home</Link>
          <Link to="/courses" className="hover:text-secondary">Courses</Link>
          <Link to="/dashboard" className="hover:text-secondary">Dashboard</Link>
          <Link to="/profile" className="hover:text-secondary">Profile</Link>
        </nav>
      </div>
    </header>
  );
}
