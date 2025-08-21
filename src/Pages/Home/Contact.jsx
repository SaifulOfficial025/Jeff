import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const Contact = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    
    try {
      const payload = {
        full_name: data.fullName,
        email: data.email,
        construction_type: data.constructionType,
        message: data.message
      };

      const response = await fetch('https://indicates-artists-reflect-messages.trycloudflare.com/api/users/contact-form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        toast.success('Your message has been sent successfully!');
        reset();
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
                {...register('fullName', {
                  required: 'Full Name is required',
                  validate: {
                    hasTwoWords: value => value.trim().split(/\s+/).length >= 2 || 'Please enter your first and last name.',
                    onlyLetters: value => /^[A-Za-z ]+$/.test(value) || 'Name can only contain letters and spaces.',
                    minLength: value => value.trim().split(/\s+/).every(word => word.length >= 3) || 'Each name part must be at least 3 characters.'
                  }
                })}
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
            <button 
              type="submit"
              disabled={isSubmitting}
              className={`text-white text-[20px] cursor-pointer border border-[#1471FF] rounded-full px-18 py-3 transition-all duration-300 ${
                isSubmitting 
                  ? 'bg-gray-600 border-gray-600 cursor-not-allowed opacity-70' 
                  : 'bg-[#1471FF] hover:bg-blue-600 hover:border-blue-600'
              }`}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Contact;
