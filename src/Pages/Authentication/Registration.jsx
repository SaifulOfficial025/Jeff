

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner"
import { useCreateUserMutation } from "../../redux/features/baseApi";

export default function RegistrationPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [createUser] = useCreateUserMutation();

  const queryParams = new URLSearchParams(location.search);
  const role = queryParams.get("role") || "user";

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

const onSubmit = async (data) => {
  try {
    let payload;
    
    // Create different payload structures based on role
    if (role.toLowerCase() === "vendor") {
      payload = {
        role,
        email: data?.email,
        full_name: data?.fullName,
        password: data?.password,
        phone_number: data?.phone,
        company_name: data?.companyName,
      };
    } else {
      // For user and employee roles, use the existing structure
      payload = {
        role,
        email: data?.email,
        phone_number: data?.phone,
        username: data?.email,
        password: data?.password,
      };
    }

    const userCreateResponse = await createUser(payload).unwrap();
    console.log(userCreateResponse, "userCreateResponse");

    // Show success toast
    toast.success("Registration successful!");

    // Navigate based on role
    switch (role.toLowerCase()) {
      case "user":
        navigate("/base_labor_rates");
        break;
      case "employee":
        navigate("/employee_login");
        break;
      default:
        navigate("/vendor_login");
    }
  } catch (error) {
    console.error("Registration failed:", error);
    toast.error("Registration failed. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-between">
          <img
            src="https://i.ibb.co/fVhDxRcw/Group-2147226062.png"
            alt="Registration illustration"
            width={400}
            height={400}
            className="h-[500px] w-[520px]"
          />
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-[38px] font-bold text-blue-500">DOS Estimator</h1>
            <p className="text-white text-lg mb-10">Register Now!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="text-gray-400 text-sm">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
                  errors.fullName ? "input-error" : ""
                }`}
                {...register("fullName", {
                  required: "Full name is required",
                  validate: {
                    hasTwoWords: value => value.trim().split(/\s+/).length >= 2 || 'Please enter your first and last name.',
                    onlyLetters: value => /^[A-Za-z ]+$/.test(value) || 'Name can only contain letters and spaces.',
                    minLength: value => value.trim().split(/\s+/).every(word => word.length >= 3) || 'Each name part must be at least 3 characters.'
                  }
                })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

            {/* Company Name field - only show for vendors */}
            {role.toLowerCase() === "vendor" && (
              <div>
                <label className="text-gray-400 text-sm">Company Name</label>
                <input
                  type="text"
                  placeholder="Steel Works Inc."
                  className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
                    errors.companyName ? "input-error" : ""
                  }`}
                  {...register("companyName", { 
                    required: role.toLowerCase() === "vendor" ? "Company name is required" : false,
                    minLength: {
                      value: 3,
                      message: "Company name must be at least 3 characters"
                    }
                  })}
                />
                {errors.companyName && (
                  <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                )}
              </div>
            )}

            <div>
              <label className="text-gray-400 text-sm">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
                  errors.email ? "input-error" : ""
                }`}
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label className="text-gray-400 text-sm">Phone Number</label>
              <input
                type="tel"
                placeholder="0123456789"
                className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10,15}$/,
                    message: "Phone number must be 10-15 digits",
                  },
                })}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
              )}
            </div>

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
                    validate: value =>
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/.test(value) ||
                      "Password must contain uppercase, lowercase, number, and special character."
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
                    validate: value => value === password || "Passwords do not match",
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
            >
              Register
            </button>

            <div className="flex items-center w-full px-10 gap-2">
              <div className="flex-grow border-t border-white"></div>
              <div className="text-white">OR</div>
              <div className="flex-grow border-t border-white"></div>
            </div>

            <button
              type="button"
              className="flex cursor-pointer w-2/3 items-center justify-center mx-auto py-2 text-lg font-medium text-white rounded-full bg-transparent shadow-none border border-white"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
                alt="Google icon"
                className="w-[26px] me-2"
              />
              Continue with Google
            </button>
          </form>

          <div className="text-center mt-4 text-sm">
            <span className="text-gray-400">Already have an account? </span>
            <Link to="/user_login?role=user" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
