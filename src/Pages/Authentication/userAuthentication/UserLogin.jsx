import { Eye, EyeOff } from 'lucide-react';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';

const UserLogin = () => {
 const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors }, 
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


  //catch the role
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get("role");
  console.log(role, "role basis")

  // Form submission handler
  const onSubmit = async (data) => {
   console.log(data)
  };

  return (
    <div>
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-center">
        <div className="w-full md:w-1/2 flex justify-between">
          <div>
            <img
              src="https://i.ibb.co/vxJJKbg5/Group-2147226063.png"
              alt="Registration illustration"
               width={400}
              height={400}
              className="h-[500px] w-[630px]"
            />
          </div>
        </div>

        <div className="w-full md:w-1/2 max-w-md">
          <div className="text-center mb-6">
            <h1 className="text-[38px] font-bold text-blue-500">DOS Estimator</h1>
            <p className="text-white text-lg mb-10">Welcome Back!</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            
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
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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

         <div className='mb-5 text-white text-sm underline flex items-center justify-end cursor-pointer'>
             <Link to='/user_email_verification'>Forget Password</Link>
         </div>

           <Link to="/">
               <button
              type="submit"
              className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
            >
              Login
            </button>
           </Link>

          
<div className="flex items-center w-full px-10 gap-2 mt-5">
  <div className="flex-grow border-t border-white"></div>
  <div className="text-white">OR</div>
  <div className="flex-grow border-t border-white"></div>
</div>

            <button
  type="submit"
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
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default UserLogin
