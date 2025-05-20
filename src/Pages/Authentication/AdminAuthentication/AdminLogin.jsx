"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black bg-opacity-90 p-4">
      <div className="w-full max-w-lg relative">
        {/* Glassmorphism card */}
        <div className="backdrop-blur-sm bg-[#212121] bg-opacity-30 rounded-lg border border-gray-800 shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-blue-500 text-[32px] font-bold mb-6">DOS Estimator</h1>
            <h2 className="text-white text-[28px] font-medium">Nice to see you!</h2>
            <p className="text-gray-400 text-base  mb-6">Bring your username and password to Login</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Username input */}
            <div>
              <input
                type="text"
                placeholder="Username"
                className="w-full px-4 py-3 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                {...register("username", { required: "Username is required" })}
              />
              {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
            </div>

            {/* Password input */}
            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md bg-gray-800 bg-opacity-50 border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                {...register("password", { required: "Password is required" })}
              />
              {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
            </div>

            {/* Remember me checkbox */}
            <div className="flex items-center justify-between">
              <div>
                <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 text-blue-500 bg-gray-800 border-gray-700 rounded focus:ring-blue-500"
                {...register("remember")}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-gray-400">
                Keep me logged in
              </label>
                </div>

               <div>
                  <Link to="/admin_email_verification" className="text-blue-600 underline cursor-pointer">Forget Password</Link>
               </div>                         
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#2473CD] rounded-full hover:bg-blue-600 text-white font-medium py-2.5 px-4  transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-xs">2023 DOS Estimator. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}