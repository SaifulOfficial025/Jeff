import React from 'react';
import { FaBell, FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useGetProfileQuery } from '../../redux/features/baseApi';

const UserNavbar = () => {
  const navigate = useNavigate();
  const { data: profile } = useGetProfileQuery();

  // Compose display name
  const displayName =
    (profile?.first_name || '') +
    (profile?.last_name ? ` ${profile.last_name}` : '') ||
    profile?.email ||
    'User';
  const avatarUrl = profile?.image || "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png";

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800 px-32">
      <div className="text-2xl font-bold text-blue-500">DO5 Estimator</div>
      <div className="flex items-center gap-4">
        <button className="btn btn-circle btn-sm bg-gray-700 border-none">
          <FaBell className="h-5 w-5" />
        </button>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
            <div className="avatar">
              <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                <img
                  src={avatarUrl}
                  alt="User"
                  className="rounded-full"
                  onError={e => (e.target.src = '/placeholder-user.jpg')}
                />
              </div>
            </div>
            <span>{displayName.trim()}</span>
            <FaChevronDown className="h-4 w-4" />
          </div>
          <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1F2937] rounded-box w-52">
            <li>
              <button
                className="flex items-center gap-2 w-full text-left bg-transparent border-none outline-none cursor-pointer"
                onClick={() => navigate('/user/profile')}
              >
                <FaCog className="h-5 w-5" />
                Settings
              </button>
            </li>
            <li>
              <button
                className="flex items-center gap-2 text-red-400 w-full text-left bg-transparent border-none outline-none cursor-pointer"
                onClick={() => {
                  localStorage.clear();
                  navigate('/');
                }}
              >
                <FaSignOutAlt className="h-5 w-5" />
                Log Out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
