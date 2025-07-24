import React, { useState, useEffect } from 'react';
import UserNavbar from './UserNavbar';
import { Edit } from 'lucide-react';
import { ChevronDown } from 'lucide-react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../../redux/features/baseApi';
import { toast } from 'sonner';

const UserProfile = () => {

  // Fetch user profile
  const { data: profile, isLoading, isError, refetch } = useGetProfileQuery();
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [country, setCountry] = useState('');
  const [description, setDescription] = useState('');

  // Populate form fields when profile data loads
  useEffect(() => {
    if (profile) {
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setEmail(profile.email || '');
      setRole(profile.role || '');
      setCountry(profile.country || '');
      setDescription(profile.description || '');
    }
  }, [profile]);

  // Handle profile update
  const handleUpdateProfile = async () => {
    try {
      await updateProfile({
        first_name: firstName,
        last_name: lastName,
        email,
        role,
        country,
        description,
      }).unwrap();
      toast.success('Profile updated successfully!');
      refetch();
    } catch {
      toast.error('Failed to update profile');
    }
  };

  if (isLoading) {
    return <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">Loading profile...</div>;
  }
  if (isError) {
    return <div className="min-h-screen bg-gray-900 text-red-400 flex items-center justify-center">Failed to load profile.</div>;
  }

  // Compose display name for navbar
  const displayName =
    (profile?.first_name || '') +
    (profile?.last_name ? ` ${profile.last_name}` : '') ||
    profile?.email ||
    'User';

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-inter">
      {/* Header */}
      <UserNavbar userName={displayName.trim()} avatarUrl={profile?.image || "https://placehold.co/160x160/0A0A0A/FFFFFF?text=User"} />

      {/* Main Content Area */}
      <main className="p-6">
        {/* Banner Image */}
    

        {/* Profile Card */}
        <div className="relative bg-gray-800 p-6 rounded-lg shadow-xl  mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center md:items-start">
            {/* User Avatar with Edit Icon */}
            <div className="relative w-32 h-32 md:w-40 md:h-40 border-4 border-gray-700 shadow-lg  md:mr-6">
              <img
                src={profile?.image || "https://placehold.co/160x160/0A0A0A/FFFFFF?text=User"}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-1 right-1 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors duration-200">
                <Edit className="text-white" size={16} />
              </div>
            </div>

            {/* Profile Details and Form */}
            <div className="flex-grow mt-4 md:mt-0 text-center md:text-left">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-gray-50">{firstName} {lastName || profile?.email || 'User'}</h2>
                  <p className="text-blue-400 text-lg">@{role}</p>
                </div>
                <button
                  onClick={handleUpdateProfile}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-colors duration-200"
                  disabled={isUpdating}
                >
                  {isUpdating ? 'Updating...' : 'Update Profile'}
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* First Name */}
                <div>
                  <label htmlFor="firstName" className="block text-gray-400 text-sm font-medium mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label htmlFor="lastName" className="block text-gray-400 text-sm font-medium mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                {/* Email */}
                <div className="md:col-span-2">
                  <label htmlFor="email" className="block text-gray-400 text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                {/* Role */}
                <div className="md:col-span-2">
                  <label htmlFor="role" className="block text-gray-400 text-sm font-medium mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    id="role"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                {/* Country */}
                <div className="md:col-span-2">
                  <label htmlFor="country" className="block text-gray-400 text-sm font-medium mb-2">
                    Country
                  </label>
                  <div className="relative">
                    <select
                      id="country"
                      className="appearance-none w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                      <ChevronDown size={16} />
                    </div>
                  </div>
                </div>

                {/* Descriptions */}
                <div className="md:col-span-2">
                  <label htmlFor="description" className="block text-gray-400 text-sm font-medium mb-2">
                    Descriptions
                  </label>
                  <textarea
                    id="description"
                    rows="4"
                    className="w-full p-3 rounded-md bg-gray-700 border border-gray-600 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserProfile;
