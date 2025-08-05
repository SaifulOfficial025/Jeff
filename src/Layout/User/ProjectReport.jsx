


import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { LogOut } from "lucide-react";
import { IoSettings, IoCloudUploadOutline } from "react-icons/io5";
import { LuMessageSquareText } from "react-icons/lu";
import { FaChevronDown } from 'react-icons/fa';
import NewProjectModal from './NewProjectModal';
import { setUploadedFiles, loadFromLocalStorage, setCurrentProject } from '../../redux/features/projectSlice';
import UserNavbar from './UserNavbar';
import { useGetAllProjectsQuery } from '../../redux/features/baseApi';

export default function ProjectReport() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { uploadedFiles } = useSelector((state) => state.project);
  const fileInputRef = useRef(null);

  // Fetch all projects from API
  const { data: allProjects, isLoading: projectsLoading, error: projectsError } = useGetAllProjectsQuery();

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

  useEffect(() => {
    // Load data from localStorage on component mount
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  // Handle view project click
  const handleViewProject = (project) => {
    // Set the current project in Redux store
    dispatch(setCurrentProject({
      project_id: project.id,
      project_name: project.name,
      scope: project.scope,
      description: project.project_description,
      status: project.status,
      progress: project.progress,
      created_at: project.created_at,
      updated_at: project.updated_at
    }));
    navigate('/view_project');
  };

  // Remove a file from uploadedFiles
  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = uploadedFiles.filter((_, idx) => idx !== indexToRemove);
    dispatch(setUploadedFiles(updatedFiles));
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    toast.success('File removed!');
  };

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
      if (fileInputRef.current) fileInputRef.current.value = "";
      
      // Convert file to base64 and store in Redux/localStorage
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
          data: e.target.result,
          lastModified: file.lastModified,
          id: `${file.name}-${file.lastModified}-${Date.now()}` // Add unique ID
        };
        
        // Create a new array instead of mutating existing one
        const newUploadedFiles = [...uploadedFiles, fileData];
        dispatch(setUploadedFiles(newUploadedFiles));
        toast.success('File uploaded successfully!');
      };
      reader.onerror = () => {
        toast.error('Error reading file. Please try again.');
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
          lastModified: file.lastModified,
          id: `${file.name}-${file.lastModified}-${Date.now()}` // Add unique ID
        };
        
        // Create a new array instead of mutating existing one
        const newUploadedFiles = [...uploadedFiles, fileData];
        dispatch(setUploadedFiles(newUploadedFiles));
        toast.success('File uploaded successfully!');
      };
      reader.onerror = () => {
        toast.error('Error reading file. Please try again.');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleProjectSubmit = () => {
    // Refresh the projects list after creating a new project
    setIsModalOpen(false);
    // You might want to refetch the projects list here
    toast.success('Project created successfully!');
  };

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Header */}
      <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-c3qyUdu68ssiiDJdtPgIa6kdenTxUQ.png" />

      {/* Main Content */}
      <main className="max-w-4xl mx-auto py-8 px-4">
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
                ref={fileInputRef}
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
            className={`bg-[#2664EA] py-2 px-14 rounded-full mb-10 ${uploadedFiles.length === 0 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-blue-700'}`}
            onClick={() => {
              if (uploadedFiles.length === 0) {
                toast.error('Please upload at least one file before creating a project.');
                return;
              }
              setIsModalOpen(true);
            }}
            disabled={uploadedFiles.length === 0}
          >
            Create a new project
          </button>
        </div>

        {/* Projects List */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">All projects</h2>
          </div>

          <div className="space-y-2">
            {projectsLoading ? (
              <div className="text-center py-4">Loading projects...</div>
            ) : projectsError ? (
              <div className="text-red-500 text-center py-4">Error loading projects</div>
            ) : allProjects && allProjects.length > 0 ? (
              allProjects.map((project, index) => (
                <div
                  key={project.id || index}
                  className="flex items-center justify-between bg-[#1E293B] text-white px-4 py-4 rounded-md text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{project.name}</span>
                    <span className="text-gray-400 text-xs">Status: {project.status}</span>
                    <span className="text-gray-400 text-xs">Progress: {project.progress}%</span>
                  </div>
                  <button 
                    onClick={() => handleViewProject(project)}
                    className="text-green-500 hover:underline cursor-pointer"
                  >
                    View Project
                  </button>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-400">No projects found</div>
            )}
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
