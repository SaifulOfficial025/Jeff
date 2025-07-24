import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const employeeEmailVerification = () => {
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


           <Link to="/employee_otp_verify">
               <button
              type="submit"
              className="btn text-lg font-medium rounded-full bg-blue-500 py-6 shadow-none hover:bg-blue-600 text-white w-full border-none"
            >
              Confirm
            </button>
           </Link>
  
          </form>
 
        </div>
      </div>
    </div>
    </div>
  )
}

export default employeeEmailVerification
