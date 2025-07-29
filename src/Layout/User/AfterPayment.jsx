
import React, { useEffect, useState } from 'react';
import { FaDownload, FaComment, FaSpinner } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { loadFromLocalStorage } from '../../redux/features/projectSlice';
import { useGetProjectDetailsQuery, useProcessAiAnalysisMutation } from '../../redux/features/baseApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const AfterPayment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectName, currentProject } = useSelector((state) => state.project);
  
  // Get current project id (support both project_id and id)
  const projectId = currentProject?.project_id || currentProject?.id;
  const { data: projectDetails, refetch } = useGetProjectDetailsQuery(projectId, { skip: !projectId });
  const [processAiAnalysis, { isLoading: isProcessing }] = useProcessAiAnalysisMutation();

  // State for AI processing
  const [aiProcessingStarted, setAiProcessingStarted] = useState(false);
  const [aiProcessingComplete, setAiProcessingComplete] = useState(false);
  const [generatedFiles, setGeneratedFiles] = useState([]);
  const [processingError, setProcessingError] = useState(null);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  // Auto-start AI processing when component mounts
  useEffect(() => {
    const startProcessing = async () => {
      if (projectId && !aiProcessingStarted && !aiProcessingComplete) {
        setAiProcessingStarted(true);
        setProcessingError(null);

        try {
          const response = await processAiAnalysis(projectId).unwrap();
          console.log('AI Processing response:', response);
          
          if (response.success) {
            setGeneratedFiles(response.generated_files || []);
            setAiProcessingComplete(true);
            toast.success(response.message || 'AI processing completed successfully!');
            
            // Refetch project details to get updated files
            refetch();
          } else {
            throw new Error(response.message || 'AI processing failed');
          }
        } catch (error) {
          console.error('AI Processing error:', error);
          setProcessingError(error.message || 'Failed to process AI analysis');
          toast.error(error.message || 'Failed to process AI analysis');
        }
      }
    };

    startProcessing();
  }, [projectId, aiProcessingStarted, aiProcessingComplete, processAiAnalysis, refetch]);

  const handleAiProcessing = async () => {
    if (!projectId) {
      toast.error('No project selected');
      return;
    }

    setAiProcessingStarted(false);
    setAiProcessingComplete(false);
    setProcessingError(null);
    setGeneratedFiles([]);
  };

  // Use API data when available, fallback to current project data
  const project = projectDetails || currentProject || {};

  // Process files from API response or generated files
  const getProcessedFiles = () => {
    const files = [];
    // Use backend base URL for relative paths
    const backendBaseUrl = 'https://e2a31fa8fde8.ngrok-free.app'; // Use your actual backend URL
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

  // Show loading state during AI processing
  if (isProcessing || (aiProcessingStarted && !aiProcessingComplete && !processingError)) {
    return (
      <div className="min-h-screen bg-[#111827] text-white">
        <UserNavbar userName="Jeffryan" avatarUrl="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png" />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="mb-4">
              <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
            </div>
            <div className="text-xl mb-2">Processing AI Analysis...</div>
            <div className="text-gray-400">This may take a few minutes. Please wait while we generate your reports.</div>
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
            <span className="text-blue-500">{projectName || currentProject?.project_name || 'No Project Selected'}</span>
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
              Your payment has been processed successfully and AI analysis has generated {generatedFiles.length} files for your project.
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
              <FaComment className="h-5 w-5 mr-1" />
              Back to Projects
            </button>
          </div>

          {/* Files Table */}
          <div className="overflow-x-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">{project.name || currentProject?.project_name || 'Project Files'}</h3>
              {aiProcessingComplete && (
                <div className="text-sm text-green-400">
                  ✅ {generatedFiles.length} files generated successfully
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
        {aiProcessingComplete && generatedFiles.length > 0 && (
          <div className="bg-[#1E293B] rounded-lg p-6 space-y-4">
            <h3 className="text-lg font-semibold mb-4">Processing Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{generatedFiles.length}</div>
                <div className="text-gray-400">Files Generated</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">✓</div>
                <div className="text-gray-400">Processing Complete</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {generatedFiles.filter(f => f.file_type === 'highlighted_pdf').length}
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
