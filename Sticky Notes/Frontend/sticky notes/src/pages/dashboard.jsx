import axios from "axios";
import React, { useState, useEffect } from "react";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [noteColors, setNoteColors] = useState({});

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6 md:p-12 rounded-lg">
      {/* Gradient Heading */}
      <h1 className="text-5xl md:text-6xl font-bold text-center mb-12 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        My Notes
      </h1>

      {notes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {notes.map((item, index) => {
            const colorClass = noteColors[item._id] || getRandomColorClass();
            return (
              <div
                key={item._id}
                className={`rounded-2xl border min-h-[240px] flex flex-col transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colorClass.bg} ${colorClass.border} ${colorClass.accent} shadow-lg ${colorClass.shadow}`}
                style={{
                  transform: `rotate(${Math.random() * 1.5 - 0.75}deg)`,
                }}
              >
                {/* Note Content */}
                <div className="flex-grow flex flex-col p-6">
                  <div className="flex-grow">
                    <p className="text-gray-800 text-lg leading-relaxed break-words font-medium">
                      {item.note}
                    </p>
                  </div>

                  {/* Footer */}
                  <div className="mt-6 pt-4 border-t border-gray-300 border-opacity-30 flex justify-between items-center text-xs text-gray-500">
                    <span className="flex items-center bg-white/60 px-3 py-1.5 rounded-full">
                      <svg
                        className="w-3 h-3 mr-1.5"
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
                    <span className="bg-white/60 px-3 py-1.5 rounded-full font-medium">
                      Note #{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 text-lg mt-12">
          No notes available.
        </p>
      )}
    </div>
  );
};

export default Dashboard;
