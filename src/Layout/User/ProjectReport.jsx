


import { LogOut } from "lucide-react";
import { IoSettings, IoCloudUploadOutline } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import NewProjectModal from './NewProjectModal';
import { setUploadedFiles, loadFromLocalStorage } from '../../redux/features/projectSlice';
import UserNavbar from './UserNavbar';


  // Remove a file from uploadedFiles
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter((_, idx) => idx !== indexToRemove);
    dispatch(setUploadedFiles(updatedFiles));
    toast.success('File removed!');
  };
import { FaChevronDown } from 'react-icons/fa';

export default function ProjectReport() {
  const navigate = useNavigate();
  // Auto-redirect if not logged in
  useEffect(() => {
    const access = localStorage.getItem('access_token');
    const refresh = localStorage.getItem('refresh_token');
    if (!access && !refresh) {
      window.location.href = '/user_login?role=user';
    }
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [projects, setProjects] = useState([
    { name: "Holy Cross Hospital", details: "Project details would go here" },
    { name: "Charleston Self Storage", details: "Project details would go here" },
    { name: "Hampton Inn - Test", details: "Project details would go here" },
  ]);


  const dispatch = useDispatch();
  const { uploadedFiles } = useSelector((state) => state.project);

  // Remove a file from uploadedFiles
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter((_, idx) => idx !== indexToRemove);
    dispatch(setUploadedFiles(updatedFiles));
    toast.success('File removed!');
  };

  useEffect(() => {
    // Load data from localStorage on component mount
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  const validateFile = (file) => {
    const allowedTypes = ['application/pdf'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      toast.error('Only PDF files are allowed!');
      return false;
    }

    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB!');
      return false;
    }

    return true;
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      
      // Convert file to base64 and store in Redux/localStorage
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result,
          lastModified: file.lastModified
        };
        dispatch(setUploadedFiles([...uploadedFiles, fileData]));
        toast.success('File uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && validateFile(file)) {
      setSelectedFile(file);
      
      // Convert file to base64 and store in Redux/localStorage
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result,
          lastModified: file.lastModified
        };
        dispatch(setUploadedFiles([...uploadedFiles, fileData]));
        toast.success('File uploaded successfully!');
      };
      reader.readAsDataURL(file);
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
      <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c3qyUdu68ssiiDJdtPgIa6kdenTxUQ.png" />

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
            <p className="text-sm text-gray-500">Upload Drawings/Specs (PDF only)</p>
            {selectedFile && (
              <p className="text-sm text-gray-400 mt-2">Selected: {selectedFile.name}</p>
            )}
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-300 mb-2">Uploaded Files:</p>
                <div className="space-y-1">
                  {uploadedFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                      <span>📄 {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                      <button
                        className="ml-2 text-red-400 hover:text-red-600 text-xs px-2 py-1 rounded"
                        onClick={() => handleRemoveFile(index)}
                        type="button"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
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