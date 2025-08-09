import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const EmailVerification = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data) => {
    setApiError("");
    try {
      const res = await fetch(`${ "https://twin-friday-wallpapers-releases.trycloudflare.com"}/api/users/forgot-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true'},
        body: JSON.stringify({ email: data.email }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Failed to send verification email");
      }
      // Store email for next steps
      localStorage.setItem("reset_email", data.email);
      navigate("/otp_verify");
    } catch (err) {
      setApiError(err.message);
    }
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
          <div className="text-center mb-20">
            <h1 className="text-[38px] font-bold text-blue-500">DOS Estimator</h1>
            <p className="text-white text-lg mb-10">Confirm your mail!</p>
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
            {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
            <button
              type="submit"
              className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
            >
              Confirm
            </button>
          </form>
 
        </div>
      </div>
    </div>
    </div>
  )
}

export default EmailVerification
