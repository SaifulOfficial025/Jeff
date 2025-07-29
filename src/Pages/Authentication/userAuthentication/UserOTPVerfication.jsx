import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

const UserOTPVerfication = () => {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      otp: ['', '', '', '', '', ''], // Array for 6 digits
    },
  });

  const inputRefs = useRef([]);
  const otp = watch('otp'); // Watch OTP array for real-time updates

  // Handle input change and auto-focus
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value) && index < 5) {
      inputRefs.current[index + 1].focus();
    } else if (value === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle keydown (backspace, arrow keys)
  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle paste event
  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (paste.length === 6) {
      const otpArray = paste.split('');
      setValue('otp', otpArray);
      inputRefs.current[5].focus();
    }
    e.preventDefault();
  };

  // Auto-submit when all 6 digits are filled
  useEffect(() => {
    if (otp.every((digit) => digit !== '')) {
      handleSubmit(onSubmit)();
    }
  }, [otp]);

  const onSubmit = async (data) => {
    setApiError("");
    const otpCode = data.otp.join("");
    const email = localStorage.getItem("reset_email");
    if (!email) {
      setApiError("Email not found. Please restart the process.");
      return;
    }
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL || "https://e2a31fa8fde8.ngrok-free.app"}/api/users/reset-request-activate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'ngrok-skip-browser-warning': 'true' },
        body: JSON.stringify({ email, otp: otpCode }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.detail || "Invalid OTP");
      }
      navigate("/reset_password");
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
                alt="OTP verification illustration"
                width={400}
                height={400}
                className="h-[500px] w-[630px]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 max-w-md">
            <div className="text-center mb-20">
              <h1 className="text-[38px] font-bold text-blue-500">DO5 Estimator</h1>
              <p className="text-white text-lg mb-10">Enter the 6-digit OTP sent to your phone!</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} onPaste={handlePaste}>
              <div className="flex justify-between gap-2">
                {Array.from({ length: 4 }).map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className={`input input-bordered w-12 h-12 text-center text-xl bg-gray-900 border-gray-700 text-white ${
                      errors.otp?.[index] ? 'input-error' : ''
                    }`}
                    {...register(`otp.${index}`, {
                      required: 'Digit required',
                      pattern: {
                        value: /^[0-9]$/,
                        message: 'Must be a digit',
                      },
                    })}
                    onChange={(e) => {
                      setValue(`otp.${index}`, e.target.value);
                      handleInputChange(e, index);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                  />
                ))}
              </div>
              {errors.otp && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.otp.find((error) => error)?.message || 'Please enter a valid OTP'}
                </p>
              )}
              {apiError && <p className="text-red-500 text-sm mt-2">{apiError}</p>}
              <button
                type="submit"
                className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
              >
                Verify OTP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOTPVerfication;