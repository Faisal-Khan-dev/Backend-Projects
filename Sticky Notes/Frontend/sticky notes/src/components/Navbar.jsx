import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [userData, setUserData] = useState({
    name: "User Name",
    profileImage: null,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        setUserData({
          name: decoded.name || "User Name",
          profileImage: decoded.profileImage || null,
        });
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, [location]);

  const pageTitleMap = {
    "/dashboard": "Dashboard",
    "/profile": "Profile",
    "/notes": "Notes",
  };
  const pageTitle = pageTitleMap[location.pathname] || "Dashboard";

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-5">
        {/* Left side */}
        <div className="flex items-center space-x-3">
          <svg
            xmlns="https://www.w3.org/2000/svg"
            className="w-6 h-6 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 .587l3.668 7.431L24 9.587l-6 5.847 1.416 8.256L12 19.771l-7.416 4.919L6 15.434 0 9.587l8.332-1.569z" />
          </svg>

          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            Welcome to{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {pageTitle}
            </span>
          </h1>
        </div>

        {/* Right side - Navigate on click */}
        <div
          className="flex items-center space-x-3 cursor-pointer"
          onClick={() => navigate("/profile")}
        >
          <div className="w-12 h-12 rounded-full overflow-hidden border-3 border-gray-300">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-300 flex items-center justify-center text-white font-semibold text-lg">
                {userData.name[0] || "U"}
              </div>
            )}
          </div>

          <div className="hidden sm:block text-left">
            <p className="text-sm font-medium text-gray-900">{userData.name}</p>
            <p className="text-xs text-gray-500">Profile</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
