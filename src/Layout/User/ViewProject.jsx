


import React, { useEffect } from 'react';
import { FaDownload, FaComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PackagePlanModal from './PackageModal';
import { loadFromLocalStorage } from '../../redux/features/projectSlice';
import { useGetLatestProjectQuery, useSendToEmployeeMutation } from '../../redux/features/baseApi';
import { useGetProjectDetailsQuery } from '../../redux/features/baseApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const ViewProject = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectName, currentProject } = useSelector((state) => state.project);
  const { data: latestProject } = useGetLatestProjectQuery();
  
  // Get current project id
  const projectId = currentProject?.project_id;
  const { data: projectDetails, isLoading: projectLoading } = useGetProjectDetailsQuery(projectId, { skip: !projectId });
  const [sendToEmployee, { isLoading: isSending }] = useSendToEmployeeMutation();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  // Use API data when available, fallback to current project data
  const project = projectDetails || currentProject || {};

  // Process files from API response
  const getProcessedFiles = () => {
    if (!projectDetails) return [];
    
    const files = [];
    
    // Original files (user_files)
    if (projectDetails.user_files) {
      projectDetails.user_files.forEach(file => {
        files.push({
          id: file.id,
          category: 'Original Files',
          name: file.files.split('/').pop() || 'Unknown file',
          viewLink: file.files,
          downloadLink: file.files,
        });
      });
    }

    // Employee files
    if (projectDetails.employee_files) {
      projectDetails.employee_files.forEach(file => {
        files.push({
          id: `emp_${file.id}`,
          category: 'Employee Files',
          name: file.files.split('/').pop() || 'Unknown file',
          viewLink: file.files,
          downloadLink: file.files,
        });
      });
    }

    // Generated files (highlighted, analysis, estimates)
    if (projectDetails.generated_files) {
      projectDetails.generated_files.forEach(file => {
        let category = 'Generated Files';
        const filename = file.filename || file.files.split('/').pop() || 'Unknown file';
        
        if (filename.toLowerCase().includes('highlighted')) {
          category = 'Highlighted PDF';
        } else if (filename.toLowerCase().includes('analysis')) {
          category = 'Analysis Reports';
        } else if (filename.toLowerCase().includes('detailed_estimate')) {
          category = 'Detailed Estimate';
        } else if (filename.toLowerCase().includes('engineering_estimate')) {
          category = 'Engineering Estimate';
        }

        files.push({
          id: `gen_${file.id}`,
          category: category,
          name: filename,
          viewLink: file.files,
          downloadLink: file.files,
        });
      });
    }

    // Add default rows for missing file types
    const requiredCategories = ['Original Files', 'Highlighted PDF', 'Analysis Reports', 'Detailed Estimate', 'Engineering Estimate'];
    requiredCategories.forEach(category => {
      if (!files.some(file => file.category === category)) {
        files.push({
          id: `placeholder_${category}`,
          category: category,
          name: `No ${category.toLowerCase()}`,
          viewLink: null,
          downloadLink: null,
        });
      }
    });

    return files;
  };

  const tableData = getProcessedFiles();

  // Show loading state
  if (projectLoading && projectId) {
    return (
      <div className="min-h-screen bg-[#111827] text-white">
        <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg">Loading project details...</div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if no project is selected
  if (!projectId && !currentProject) {
    return (
      <div className="min-h-screen bg-[#111827] text-white">
        <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-lg text-red-400">No project selected</div>
            <button 
              onClick={() => navigate('/project_report')}
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
            >
              Go back to projects
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111827] text-white">
      {/* Header */}
      <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />

      {/* Project Info */}
      <div className="bg-[#1E293B] p-4 border-b border-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="mb-1">
            <span className="text-gray-400">Project Name: </span>
            <span className="text-blue-500">{project.project_name || project.name || currentProject?.project_name || 'No Project Selected'}</span>
          </div>
          <div>
            <span className="text-gray-400">Scope of work: </span>
            <span className="text-gray-300">{currentProject?.scope || 'Lorem ipsum dolor sit amet consectetur.'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
      
        <div className="bg-[#1E293B] rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold mb-3">Project Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {project.project_description || project.description || 'No description available'}
          </p>
        </div>

        {/* Recent Projects */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Recent projects</h2>
            <button
              className="btn btn-sm btn-ghost text-gray-300"
              disabled={projectLoading || !projectId}
              onClick={() => {
                if (projectLoading || !projectId) return;
                const allowed = [
                  'employee_accepted',
                  'sent_to_vendor',
                  'completed',
                ];
                const status = projectDetails?.status;
                console.log('Project status:', status);
                if (allowed.includes(status)) {
                  navigate('/user_chat');
                } else {
                  toast.error('Project Status must be in these three status (employee_accepted, sent_to_vendor, completed)');
                }
              }}
            >
              <FaComment className="h-5 w-5 mr-1" />
              Message Us
            </button>
          </div>

          {/* Project Files Table */}
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{project.project_name || project.name || currentProject?.project_name || 'Project Files'}</h3>
              <button
                className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white"
                disabled={isSending}
                onClick={async () => {
                  if (!currentProject?.project_id) {
                    toast.error('No project selected');
                    return;
                  }
                  try {
                    const res = await sendToEmployee(currentProject.project_id).unwrap();
                    console.log('Send to Employee response:', res);
                    toast.success(res.status);
                  } catch (err) {
                    toast.error('Failed to send to employee');
                    console.error(err);
                  }
                }}
              >
                {isSending ? 'Sending...' : 'Sent to Employee'}
              </button>
            </div>
            <table className="table w-full bg-transparent">
  <thead>
    <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
      <th className="py-2">File Type</th>
      <th className="py-2">File Name</th>
      <th className="py-2">Display</th>
      <th className="py-2 text-right">Action</th>
    </tr>
  </thead>
  <tbody>
    {tableData.map((row) => (
      <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-800/30">
        <td className="text-blue-500 font-medium">{row.category}</td>
        <td className="text-blue-400">{row.name}</td>
        <td>
          {row.viewLink ? (
            <a
              href={row.viewLink}
              className="text-blue-400 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              View
            </a>
          ) : (
            <span className="text-gray-500">None</span>
          )}
        </td>
        <td className="text-right">
          {row.downloadLink ? (
            <button
              className="text-blue-400 hover:underline flex items-center justify-end gap-2"
              type="button"
              onClick={async () => {
                if (!row.downloadLink) return;
                const fileUrl = row.downloadLink;
                const fileName = row.name || 'downloaded_file';
                const isCsv = fileName.toLowerCase().endsWith('.csv');
                const isPdf = fileName.toLowerCase().endsWith('.pdf');
                try {
                  const response = await fetch(fileUrl, { credentials: 'include' });
                  if (!response.ok) throw new Error('File not found');
                  const blob = await response.blob();
                  const mimeType = isCsv ? 'text/csv' : isPdf ? 'application/pdf' : blob.type;
                  const safeBlob = new Blob([blob], { type: mimeType });
                  const url = window.URL.createObjectURL(safeBlob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = fileName;
                  document.body.appendChild(a);
                  a.click();
                  setTimeout(() => {
                    window.URL.revokeObjectURL(url);
                    document.body.removeChild(a);
                  }, 100);
                } catch (err) {
                  toast.error('Failed to download file.');
                  console.error(err);
                }
              }}
            >
              Download
              <FaDownload className="h-5 w-5" />
            </button>
          ) : (
            <span className="text-gray-500 flex items-center justify-end gap-2">
              Not available
              <FaDownload className="h-5 w-5 opacity-30" />
            </span>
          )}
        </td>
      </tr>
    ))}
  </tbody>
</table> 
          </div>
        </div>
 {/* Assignment and Progress */}
        <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
          <div className="flex items-center">
            <span className="text-md font-semibold w-32">Assign to :</span>
            <span className="text-gray-300">
              {project.assigned_to?.full_name || 'Not assigned'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-md font-semibold w-32">Employee ID :</span>
            <span className="text-gray-300">
              {project.assigned_to?.id || 'N/A'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-md font-semibold w-32">Progress :</span>
            <div className="flex-1 bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full"
                style={{ width: `${project.progress || 0}%` }}
              ></div>
            </div>
            <span className="ml-3 text-gray-300">{project.progress || 0}%</span>
          </div>
          <div className="flex items-center">
            <span className="text-md font-semibold w-32">Status :</span>
            <span className="text-gray-300 capitalize">
              {project.status?.replace(/_/g, ' ') || 'Unknown'}
            </span>
          </div>
        </div>
   
      </main>
    </div>
  );
};

export default ViewProject;
