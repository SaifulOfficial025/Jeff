
import React, { useEffect, useState } from 'react';
import { FaDownload, FaComment, FaSpinner, FaTimes } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage } from '../../redux/features/projectSlice';
import { useGetProjectDetailsQuery, useProcessAiAnalysisMutation } from '../../redux/features/baseApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';
import { FaArrowCircleLeft } from "react-icons/fa";

const AfterPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentProject } = useSelector((state) => state.project);
  
  // Get current project id (support both project_id and id)
  const projectId = currentProject?.project_id || currentProject?.id;
  const { data: projectDetails, refetch } = useGetProjectDetailsQuery(projectId, { skip: !projectId });
  const [processAiAnalysis, { isLoading: isProcessing }] = useProcessAiAnalysisMutation();

  // State for AI processing
  const [aiProcessingStarted, setAiProcessingStarted] = useState(false);
  const [aiProcessingComplete, setAiProcessingComplete] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [processingError, setProcessingError] = useState(null);
  const [progress, setProgress] = useState({ current: 0, total: 100 });
  const [statusMessage, setStatusMessage] = useState('Initializing AI analysis...');
  const [pollingInterval, setPollingInterval] = useState(null);
  const [showCancelOption, setShowCancelOption] = useState(false);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  // Auto-start AI processing when component mounts
  useEffect(() => {
    let currentInterval = null;

    // Polling function to check AI analysis status
    const pollAiStatus = async (projectId, taskId) => {
      try {
        const response = await fetch(
          `https://dan-explaining-usgs-settled.trycloudflare.com/api/projects/${projectId}/ai_analysis_status/?task_id=${taskId}`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
            },
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to check status');
        }
        
        const data = await response.json();
        
        if (data.status === 'PENDING') {
          setStatusMessage('Waiting to start...');
          setProgress({ current: 0, total: 100 });
        } else if (data.status === 'PROGRESS') {
          setStatusMessage('Running AI analysis...');
          setProgress({ current: data.current || 0, total: data.total || 100 });
        } else if (data.status === 'SUCCESS') {
          setAiProcessingComplete(true);
          setAiProcessingStarted(false);
          setGeneratedFiles(data.generated_files || []);
          setStatusMessage('AI analysis completed successfully!');
          setShowCancelOption(false);
          toast.success('AI processing completed successfully!');
          refetch();
          // Clear polling immediately
          if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
            setPollingInterval(null);
          }
          return; // Stop further polling
        } else if (data.status === 'FAILURE') {
          setProcessingError(data.error || 'AI processing failed');
          setAiProcessingStarted(false);
          setShowCancelOption(false);
          toast.error(data.error || 'AI processing failed');
          // Clear polling immediately
          if (currentInterval) {
            clearInterval(currentInterval);
            currentInterval = null;
            setPollingInterval(null);
          }
          return; // Stop further polling
        }
      } catch (error) {
        console.error('Polling error:', error);
        setProcessingError('Failed to check processing status');
        setAiProcessingStarted(false);
        setShowCancelOption(false);
        // Clear polling on error
        if (currentInterval) {
          clearInterval(currentInterval);
          currentInterval = null;
          setPollingInterval(null);
        }
      }
    };

    const startProcessing = async () => {
      if (projectId && !aiProcessingStarted && !aiProcessingComplete) {
        setAiProcessingStarted(true);
        setProcessingError(null);
        setStatusMessage('Starting AI analysis...');
        setShowCancelOption(true);

        try {
          const response = await processAiAnalysis(projectId).unwrap();
          console.log('AI Processing response:', response);
          
          if (response.task_id) {
            setStatusMessage('AI analysis started...');
            
            // Start polling every 2 seconds
            currentInterval = setInterval(() => {
              pollAiStatus(projectId, response.task_id);
            }, 2000);
            
            setPollingInterval(currentInterval);
            
            // Initial poll
            pollAiStatus(projectId, response.task_id);
          } else {
            throw new Error('No task ID received');
          }
        } catch (error) {
          console.error('AI Processing error:', error);
          setProcessingError(error.message || 'Failed to start AI analysis');
          setAiProcessingStarted(false);
          setShowCancelOption(false);
          toast.error(error.message || 'Failed to start AI analysis');
        }
      }
    };

    startProcessing();

    // Cleanup function
    return () => {
      if (currentInterval) {
        clearInterval(currentInterval);
      }
    };
  }, [projectId, aiProcessingStarted, aiProcessingComplete, processAiAnalysis, refetch]);

  // Cancel AI processing
  const handleCancelProcessing = () => {
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
    setAiProcessingStarted(false);
    setAiProcessingComplete(false);
    setProcessingError(null);
    setGeneratedFiles([]);
    setProgress({ current: 0, total: 100 });
    setStatusMessage('AI analysis cancelled');
    setShowCancelOption(false);
    toast.info('AI processing cancelled');
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (pollingInterval) {
        clearInterval(pollingInterval);
      }
    };
  }, [pollingInterval]);

  const handleAiProcessing = async () => {
    if (!projectId) {
      toast.error('No project selected');
      return;
    }

    // Reset all states
    setAiProcessingStarted(false);
    setAiProcessingComplete(false);
    setProcessingError(null);
    setGeneratedFiles([]);
    setProgress({ current: 0, total: 100 });
    setStatusMessage('Initializing AI analysis...');
    setShowCancelOption(false);
    
    // Clear any existing polling
    if (pollingInterval) {
      clearInterval(pollingInterval);
      setPollingInterval(null);
    }
  };

  // Use API data when available, fallback to current project data
  const project = projectDetails || currentProject || {};

  // Process files from API response or generated files
  const getProcessedFiles = () => {
    const files = [];
    // Use backend base URL for relative paths
    const backendBaseUrl = 'https://dan-explaining-usgs-settled.trycloudflare.com'; // Use your actual backend URL
    const makeAbsolute = (url) => {
      if (!url) return url;
      if (url.startsWith('http')) return url;
      // Use backend base URL for absolute path
      return backendBaseUrl + url;
    };
    // If AI processing is complete and we have generated files, use them
    if (aiProcessingComplete && generatedFiles.length > 0) {
      generatedFiles.forEach(file => {
        let category = 'Generated Files';
        const filename = file.file_name || 'Unknown file';
        // Categorize based on file type or name
        if (file.file_type === 'highlighted_pdf' || filename.toLowerCase().includes('highlighted')) {
          category = 'Highlighted PDF';
        } else if (filename.toLowerCase().includes('analysis') || filename.toLowerCase().includes('sow')) {
          category = 'Analysis Reports';
        } else if (filename.toLowerCase().includes('engineering_estimate')) {
          category = 'Engineering Estimate';
        } else if (filename.toLowerCase().includes('detailing_estimate') || filename.toLowerCase().includes('fabrication_estimate')) {
          category = 'Detailed Estimate';
        } else if (filename.toLowerCase().includes('material_cost') || filename.toLowerCase().includes('summary')) {
          category = 'Cost Estimates';
        }
        files.push({
          id: file.id,
          category: category,
          name: filename,
          viewLink: makeAbsolute(file.file_url),
          downloadLink: makeAbsolute(file.file_url),
          description: file.description,
          file_type: file.file_type
        });
      });
    } else if (projectDetails) {
      // Fallback to project details files
      // Original files (user_files)
      if (projectDetails.user_files) {
        projectDetails.user_files.forEach(file => {
          files.push({
            id: file.id,
            category: 'Original Files',
            name: file.files.split('/').pop() || 'Unknown file',
            viewLink: makeAbsolute(file.files),
            downloadLink: makeAbsolute(file.files),
          });
        });
      }
      // Generated files from project details
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
            viewLink: makeAbsolute(file.files),
            downloadLink: makeAbsolute(file.files),
          });
        });
      }
    }
    return files;
  };

  const tableData = getProcessedFiles();
  
  // Calculate the count of generated files (excluding original files)
  const generatedFilesCount = tableData.filter(file => 
    file.category !== 'Original Files' && 
    file.name !== 'No highlighted pdf' && 
    file.name !== 'No analysis reports' && 
    file.name !== 'No detailed estimate' && 
    file.name !== 'No engineering estimate'
  ).length;

  // Show loading state during AI processing
  if (isProcessing || (aiProcessingStarted && !aiProcessingComplete && !processingError)) {
    const progressPercentage = progress.total > 0 ? Math.round((progress.current / progress.total) * 100) : 0;
    
    return (
      <div className="min-h-screen bg-[#111827] text-white">
        <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-md mx-auto p-8">
            {/* Circular Progress Animation */}
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-gray-700"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    className="text-blue-500"
                    style={{
                      strokeDasharray: `${2 * Math.PI * 40}`,
                      strokeDashoffset: `${2 * Math.PI * 40 * (1 - progressPercentage / 100)}`,
                      transition: 'stroke-dashoffset 0.5s ease-in-out',
                    }}
                  />
                </svg>
                {/* Percentage in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-blue-400">{progressPercentage}%</span>
                </div>
              </div>
              {/* Spinning icon */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <FaSpinner className="animate-spin text-4xl text-blue-500 opacity-20" />
              </div>
            </div>

            {/* Status Message */}
            <div className="text-xl mb-4 text-blue-400">{statusMessage}</div>
            
            {/* Progress Details */}
            <div className="text-gray-400 mb-6">
              Processing step {progress.current} of {progress.total}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-3 mb-6">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>

            {/* Cancel Button */}
            {showCancelOption && (
              <button
                onClick={handleCancelProcessing}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg mx-auto transition-colors"
              >
                <FaTimes className="h-4 w-4" />
                Cancel Processing
              </button>
            )}

            {/* Additional Info */}
            <div className="text-gray-500 text-sm mt-4">
              This may take a few minutes. Please wait while we generate your reports.
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show error state if processing failed
  if (processingError) {
    return (
      <div className="min-h-screen bg-[#111827] text-white">
        <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="text-xl text-red-400 mb-4">AI Processing Failed</div>
            <div className="text-gray-400 mb-4">{processingError}</div>
            <button 
              onClick={handleAiProcessing}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded mr-4"
            >
              Retry Processing
            </button>
            <button 
              onClick={() => navigate('/project_report')}
              className="bg-gray-600 hover:bg-gray-700 px-6 py-3 rounded"
            >
              Go back to projects
            </button>
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
            <span className="text-gray-300">{currentProject?.scope || project.scope || 'Lorem ipsum dolor sit amet consectetur.'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        
        {/* Success Message */}
        {aiProcessingComplete && (
          <div className="bg-green-900/20 border border-green-500 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-2">
              <div className="text-green-400 text-lg font-semibold">✅ Payment Successful & AI Processing Complete!</div>
            </div>
            <div className="text-gray-300">
              Your payment has been processed successfully and AI analysis has generated {generatedFilesCount} files for your project.
            </div>
          </div>
        )}
      
        <div className="bg-[#1E293B] rounded-lg p-6 mb-10">
          <h2 className="text-lg font-semibold mb-3">Project Description</h2>
          <p className="text-gray-300 text-sm leading-relaxed">
            {project.project_description || project.description || 'No description available'}
          </p>
        </div>

        {/* Generated Files Section */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {aiProcessingComplete ? 'Generated Files' : 'Project Files'}
            </h2>
            <button
              className="btn btn-sm btn-ghost text-gray-300"
              onClick={() => navigate('/project_report')}
            >
              <FaArrowCircleLeft  className="h-5 w-5 mr-1" />
              Back to Projects
            </button>
          </div>

          {/* Files Table */}
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{project.project_name || project.name || currentProject?.project_name || 'Project Files'}</h3>
              {aiProcessingComplete && (
                <div className="text-sm text-green-400">
                  ✅ {generatedFilesCount} files generated successfully
                </div>
              )}
            </div>
            <table className="table w-full bg-transparent">
              <thead>
                <tr className="text-left text-gray-400 text-sm border-b border-gray-800">
                  <th className="py-2">File Type</th>
                  <th className="py-2">File Name</th>
                  <th className="py-2">Description</th>
                  <th className="py-2">Display</th>
                  <th className="py-2 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {tableData.length > 0 ? (
                  tableData.map((row) => (
                    <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                      <td className="text-blue-500 font-medium">{row.category}</td>
                      <td className="text-blue-400">{row.name}</td>
                      <td className="text-gray-300 text-sm">{row.description || '-'}</td>
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
                          <a
                            href={row.downloadLink}
                            className="text-blue-400 hover:underline flex items-center justify-end gap-2"
                            download
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                            <FaDownload className="h-5 w-5" />
                          </a>
                        ) : (
                          <span className="text-gray-500 flex items-center justify-end gap-2">
                            Not available
                            <FaDownload className="h-5 w-5 opacity-30" />
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-gray-400">
                      No files available
                    </td>
                  </tr>
                )}
              </tbody>
            </table> 
          </div>
        </div>

        {/* Processing Summary */}
        {aiProcessingComplete && generatedFilesCount > 0 && (
          <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Processing Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{generatedFilesCount}</div>
                <div className="text-gray-400">Files Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">✓</div>
                <div className="text-gray-400">Processing Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {tableData.filter(f => f.category === 'Highlighted PDF' && f.name !== 'No highlighted pdf').length}
                </div>
                <div className="text-gray-400">Highlighted PDFs</div>
              </div>
            </div>
          </div>
        )}
   
      </main>
    </div>
  );
};

export default AfterPayment;
