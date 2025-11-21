import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
      path: "/dashboard",
    },
    {
      id: "notes",
      label: "Notes",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      path: "/notes",
    },
    {
      id: "profile",
      label: "Profile",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      ),
      path: "/profile",
    },
  ];

   useEffect(() => {
     const currentItem = menuItems.find(
       (item) => item.path === location.pathname
     );
     if (currentItem) {
       setActiveTab(currentItem.id);
     }
   }, [location.pathname]); 

  const handleNavigation = (item) => {
    setActiveTab(item.id);
    setSidebarOpen(false);
    navigate(item.path);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
    fixed inset-y-0 left-0 z-50 w-80 
    bg-gradient-to-b from-slate-50 to-slate-100 
    border-r border-slate-200 shadow-xl 
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    lg:translate-x-0
  `}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-200/60 bg-white backdrop-blur-sm">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Sticky Notes
                </h1>
                <p className="text-slate-500 text-sm">Your digital notebook</p>
              </div>
            </div>

            {/* Close button for mobile */}
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Menu */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item)}
                className={`
                  cursor-pointer w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left transition-all duration-200 group
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-r-4 border-indigo-500 shadow-md"
                      : "text-slate-600 hover:bg-white hover:text-slate-800 hover:shadow-md border-r-4 border-transparent"
                  }
                `}
              >
                <div
                  className={`
                  p-2 rounded-xl transition-all duration-200
                  ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                      : "bg-slate-100 text-slate-500 group-hover:bg-slate-200 group-hover:text-slate-700"
                  }
                `}
                >
                  {item.icon}
                </div>
                <span className="font-medium text-lg">{item.label}</span>

                {/* Active indicator */}
                {activeTab === item.id && (
                  <div className="ml-auto w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full animate-pulse" />
                )}
              </button>
            ))}
          </nav>

          {/* Logout Button - At the very bottom */}
          <div className="mt-auto p-6">
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-4 px-4 py-4 rounded-2xl text-left cursor-pointer transition-all duration-200 group text-slate-600 hover:bg-red-50 hover:text-red-700 hover:shadow-md hover:border-r-4 hover:border-red-500 hover:shadow-md"
            >
              <div className="p-2 rounded-xl transition-all duration-200 bg-slate-100 text-slate-500 group-hover:bg-red-500 group-hover:text-white">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
              </div>
              <span className="font-medium text-lg ">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
