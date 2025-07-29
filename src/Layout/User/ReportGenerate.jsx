
import React, { useState, useEffect } from 'react';
import { FaDownload, FaComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PackagePlanModal from './PackageModal';
import { loadFromLocalStorage } from '../../redux/features/projectSlice';
import { useSendToEmployeeMutation } from '../../redux/features/baseApi';
import { useGetProjectDetailsQuery } from '../../redux/features/baseApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const ReportGenerate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { projectName, currentProject } = useSelector((state) => state.project);
  // Get current project id
  const projectId = currentProject?.project_id;
  const { data: projectDetails, isLoading: projectLoading } = useGetProjectDetailsQuery(projectId, { skip: !projectId });
  const [sendToEmployee, { isLoading: isSending }] = useSendToEmployeeMutation();

  useEffect(() => {
    dispatch(loadFromLocalStorage());
    
    // Check for payment cancellation
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('payment') === 'cancelled') {
      toast.error('Payment was cancelled. Please try again.');
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [dispatch]);

  // Dynamic table data
  const tableData = [
    {
      id: '1',
      category: 'Original Files',
      name: 'Structural.pdf',
      viewLink: '#',
      downloadLink: '#',
    },
    {
      id: '2',
      category: 'Highlighted.pdf',
      name: 'Structural highlighted.pdf',
      viewLink: null,
      downloadLink: '#',
    },
    {
      id: '3',
      category: 'Analysis reports',
      name: 'Steel analysis test',
      viewLink: null,
      downloadLink: '#',
    },
    {
      id: '4',
      category: 'Detailed Estimate',
      name: 'No detailed estimate',
      viewLink: null,
      downloadLink: '#',
    },
    {
      id: '5',
      category: 'Engineering Estimate',
      name: 'No engineering estimate',
      viewLink: null,
      downloadLink: '#',
    },
  ];

  // State for modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

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
            <span className="text-gray-300">{currentProject?.scope || 'Lorem ipsum dolor sit amet consectetur.'}</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto py-8 px-4">
        {/* Generate Report Card */}
        <div className="bg-[#1E293B] rounded-lg p-6 mb-12 text-center max-w-md mx-auto">
          <h2 className="text-xl font-semibold mb-4">Generate Complete Project Report</h2>
          <button
            className="btn bg-blue-600 hover:bg-blue-700 border-none text-white px-8"
            onClick={() => setIsModalOpen(true)}
          >
            Generate All
          </button>
        </div>

   
       <div className="mb-4">
  <div className="flex justify-center items-center mb-6">
    <button
      className="btn btn-sm btn-ghost text-gray-300 flex items-center"
      disabled={projectLoading || !projectId}
      onClick={() => {
        if (projectLoading || !projectId) return;
        const allowed = ['employee_accepted', 'sent_to_vendor', 'completed'];
        const status = projectDetails?.status;
        console.log('Project status:', status);
        if (allowed.includes(status)) {
          navigate('/user_chat');
        } else {
          toast.error(
            'Project Status must be in these three status (employee_accepted, sent_to_vendor, completed)'
          );
        }
      }}
    >
      <FaComment className="h-5 w-5 mr-1" />
      Message Us
    </button>
  </div>
</div>


        {/* Package Plan Modal */}
        <PackagePlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={currentProject?.project_id || currentProject?.id}
        />
      </main>
    </div>
  );
};

export default ReportGenerate;
