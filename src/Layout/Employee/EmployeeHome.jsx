
import { FaRegFilePdf } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiMessage3Fill, RiShareForwardFill } from 'react-icons/ri';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchEmployeeStats, 
  fetchEmployeeDashboard, 
  uploadEmployeeFile, 
  fetchVendorList, 
  sendToVendor, 
  assignToSelf 
} from '../../redux/features/employeeSlice';
import { FileText, Upload, MessageSquare, Share2 } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const EmployeeHome = () => {
  const dispatch = useDispatch();
  const { stats, loading, dashboardData, vendors, uploading, vendorLoading } = useSelector((state) => state.employee);
  const [selectedFiles, setSelectedFiles] = useState({});
  const [showAcceptModal, setShowAcceptModal] = useState(null);
  const fileInputRefs = useRef({});

  useEffect(() => {
    dispatch(fetchEmployeeStats());
    dispatch(fetchEmployeeDashboard());
  }, [dispatch]);

  const handleFileSelect = (projectId, files) => {
    setSelectedFiles(prev => ({
      ...prev,
      [projectId]: Array.from(files)
    }));
  };

  const handleFileUpload = async (projectId) => {
    const files = selectedFiles[projectId];
    if (!files || files.length === 0) {
      toast.error('Please select files to upload');
      return;
    }

    try {
      const result = await dispatch(uploadEmployeeFile({ id: projectId, files }));
      if (result.type === 'employee/uploadFile/fulfilled') {
        toast.success(result.payload.message);
        setSelectedFiles(prev => ({
          ...prev,
          [projectId]: []
        }));
        // Clear the file input
        if (fileInputRefs.current[projectId]) {
          fileInputRefs.current[projectId].value = '';
        }
        // Refresh dashboard data
        dispatch(fetchEmployeeDashboard());
      }
    } catch {
      toast.error('Failed to upload files');
    }
  };

  const handleShareToVendor = async (projectId) => {
    await dispatch(fetchVendorList(projectId));
    document.getElementById(`modal_${projectId}`).showModal();
  };

  const handleSendToVendor = async (projectId, vendorId) => {
    try {
      const result = await dispatch(sendToVendor({ projectId, vendorId }));
      if (result.type === 'employee/sendToVendor/fulfilled') {
        toast.success(`Project sent to vendor successfully. Status: ${result.payload.status}`);
        document.getElementById(`modal_${projectId}`).close();
        dispatch(fetchEmployeeDashboard());
      }
    } catch {
      toast.error('Failed to send to vendor');
    }
  };

  const handleAcceptProject = async (projectId) => {
    try {
      const result = await dispatch(assignToSelf(projectId));
      if (result.type === 'employee/assignToSelf/fulfilled') {
        toast.success(`Project accepted successfully. Status: ${result.payload.status}`);
        setShowAcceptModal(null);
        dispatch(fetchEmployeeDashboard());
      }
    } catch {
      toast.error('Failed to accept project');
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'accept':
        return 'text-green-400';
      case 'taken':
      case 'employee_accepted':
        return 'text-blue-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusText = (status) => {
    switch (status?.toLowerCase()) {
      case 'accept':
        return 'Accept';
      case 'taken':
      case 'employee_accepted':
        return 'Taken';
      default:
        return status;
    }
  };





  return (
    <div className="space-y-8">
      <section className="space-y-8">
      {/* Stats Start */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
            alt="New Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">New Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{loading ? '...' : stats.new_request}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734652/Group_2147225398_gymqme.png"
            alt="Total Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{loading ? '...' : stats.total_request}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734698/Group_2147225401_a2ey6r.png"
            alt="Completed icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Completed</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{loading ? '...' : stats.request_complete}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734734/Group_2147225403_rtyhkz.png"
            alt="Incomplete icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Incomplete</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{loading ? '...' : stats.incomplete_request}</h1>
          </div>
        </div>
      </div>
      {/* Stats End */}



      {/* Recently Joined Table */}
      <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
        <h2 className="text-[#1471FF] text-[28px] font-semibold mb-6">All Requests</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
          <thead>
            <tr className="bg-gray-700 text-gray-300 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left border-b border-gray-700 rounded-tl-lg">Name</th>
              <th className="py-3 px-6 text-left border-b border-gray-700">User ID</th>
              <th className="py-3 px-6 text-left border-b border-gray-700">File</th>
              <th className="py-3 px-6 text-left border-b border-gray-700">Status</th>
              <th className="py-3 px-6 text-left border-b border-gray-700">Received Docs</th>
              <th className="py-3 px-6 text-left border-b border-gray-700">Chat</th> {/* Moved Chat header */}
              <th className="py-3 px-6 text-left border-b border-gray-700">Upload Docs</th> {/* Moved Upload Docs header */}
              <th className="py-3 px-6 text-left border-b border-gray-700 rounded-tr-lg">Share to Vendor</th>
            </tr>
          </thead>
          <tbody className="text-gray-200 text-sm font-light">
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-4">Loading...</td>
              </tr>
            ) : dashboardData && dashboardData.length > 0 ? (
              dashboardData.map((project) => (
              <tr
                key={project.file.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg">
                        {project.user_name?.charAt(0) || 'U'}
                      </div>
                    </div>
                    <span className="text-gray-300">{project.user_name}</span>
                  </div>
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">{project.user_id}</td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  {project.file?.files ? (
                    <a 
                      href={project.file.files} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-400"
                    >
                      <FileText size={24} className="text-blue-600" />
                    </a>
                  ) : (
                    <FileText size={24} className="text-gray-600" />
                  )}
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  {project.status === 'accept' ? (
                    <button
                      className={`${getStatusColor(project.status)} font-medium hover:underline`}
                      onClick={() => setShowAcceptModal(project.project_id)}
                    >
                      {getStatusText(project.status)}
                    </button>
                  ) : (
                    <span className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </span>
                  )}
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  {project.received_docs ? (
                    <a 
                      href={project.received_docs} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-400"
                    >
                      <FileText size={24} className="text-green-500" />
                    </a>
                  ) : (
                    <span className="text-gray-500">-</span>
                  )}
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  <MessageSquare size={24} className="text-gray-400 hover:text-blue-400 cursor-pointer" />
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  <div className="flex items-center gap-2">
                    <input
                      type="file"
                      multiple
                      ref={el => fileInputRefs.current[project.project_id] = el}
                      onChange={(e) => handleFileSelect(project.project_id, e.target.files)}
                      className="hidden"
                      id={`file-input-${project.project_id}`}
                    />
                    <label 
                      htmlFor={`file-input-${project.project_id}`}
                      className="cursor-pointer"
                    >
                      <Upload className="text-blue-600 hover:text-blue-400" size={24} />
                    </label>
                    {selectedFiles[project.project_id]?.length > 0 && (
                      <button
                        onClick={() => handleFileUpload(project.project_id)}
                        disabled={uploading}
                        className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 disabled:opacity-50"
                      >
                        {uploading ? 'Uploading...' : 'Upload'}
                      </button>
                    )}
                  </div>
                </td>
                <td className="py-3 px-6 text-left border-b border-gray-700">
                  <button
                    className="cursor-pointer"
                    onClick={() => handleShareToVendor(project.project_id)}
                  >
                    <Share2 size={24} className="text-gray-400 hover:text-blue-400" />
                  </button>
                  <dialog id={`modal_${project.project_id}`} className="modal">
                    <div className="modal-box bg-gray-900 border border-gray-500 max-w-lg p-6">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                          ✕
                        </button>
                      </form>
                      <h3 className="font-bold text-lg mb-4">Share To Vendor</h3>
                      <input
                        type="text"
                        placeholder="Search vendor..."
                        className="input input-bordered w-full rounded-full mb-4 bg-[#0F1E50] text-white placeholder-gray-400"
                      />
                      <div className="space-y-3 max-h-[650px] max-w-[500px] overflow-y-auto">
                        {vendorLoading ? (
                          <div className="text-center py-4">Loading vendors...</div>
                        ) : vendors.length > 0 ? (
                          vendors.map((vendor) => (
                            <div
                              key={vendor.id}
                              className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm">
                                  {vendor.name?.charAt(0) || 'V'}
                                </div>
                                <span className="font-medium text-gray-200">{vendor.name}</span>
                              </div>
                              <button 
                                className="btn btn-primary btn-sm rounded-full px-4"
                                onClick={() => handleSendToVendor(project.project_id, vendor.id)}
                              >
                                Send
                              </button>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-4 text-gray-400">No vendors available</div>
                        )}
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>

      {/* Accept Project Confirmation Modal */}
      {showAcceptModal && (
        <dialog open className="modal">
          <div className="modal-box bg-gray-900 border border-gray-500">
            <h3 className="font-bold text-lg mb-4">Accept Project</h3>
            <p className="mb-6">Are you sure you want to accept this project?</p>
            <div className="modal-action">
              <button 
                className="btn btn-primary"
                onClick={() => handleAcceptProject(showAcceptModal)}
              >
                Yes
              </button>
              <button 
                className="btn btn-outline"
                onClick={() => setShowAcceptModal(null)}
              >
                No
              </button>
            </div>
          </div>
        </dialog>
      )}

      <Toaster position="top-right" />
      </section>
    </div>
  );
};

export default EmployeeHome;