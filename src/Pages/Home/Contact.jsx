import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    reset()
  };

  return (
    <section className="bg-[#121212] min-h-screen flex items-center justify-center py-16">
      <div className="p-6 w-full max-w-4xl mx-auto">
        <h1 className="text-[48px] font-bold text-white mb-10 text-center">
          Do you have <span className='text-[#1471FF]'>any questions?</span>
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Name & Email */}
          <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
            <div className="w-full">
              <input
                {...register('fullName', { required: 'Full Name is required' })}
                type="text"
                placeholder="Full Name"
                className="w-full rounded-md bg-[#1471FF1A] text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-5 transition-all duration-300"
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
              )}
            </div>
            <div className="w-full">
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                placeholder="Email"
                className="w-full rounded-md bg-[#1471FF1A] text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-5 transition-all duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          {/* Construction Type */}
          <div>
            <input
              {...register('constructionType', { required: 'Construction Type is required' })}
              type="text"
              placeholder="Construction Type"
              className="w-full rounded-md bg-[#1471FF1A] text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-5 transition-all duration-300"
            />
            {errors.constructionType && (
              <p className="text-red-500 text-sm mt-1">{errors.constructionType.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <textarea
              {...register('message', { required: 'Message is required' })}
              placeholder="Write your message..."
              rows="6"
              className="w-full rounded-md bg-[#1471FF1A] text-gray-200 placeholder-gray-400 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none py-3 px-5 transition-all duration-300"
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
        
              <button className="text-white text-[20px] cursor-pointer border border-[#1471FF] rounded-full bg-[#1471FF] px-18 py-3">
              Send
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
