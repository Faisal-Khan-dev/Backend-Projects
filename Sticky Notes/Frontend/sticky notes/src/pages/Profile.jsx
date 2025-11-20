import { useState } from "react";
import axios from "axios";

const Profile = () => {
  const userData = {
    name: "John Doe",
    email: "john@example.com",
    age: 30,
    gender: "male",
    profileImage: "",
  };

  const [formData, setFormData] = useState({
    fullName: userData.name,
    email: userData.email,
    age: userData.age,
    gender: userData.gender,
    profileImage: userData.profileImage,
    profileImageFile: null,
  });

  const [isEditing, setIsEditing] = useState(false);

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
      await axios.put("/api/update-profile", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Profile Updated Successfully");
      setIsEditing(false);
    } catch (error) {
      alert(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="flex justify-center items-start min-h-screen p-6 bg-gray-50">
      <div className="rounded-lg w-full max-w-[600px] bg-white p-8 shadow-md">
        {/* Profile Image */}
        <div className="flex items-center gap-6 mb-8">
          <div className="w-[150px] h-[150px] rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
            {formData.profileImage ? (
              <img
                src={formData.profileImage}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">No Image</span>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <button
              disabled={!isEditing}
              onClick={() => document.getElementById("profileUpload").click()}
              className={`px-4 py-2 rounded border text-sm font-medium ${
                isEditing
                  ? "text-blue-500 border-gray-300 hover:bg-gray-50"
                  : "text-gray-400 border-gray-200 cursor-not-allowed"
              }`}
            >
              Upload Photo
            </button>
            <input
              type="file"
              id="profileUpload"
              accept="image/*"
              className="hidden"
              disabled={!isEditing}
              onChange={handleFileChange}
            />
            <p className="text-xs text-gray-500 mt-1">
              JPG or PNG, min 800x800px recommended
            </p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Age */}
            <div>
              <label className="block mb-2 font-semibold text-gray-700">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleChange}
                disabled={!isEditing}
                className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 disabled:bg-gray-100 disabled:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Gender
            </label>
            <div className="flex gap-4">
              {["male", "female"].map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => handleGenderSelect(g)}
                  disabled={!isEditing}
                  className={`px-6 py-2 border rounded-lg font-medium transition duration-200 ${
                    formData.gender === g
                      ? "border-blue-500 bg-blue-50 text-blue-600"
                      : "border-gray-300 text-gray-700"
                  } ${
                    !isEditing
                      ? "cursor-not-allowed opacity-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  {g.charAt(0).toUpperCase() + g.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Buttons */}
          {isEditing ? (
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Save Changes
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Edit
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
