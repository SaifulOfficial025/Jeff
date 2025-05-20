// import { LogOut } from "lucide-react";
// import { IoSettings } from "react-icons/io5";
// import { LuMessageSquareText } from "react-icons/lu";

// export default function ProjectReport() {
//   return (
//     <div className="min-h-screen bg-[#111827] text-white">
//       {/* Header */}
//       <header className="flex justify-between items-center p-4 border-b border-gray-800 px-32">
//         <div className="text-2xl font-bold text-blue-500">DO5 Estimator</div>
//         <div className="flex items-center gap-4">
//           <button className="btn btn-circle btn-sm bg-gray-700 border-none">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-5 w-5"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//               />
//             </svg>
//           </button>
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
//               <div className="avatar">
//                 <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
//                   <img
//                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c3qyUdu68ssiiDJdtPgIa6kdenTxUQ.png"
//                     alt="User"
//                     className="rounded-full"
//                   />
//                 </div>
//               </div>
//               <span>Jeffryan</span>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-4 w-4"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//               </svg>
//             </div>
//             <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1F2937] rounded-box w-52">
//               <li>
//                 <a className="flex items-center gap-2">
//                  <IoSettings size={20} /> 
//                   Setting
//                 </a>
//               </li>
//               <li>
//                 <a className="flex items-center gap-2 text-red-400">
//                    <LogOut size={20} />
//                   Log Out
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto py-8 px-4">
//         {/* Generate Report Card */}
//         <div className="bg-[#1E293B] rounded-lg p-6 mb-8 text-center">
//           <h2 className="text-2xl font-semibold mb-4">Generate Complete Project Report</h2>
//           <button className="bg-[#2664EA] py-2 px-14 rounded-full cursor-pointer hover:bg-blue-700">Generate All</button>
//         </div>

//         {/* File Upload Area */}
//         <div className="border-2 border-dashed border-gray-600 rounded-lg p-10 mb-8 text-center">
//           <div className="flex flex-col items-center justify-center">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               className="h-10 w-10 mb-4 text-gray-400"
//               fill="none"
//               viewBox="0 0 24 24"
//               stroke="currentColor"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12"
//               />
//             </svg>
//             <p className="mb-2 text-gray-300">
//               Drag and drop file or <span className="text-blue-500">Choose file</span>
//             </p>
//             <p className="text-sm text-gray-500">Upload Drawings/Specs</p>
//           </div>
//         </div>

//       <div className="w-1/3 mx-auto ">
//           {/* Create Project Button */}
//         <button className="bg-[#2664EA] py-2 px-14 rounded-full cursor-pointer hover:bg-blue-700 mb-10">
//           Create a new project
//         </button>
//       </div>

//         {/* Projects List */}
//         <div className="mb-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">All projects</h2>
//             <button className="flex items-center gap-1 hover:underline cursor-pointer text-gray-300">
//              <LuMessageSquareText size={20} />
//               Message Us
//             </button>
//           </div>

//           <div className="space-y-2">
//             <div className="collapse collapse-arrow bg-[#1E293B] rounded-md">
//               <input type="checkbox" />
//               <div className="collapse-title text-white py-4">Holy Cross Hospital</div>
//               <div className="collapse-content bg-[#111827]">
//                 <p>Project details would go here</p>
//               </div>
//             </div>

//             <div className="collapse collapse-arrow bg-[#1E293B] rounded-md">
//               <input type="checkbox" />
//               <div className="collapse-title text-white py-4">Charleston Self Storage</div>
//               <div className="collapse-content bg-[#111827]">
//                 <p>Project details would go here</p>
//               </div>
//             </div>

//             <div className="collapse collapse-arrow bg-[#1E293B] rounded-md">
//               <input type="checkbox" />
//               <div className="collapse-title text-white py-4">Hampton Inn - Test</div>
//               <div className="collapse-content bg-[#111827]">
//                 <p>Project details would go here</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }


import { LogOut } from "lucide-react";
import { IoSettings, IoCloudUploadOutline } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NewProjectModal from './NewProjectModal'; // Assuming the modal component is in a separate file

export default function ProjectReport() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projects, setProjects] = useState([
    { name: "Holy Cross Hospital", details: "Project details would go here" },
    { name: "Charleston Self Storage", details: "Project details would go here" },
    { name: "Hampton Inn - Test", details: "Project details would go here" },
  ]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Selected file:", file.name);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
      console.log("Dropped file:", file.name);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleProjectSubmit = (newProject) => {
    setProjects([...projects, newProject]);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Header */}
      <header className="flex justify-between items-center p-4 border-b border-gray-800 px-32">
        <div className="text-2xl font-bold text-blue-500">DO5 Estimator</div>
        <div className="flex items-center gap-4">
          <button className="btn btn-circle btn-sm bg-gray-700 border-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
          </button>
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="flex items-center gap-2 cursor-pointer">
              <div className="avatar">
                <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c3qyUdu68ssiiDJdtPgIa6kdenTxUQ.png"
                    alt="User"
                    className="rounded-full"
                  />
                </div>
              </div>
              <span>Jeffryan</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-[#1F2937] rounded-box w-52">
              <li>
                <a className="flex items-center gap-2">
                  <IoSettings size={20} />
                  Setting
                </a>
              </li>
              <li>
                <a className="flex items-center gap-2 text-red-400">
                  <LogOut size={20} />
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
        {/* Generate Report Card */}
        <div className="bg-[#1E293B] rounded-lg p-6 mb-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Generate Complete Project Report</h2>
          <button className="bg-[#2664EA] py-2 px-14 rounded-full cursor-pointer hover:bg-blue-700">
            Generate All
          </button>
        </div>

        {/* File Upload Area */}
        <div
          className="border-2 border-dashed border-gray-600 rounded-lg p-10 mb-8 text-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="flex flex-col items-center justify-center">
            <IoCloudUploadOutline className="h-10 w-10 mb-4 text-gray-400" />
            <p className="mb-2 text-gray-300">
              Drag and drop file or{" "}
              <label htmlFor="file-upload" className="text-blue-500 cursor-pointer">
                Choose file
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
            </p>
            <p className="text-sm text-gray-500">Upload Drawings/Specs</p>
            {selectedFile && (
              <p className="text-sm text-gray-400 mt-2">Selected: {selectedFile.name}</p>
            )}
          </div>
        </div>

        <div className="w-1/3 mx-auto">
          {/* Create Project Button */}
          <button
            className="bg-[#2664EA] py-2 px-14 rounded-full cursor-pointer hover:bg-blue-700 mb-10"
            onClick={() => setIsModalOpen(true)}
          >
            Create a new project
          </button>
        </div>

        {/* Projects List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All projects</h2>
            <button className="flex items-center gap-1 hover:underline cursor-pointer text-gray-300">
              <LuMessageSquareText size={20} />
              Message Us
            </button>
          </div>

          <div className="space-y-2">
            {projects.map((project, index) => (
              <div key={index} className="collapse collapse-arrow bg-[#1E293B] rounded-md">
                <input type="checkbox" />
                <div className="collapse-title text-white py-4">{project.name}</div>
                <div className="collapse-content bg-[#111827]">
                  <p>{project.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* New Project Modal */}
        <NewProjectModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleProjectSubmit}
        />
      </main>
    </div>
  );
}