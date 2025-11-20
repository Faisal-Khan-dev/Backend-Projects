import React from "react";
import { useLocation } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen, userName = "User Name" }) => {
  const location = useLocation();

  // Page title based on route
  const pageTitleMap = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/notes": "Notes",
  };

  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-30">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Page title with icon */}
        <div className="flex items-center space-x-3">
          <svg
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.166c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.286-3.966a1 1 0 00-.364-1.118L2.039 9.393c-.784-.57-.38-1.81.588-1.81h4.166a1 1 0 00.95-.69l1.286-3.966z" />
          </svg>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Welcome to <span className="text-indigo-600">{pageTitle}</span>
          </h1>
        </div>

        {/* Right side - User Profile */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg">
            {userName[0] || "U"}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500">Profile</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
