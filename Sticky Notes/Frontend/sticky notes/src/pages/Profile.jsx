import { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    profileImage: "",
    profileImageFile: null,
    userId: "",
  });

  const [originalData, setOriginalData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // Load user data from token
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decoded = jwtDecode(token);
      console.log(decoded);
      
      const data = {
        fullName: decoded.name || "",
        email: decoded.email || "",
        age: decoded.age || "",
        gender: decoded.gender || "",
        profileImage: decoded.profileImage || "",
        profileImageFile: null,
        userId: decoded.id,
      };

      setFormData(data);
      setOriginalData(data);
    }
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGenderSelect = (gender) => {
    if (isEditing) setFormData((prev) => ({ ...prev, gender }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileImageFile: file,
        profileImage: URL.createObjectURL(file),
      }));
    }
  };

  // SAVE
  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    form.append("name", formData.fullName);
    form.append("email", formData.email);
    form.append("age", formData.age);
    form.append("gender", formData.gender);

    if (formData.profileImageFile)
      form.append("profileImage", formData.profileImageFile);

    try {
      const res = await axios.put(
        "http://localhost:5001/api/update-profile",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      localStorage.setItem("token", res.data.token);

      alert("Profile Updated Successfully!");
      setOriginalData(formData);
      setIsEditing(false);

      // Refresh the page to update navbar
      window.location.reload();
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  // CANCEL
  const handleCancel = () => {
    setFormData(originalData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-[calc(100vh-140px)] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl">
      <div className="h-full p-6">
        <div className="bg-white rounded-2xl shadow-xl h-full max-h-[calc(100vh-180px)] overflow-hidden">
          <div className="flex h-full">
            {/* Left Section - Profile Image */}
            <div className="w-2/5 bg-gradient-to-b from-blue-100 to-indigo-180 p-8 flex flex-col items-center justify-center">
              <div className="mb-6 relative">
                <div className="w-48 h-48 rounded-full overflow-hidden bg-white shadow-lg border-4 border-white">
                  {formData.profileImage ? (
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <span className="text-gray-500 text-sm">No Image</span>
                    </div>
                  )}
                </div>

                {isEditing && (
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                    <label
                      htmlFor="profileUpload"
                      className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </label>
                    <input
                      type="file"
                      id="profileUpload"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </div>
                )}
              </div>

              <div className="text-center mt-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {formData.fullName || "User Name"}
                </h2>
                <p className="text-gray-600 mt-1">
                  {formData.email || "user@example.com"}
                </p>

                <div className="mt-6 flex justify-center space-x-6">
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600">
                      {formData.age || "0"}
                    </div>
                    <div className="text-xs text-gray-500">Age</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold text-blue-600 capitalize">
                      {formData.gender || "Not set"}
                    </div>
                    <div className="text-xs text-gray-500">Gender</div>
                  </div>
                </div>
              </div>

              {/* Edit/Save/Cancel Button Area - Same Position */}
              <div className="mt-8 w-4/5">
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="w-full py-3 cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                ) : (
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      form="profile-form"
                      className="flex-1 py-3 cursor-pointer  bg-gradient-to-r from-indigo-600 to-purple-600  text-white rounded-lg font-medium  flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      Save Changes
                    </button>

                    <button
                      type="button"
                      onClick={handleCancel}
                      className="flex-1 py-3 cursor-pointer bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Right Section - Form */}
            <div className="w-3/5 p-8 flex flex-col justify-center">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                  Profile{" "}
                  <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Information
                  </span>
                </h1>
                <p className="text-gray-600 mt-2">
                  Manage your personal information and preferences
                </p>
              </div>

              <form
                id="profile-form"
                onSubmit={handleSubmit}
                className="flex-1"
              >
                <div className="space-y-6">
                  {/* Full Name */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="Enter your full name"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="Enter your email address"
                    />
                  </div>

                  {/* Age */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors disabled:bg-gray-100 disabled:text-gray-500"
                      placeholder="Enter your age"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block mb-2 font-medium text-gray-700">
                      Gender
                    </label>
                    {!isEditing ? (
                      // Display as read-only input when not editing
                      <input
                        type="text"
                        value={
                          formData.gender
                            ? formData.gender.charAt(0).toUpperCase() +
                              formData.gender.slice(1)
                            : "Not set"
                        }
                        disabled
                        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                      />
                    ) : (
                      // Display as dropdown when editing
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
