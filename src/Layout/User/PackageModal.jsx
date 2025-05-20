
import { FaTimes } from 'react-icons/fa';

const PackageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] bg-opacity-70 ">
      <div className="bg-[#1F2937] rounded-lg p-6 w-full max-w-sm relative border border-gray-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-200"
        >
          <FaTimes className="h-5 w-5 cursor-pointer" />
        </button>

        {/* Modal Content */}
        <div className="text-center">
          <h2 className="text-xl font-semibold text-blue-400 mb-2">DO5 Estimator Plan</h2>
          <div className="flex justify-center mb-4">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Group%202147226063-9sZGCr5J5e5n1qG7qO8x9qY9wXy9qZ.png"
              alt="Plan Illustration"
              className="h-24 w-24"
            />
          </div>
          <p className="text-4xl font-bold text-white mb-4">$99</p>
          <ul className="text-left text-gray-300 space-y-2 mb-6">
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Consectetur adipiscing elit
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Sed do eiusmod tempor
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Incididunt dolore magna aliqua
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Ut enim ad minim veniam
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Quis nostrud exercitation
            </li>
            <li className="flex items-start">
              <span className="text-blue-400 mr-2">•</span>
              Duis aute irure in voluptate velit
            </li>
          </ul>
          <button className="btn bg-blue-500 hover:bg-blue-600 text-white w-full rounded-full py-3">
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default PackageModal;