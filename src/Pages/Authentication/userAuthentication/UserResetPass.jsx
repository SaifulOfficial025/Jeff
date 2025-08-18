import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const UserResetPass = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // Watch password for confirm password validation
  const password = watch("password");

  // Form submission handler
  const onSubmit = async (data) => {
    setApiError("");
    const email = localStorage.getItem("reset_email");
    if (!email) {
      setApiError("Email not found. Please restart the process.");
      return;
    }
    try {
      const res = await fetch("https://adding-ct-guinea-certification.trycloudflare.com/api/users/reset-password/", {
        method: "POST",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ email, new_password: data.password }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to reset password");
      }
      setSuccess(true);
      setTimeout(() => {
        navigate("/user_login");
      }, 1500);
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-between">
          <div>
            <img
              src="https://i.ibb.co/fVhDxRcw/Group-2147226062.png"
              alt="Registration illustration"
              width={400}
              height={400}
              className="h-[500px] w-[520px]"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-[38px] font-bold text-blue-500">DOS Estimator</h1>
            <p className="text-white text-lg mb-10">Reset your password!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>

            <div>
              <label className="text-gray-400 text-sm">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••"
                  className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white pr-10 ${
                    errors.password ? "input-error" : ""
                  }`}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Confirm Password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••"
                  className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white pr-10 ${
                    errors.confirmPassword ? "input-error" : ""
                  }`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
              )}
            </div>

            {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
            {success && <p className="text-green-500 text-sm mt-2">Password reset successful! Redirecting to login...</p>}
            <button
              type="submit"
              className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
              disabled={success}
            >
              Reset
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}

export default UserResetPass
