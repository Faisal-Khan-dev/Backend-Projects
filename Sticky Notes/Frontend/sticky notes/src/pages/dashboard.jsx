import axios from "axios";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [noteColors, setNoteColors] = useState({});
  const [stats, setStats] = useState({
    totalNotes: 0,
    thisWeek: 0,
    totalChars: 0,
  });

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5001/api/getNotes", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.status) {
        setNotes(res.data.notes);

        const colors = {};
        res.data.notes.forEach((n) => {
          colors[n._id] = getRandomColorClass();
        });
        setNoteColors(colors);

        // Calculate stats
        const totalNotes = res.data.notes.length;

        const thisWeek = res.data.notes.filter((note) => {
          const noteDate = new Date(note.createdAt || Date.now());
          const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
          return noteDate > weekAgo;
        }).length;

        const totalChars = res.data.notes.reduce(
          (total, note) => total + (note.note?.length || 0),
          0
        );

        setStats({
          totalNotes,
          thisWeek,
          totalChars,
        });
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const getRandomColorClass = () => {
    const colors = [
      {
        bg: "bg-gradient-to-br from-amber-50 to-amber-100",
        border: "border-amber-200",
        accent: "border-l-4 border-amber-400",
        shadow: "shadow-amber-100",
      },
      {
        bg: "bg-gradient-to-br from-blue-50 to-blue-100",
        border: "border-blue-200",
        accent: "border-l-4 border-blue-400",
        shadow: "shadow-blue-100",
      },
      {
        bg: "bg-gradient-to-br from-emerald-50 to-emerald-100",
        border: "border-emerald-200",
        accent: "border-l-4 border-emerald-400",
        shadow: "shadow-emerald-100",
      },
      {
        bg: "bg-gradient-to-br from-violet-50 to-violet-100",
        border: "border-violet-200",
        accent: "border-l-4 border-violet-400",
        shadow: "shadow-violet-100",
      },
      {
        bg: "bg-gradient-to-br from-rose-50 to-rose-100",
        border: "border-rose-200",
        accent: "border-l-4 border-rose-400",
        shadow: "shadow-rose-100",
      },
      {
        bg: "bg-gradient-to-br from-cyan-50 to-cyan-100",
        border: "border-cyan-200",
        accent: "border-l-4 border-cyan-400",
        shadow: "shadow-cyan-100",
      },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br rounded-xl from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Notes Card */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200/70 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Notes
                </p>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {stats.totalNotes}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-300"
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
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-purple-100 transition-colors duration-300">
              <p className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                All your notes in one place
              </p>
            </div>
          </div>

          {/* This Week Card */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200/70 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  This Week
                </p>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {stats.thisWeek}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-purple-100 transition-colors duration-300">
              <p className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                Notes created this week
              </p>
            </div>
          </div>

          {/* Total Characters Card */}
          <div className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-gray-200/70 hover:shadow-2xl hover:scale-[1.02] hover:border-purple-300 transition-all duration-300 cursor-pointer">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-2">
                  Total Characters
                </p>
                <p className="text-3xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                  {stats.totalChars >= 1000
                    ? `${(stats.totalChars / 1000).toFixed(1)}k`
                    : stats.totalChars}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-105 group-hover:shadow-lg group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-purple-700 transition-all duration-300">
                <svg
                  className="w-6 h-6 text-white group-hover:scale-105 transition-transform duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200 group-hover:border-purple-100 transition-colors duration-300">
              <p className="text-xs text-gray-500 group-hover:text-purple-600 transition-colors duration-300">
                Across all your notes
              </p>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200/70 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Your{" "}
                <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Notes
                </span>
              </h2>
              <p className="text-gray-600 text-sm mt-1">
                {notes.length} note{notes.length !== 1 ? "s" : ""} • Organized
                by you
              </p>
            </div>
            <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Latest first
            </div>
          </div>

          {notes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {notes.map((item, index) => {
                const colorClass =
                  noteColors[item._id] || getRandomColorClass();
                return (
                  <div
                    key={item._id}
                    className={`rounded-2xl border-2 min-h-[200px] flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${colorClass.bg} ${colorClass.border} ${colorClass.accent} shadow-md ${colorClass.shadow}`}
                    style={{
                      transform: `rotate(${Math.random() * 1 - 0.5}deg)`,
                    }}
                  >
                    {/* Note Content */}
                    <div className="flex-grow flex flex-col p-5">
                      <div className="flex-grow">
                        <p className="text-gray-800 text-base leading-relaxed break-words font-medium line-clamp-6">
                          {item.note}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 pt-3 border-t border-gray-300 border-opacity-30 flex justify-between items-center text-xs text-gray-500">
                        <span className="flex items-center bg-white/60 px-2 py-1 rounded-full">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {new Date().toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                        <span className="bg-white/60 px-2 py-1 rounded-full font-medium">
                          Note #{index + 1}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-2xl flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-indigo-400"
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
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No notes yet
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Start organizing your thoughts by creating your first note.
                Click on "Notes" in the sidebar to get started.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
