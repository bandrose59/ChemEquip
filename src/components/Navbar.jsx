import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleLogout = () => {
    if (window.confirm(`Logout as ${user?.username}?`)) {
      logout();
    }
  };

  const pageName =
    location.pathname === "/"
      ? ""
      : location.pathname.replace("/", "").toUpperCase();

  const linkClass = (path) =>
    `px-3 py-1 rounded-lg text-sm transition ${
      location.pathname === path
        ? "bg-indigo-600 text-white"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`;

  return (
    <nav className="w-full p-4 flex justify-between items-center bg-white dark:bg-gray-800 shadow-md">
      {/* Left Side */}
      <div>
        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
          ChemEquip - Chemical Visualizer
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
        Upload | Analyase | Visualize 
        </p>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3">

        {/* Navigation Links */}
        <button onClick={() => navigate("/dashboard")} className={linkClass("/")}>
          Dashboard
        </button>

        <button onClick={() => navigate("/history")} className={linkClass("/history")}>
          History
        </button>

        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700 text-sm"
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        {/* Username */}
        <span className="text-sm text-gray-600 dark:text-gray-300">
          👤 {user?.username || "Guest"}
        </span>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="px-4 py-1 bg-red-600 hover:bg-red-700 text-white rounded"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
