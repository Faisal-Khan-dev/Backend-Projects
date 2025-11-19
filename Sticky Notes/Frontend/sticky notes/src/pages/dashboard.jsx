import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

const Dashboard = () => {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editNote, setEditNote] = useState("");
  const [noteColors, setNoteColors] = useState({});

  const fetchNotes = async () => {
    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:5000/api/getNotes";

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("response", response);

      if (response.data.status) {
        const fetchedNotes = response.data.notes;
        setNotes(fetchedNotes);

         if (response.data.draft) {
           setNote(response.data.draft.note); 
         }
        
        const colors = {};
        fetchedNotes.forEach((note) => {
          colors[note._id] = getRandomColorClass();
        });
        console.log("colors", colors);

        setNoteColors(colors);

      }
    } catch (error) {
      console.log("Error fetching notes:", error.message);
    }
  };

  const addDraft = async() => {
    try {

      const token = localStorage.getItem("token");
      const url = "http://localhost:5000/api/saveDraft";

      const response = await axios.post(
        url,
        { note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    } catch (error) {
      console.log("adding note error", error.message);
    }
  }

  const addNotes = async () => {
    console.log("note", note);

    try {
      const token = localStorage.getItem("token");
      const url = "http://localhost:5000/api/addNote";

      const response = await axios.post(
        url,
        { note },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response", response);

      if (response.data.status) {
        const newNote = response.data.data;
        console.log("newNote", newNote);

        
        setNoteColors((prev) => ({
          ...prev,
          [newNote._id]: getRandomColorClass(),
        }));

        setNotes((prev) => [...prev, newNote]);
        setNote("");
        localStorage.removeItem("draftNote");
      } else {
        console.log("error", response.data.message);
      }
    } catch (error) {
      console.log("adding note error", error.message);
    }
  };

  const delNotes = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:5000/api/${id}`;

      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("response", response);

      if (response.data.status) {
        setNotes((prev) => prev.filter((n) => n._id !== id));
        // Remove color from state
       
      } else {
        console.log("error", response.data.message);
      }
    } catch (error) {
      console.log("deleting note error", error.message);
    }
  };

  const handleEdit = (id, currentText) => {
    setEditNoteId(id);
    setEditNote(currentText);
  };

  const updateNote = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const url = `http://localhost:5000/api/updateNote/${id}`;
      const response = await axios.put(
        url,
        { note: editNote },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      console.log("response", response);

      if (response.data.status) {
        const updatedNote = response.data.data;
        console.log("updatedNote", updatedNote);
        console.log("updatedNote.note", updatedNote.note);

        setNotes((prev) =>
          prev.map((n) => (n._id === id ? { ...n, note: updatedNote.note } : n))
        );
        setEditNoteId(null);
        setEditNote("");
      }
    } catch (error) {
      console.log("editing note error", error.message);
    }
  };

  useEffect(() => {
  if (!note.trim()) return; // agar khali hai to kuch mat kar

  const timeout = setTimeout(() => {
    addDraft(); // 👈 1 sec baad auto save hoga
  }, 1000);

  return () => clearTimeout(timeout); // cleanup on next change
}, [note]); 

  useEffect(() => {
    fetchNotes();
  }, []);

  useEffect(() => {
    if (notes.length > 0) {
      console.log("Notes state changed:", notes);
    }
  }, [notes]);

  

  // Function to generate random color class for notes
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
      {
        bg: "bg-gradient-to-br from-lime-50 to-lime-100",
        border: "border-lime-200",
        accent: "border-l-4 border-lime-400",
        shadow: "shadow-lime-100",
      },
      {
        bg: "bg-gradient-to-br from-fuchsia-50 to-fuchsia-100",
        border: "border-fuchsia-200",
        accent: "border-l-4 border-fuchsia-400",
        shadow: "shadow-fuchsia-100",
      },
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-6">
            <svg
              className="w-10 h-10 text-white"
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
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Sticky Notes
          </h1>
          <p className="text-gray-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Capture your ideas and thoughts with these beautiful digital sticky
            notes
          </p>
        </div>

        {/* Enhanced Input Section */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 mb-16 max-w-4xl mx-auto transform transition-all duration-300">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2 ml-1">
              Add New Note
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-6 w-6 text-indigo-500"
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
              <input
                type="text"
                placeholder="What's on your mind? Start typing your note here..."
                value={note}
                onChange={(e) => {
                  setNote(e.target.value);
               
                }}
                className="w-full border-2 border-gray-300 rounded-xl pl-12 pr-36 py-5 text-lg focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition-all bg-white hover:border-indigo-300"
                onKeyPress={(e) => {
                  if (e.key === "Enter") addNotes();
                }}
              />
              <button
                onClick={addNotes}
                disabled={!note.trim()}
                className={`absolute right-2 top-2 px-8 py-3 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 ${
                  note.trim()
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg shadow-indigo-300 hover:shadow-indigo-400"
                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                }`}
              >
                <span className="flex items-center">
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  Add Note
                </span>
              </button>
            </div>
          </div>

          {localStorage.getItem("draftNote") && (
            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-50 to-purple-50 px-4 py-3 rounded-lg border border-indigo-200">
              <div className="flex items-center text-indigo-700">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="font-medium">Unsaved draft</span>
              </div>
              <button
                onClick={() => {
                  setNote("");
                  localStorage.removeItem("draftNote");
                }}
                className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Enhanced Notes Grid */}
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {notes.map((item, index) => {
              const colorClass = noteColors[item._id] || getRandomColorClass();
              return (
                <div
                  key={item._id || index}
                  className={`rounded-2xl border min-h-[240px] flex flex-col relative transition-all duration-500 hover:scale-105 hover:shadow-2xl ${colorClass.bg} ${colorClass.border} ${colorClass.accent} shadow-lg ${colorClass.shadow}`}
                  style={{
                    transform: `rotate(${Math.random() * 1.5 - 0.75}deg)`,
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* Enhanced Action Buttons - Inside card but properly positioned */}
                  <div className="absolute top-4 right-4 flex space-x-2">
                    <button
                      onClick={() => handleEdit(item._id, item.note)}
                      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200/50 group"
                      title="Edit note"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-indigo-600 transition-colors"
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
                    </button>
                    <button
                      onClick={() => delNotes(item._id)}
                      className="bg-white/90 backdrop-blur-sm p-2.5 rounded-xl shadow-md hover:shadow-lg hover:scale-110 transition-all duration-200 border border-gray-200/50 group"
                      title="Delete note"
                    >
                      <svg
                        className="w-4 h-4 text-gray-600 group-hover:text-red-600 transition-colors"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* Note Content */}
                  <div className="flex-grow flex flex-col p-6">
                    {editNoteId === item._id ? (
                      <div className="flex-grow flex flex-col">
                        <textarea
                          value={editNote}
                          onChange={(e) => setEditNote(e.target.value)}
                          className="w-full h-32 border-2 border-gray-300 rounded-xl p-4 text-gray-800 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white/90 backdrop-blur-sm mb-4"
                          autoFocus
                        />
                        <div className="flex justify-end space-x-3">
                          <button
                            onClick={() => updateNote(item._id)}
                            className="px-5 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-indigo-300 flex items-center border border-indigo-500"
                          >
                            <svg
                              className="w-4 h-4 mr-2"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Save
                          </button>
                          <button
                            onClick={() => setEditNoteId(null)}
                            className="px-5 py-2.5 bg-white text-gray-700 rounded-xl text-sm font-semibold hover:bg-gray-50 transition-all border border-gray-300 hover:border-gray-400"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex-grow flex flex-col">
                        <div className="flex-grow">
                          <p className="text-gray-800 text-lg leading-relaxed break-words font-medium">
                            {item.note}
                          </p>
                        </div>
                        {/* Note Footer */}
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
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-3xl shadow-2xl border border-gray-100 max-w-2xl mx-auto transform transition-all duration-300">
            <div className="w-28 h-28 mx-auto mb-8 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-lg">
              <svg
                className="w-14 h-14 text-indigo-400"
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
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              No notes yet
            </h3>
            <p className="text-gray-500 text-lg max-w-md mx-auto mb-8 leading-relaxed">
              Your digital sticky notes will appear here. Start organizing your
              thoughts by adding your first note!
            </p>
            <div className="text-indigo-600 font-semibold text-lg bg-indigo-50 px-6 py-3 rounded-xl inline-block border border-indigo-100">
              ✨ Start typing above to create your first note
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center">
          <div className="inline-flex items-center space-x-3 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg border border-gray-200">
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-gray-600 font-medium">
              Your notes are securely saved and private
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
