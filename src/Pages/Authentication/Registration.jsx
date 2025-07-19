// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { useCreateUserMutation } from "../../redux/features/baseApi";

// export default function RegistrationPage() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [createUser, ] = useCreateUserMutation()

//   const queryParams = new URLSearchParams(location.search);
//   const role = queryParams.get("role") || "user"; 

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     watch,
//   } = useForm({
//     defaultValues: {
//       fullName: "",
//       companyName: "",
//       email: "",
//       phone: "",
//       password: "",
//       confirmPassword: "",
//     },
//   });

//   const password = watch("password");

//   // Form submission handler
//   const onSubmit = async (data) => {


   

//     try {
     

//       const payload = {
//         email: data?.email,
//         username: data?.email,
//         password:data?.password,
//       }

//       const userCreateResponse = createUser(payload).unwrap();
//       console.log(userCreateResponse,"userCreateResponse")




//       console.log("payload",payload)

//       switch (role.toLowerCase()) {
//         case "user":
//           navigate("/base_labor_rates");
//           break;
//         case "employee":
//           navigate("/emplayee_login");
//           break;
//         default:
//           navigate("/vendor_login");
//       }
//     } catch (error) {
//       console.error("Registration failed:", error);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-black flex items-center justify-center p-4">
//       <div className="w-full max-w-7xl flex flex-col md:flex-row gap-8 items-center">
//         <div className="w-full md:w-1/2 flex justify-between">
//           <div>
//             <img
//               src="https://i.ibb.co/fVhDxRcw/Group-2147226062.png"
//               alt="Registration illustration"
//               width={400}
//               height={400}
//               className="h-[500px] w-[520px]"
//             />
//           </div>
//         </div>

//         <div className="w-full md:w-1/2 max-w-md">
//           <div className="text-center mb-6">
//             <h1 className="text-[38px] font-bold text-blue-500">
//               DOS Estimator
//             </h1>
//             <p className="text-white text-lg mb-10">Register Now!</p>
//           </div>

//           <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
//             <div>
//               <label className="text-gray-400 text-sm">Full Name</label>
//               <input
//                 type="text"
//                 placeholder="John Doe"
//                 className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
//                   errors.fullName ? "input-error" : ""
//                 }`}
//                 {...register("fullName", { required: "Full name is required" })}
//               />
//               {errors.fullName && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.fullName.message}
//                 </p>
//               )}
//             </div>

        

//             <div>
//               <label className="text-gray-400 text-sm">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
//                   errors.email ? "input-error" : ""
//                 }`}
//                 {...register("email", {
//                   required: "Email is required",
//                   pattern: {
//                     value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
//                     message: "Invalid email address",
//                   },
//                 })}
//               />
//               {errors.email && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.email.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-gray-400 text-sm">Phone Number</label>
//               <input
//                 type="tel"
//                 placeholder="0123456789"
//                 className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
//                   errors.phone ? "input-error" : ""
//                 }`}
//                 {...register("phone", {
//                   required: "Phone number is required",
//                   pattern: {
//                     value: /^\d{10,15}$/,
//                     message: "Invalid phone number",
//                   },
//                 })}
//               />
//               {errors.phone && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.phone.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-gray-400 text-sm">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   placeholder="••••••"
//                   className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white pr-10 ${
//                     errors.password ? "input-error" : ""
//                   }`}
//                   {...register("password", {
//                     required: "Password is required",
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
//                   onClick={() => setShowPassword(!showPassword)}
//                 >
//                   {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
//                 </button>
//               </div>
//               {errors.password && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.password.message}
//                 </p>
//               )}
//             </div>

//             <div>
//               <label className="text-gray-400 text-sm">Confirm Password</label>
//               <div className="relative">
//                 <input
//                   type={showConfirmPassword ? "text" : "password"}
//                   placeholder="••••••"
//                   className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white pr-10 ${
//                     errors.confirmPassword ? "input-error" : ""
//                   }`}
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   })}
//                 />
//                 <button
//                   type="button"
//                   className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400"
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 >
//                   {showConfirmPassword ? (
//                     <EyeOff size={18} />
//                   ) : (
//                     <Eye size={18} />
//                   )}
//                 </button>
//               </div>
//               {errors.confirmPassword && (
//                 <p className="text-red-500 text-sm mt-1">
//                   {errors.confirmPassword.message}
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
//             >
//               Register
//             </button>

//             <div className="flex items-center w-full px-10 gap-2">
//               <div className="flex-grow border-t border-white"></div>
//               <div className="text-white">OR</div>
//               <div className="flex-grow border-t border-white"></div>
//             </div>

//             <button
//               type="submit"
//               className="flex cursor-pointer w-2/3 items-center justify-center mx-auto py-2 text-lg font-medium text-white rounded-full bg-transparent shadow-none border border-white"
//             >
//               <img
//                 src="https://cdn-icons-png.flaticon.com/128/281/281764.png"
//                 alt="Google icon"
//                 className="w-[26px] me-2"
//               />
//               Continue with Google
//             </button>
//           </form>

//           <div className="text-center mt-4 text-sm">
//             <span className="text-gray-400">Already have an account? </span>
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Log In
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


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
    const payload = {
      role,
      email: data?.email,
      phone_number: data?.phone,
      username: data?.email,
      password: data?.password,
    };

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
        navigate("/emplayee_login");
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
                {...register("username", { required: "Full name is required" })}
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>

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
              <label className="text-gray-400 text-sm">Phone Number</label>
              <input
                type="tel"
                placeholder="0123456789"
                className={`input input-bordered py-6 w-full bg-gray-900 border-gray-700 text-white ${
                  errors.phone ? "input-error" : ""
                }`}
                {...register("phone_number", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10,15}$/,
                    message: "Invalid phone number",
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
            <Link to="/user_login" className="text-blue-500 hover:underline">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
