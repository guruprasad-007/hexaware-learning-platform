import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-primary shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Changed text-gray-800 to text-white */}
        <h1 className="text-2xl font-bold text-white">
          Hexaware Learning
        </h1>
        <nav className="space-x-6">
          {/* Changed text-black to text-white for all links */}
          <Link to="/" className="text-white">Home</Link>
          <Link to="/courses" className="text-white">Courses</Link>
          <Link to="/dashboard" className="text-white">Dashboard</Link>
          <Link to="/profile" className="text-white">Profile</Link>
        </nav>
      </div>
    </header>
  );
}