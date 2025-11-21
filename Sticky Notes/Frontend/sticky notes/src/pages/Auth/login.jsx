import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    

    const navigate = useNavigate();

    const handleSubmit = async(e) => {
    try {
        
        e.preventDefault();

         const url = "http://localhost:5001/api/login";
          const response = await axios.post(url, {
            email,
            password,
          });
        console.log("response", response);
        
        if (response.data.status) {
            
          localStorage.setItem("token", response.data.token);
            setEmail("")
            setPassword("")
            navigate("/dashboard");
        } else {
            alert(response.data.message)
            setPassword("");
        }

    } catch (error) {
        alert(error.message)
    }
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md transform transition hover:scale-[1.01]">
        <h2 className="text-3xl font-extrabold text-center text-indigo-700 mb-6">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
              required
            />
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-br from-indigo-500 to-purple-600 text-white  py-3 rounded-lg font-semibold text-lg  active:scale-95"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-5">
          Don’t have an account?{" "}
          <button
            onClick={() => navigate("/signup")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent cursor-pointer font-medium hover:!underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
