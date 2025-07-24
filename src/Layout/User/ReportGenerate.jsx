// import { FaDownload } from "react-icons/fa";

// export default function ReportGenerate() {
//   return (
//     <div className="min-h-screen bg-[#111827] text-white">
//       {/* Header */}
//       <header className="flex  justify-between items-center p-4 border-b border-gray-800 px-32">
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
//                     src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-GR2hUm72vkhHMxYIcHsS1hdVb9A14k.png"
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
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   Setting
//                 </a>
//               </li>
//               <li>
//                 <a className="flex items-center gap-2 text-red-400">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="h-5 w-5"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                     stroke="currentColor"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
//                     />
//                   </svg>
//                   Log Out
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </header>

//       {/* Project Info */}
//       <div className="bg-[#1E293B] p-4 border-b border-gray-800">
//         <div className="max-w-6xl mx-auto">
//           <div className="mb-1">
//             <span className="text-gray-400">Project Name : </span>
//             <span className="text-blue-500">Holy Cross Hospital</span>
//           </div>
//           <div>
//             <span className="text-gray-400">Scope of work: </span>
//             <span className="text-gray-300">Lorem ipsum dolor sit amet consectetur.</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Content */}
//       <main className="max-w-6xl mx-auto py-8 px-4">
//         {/* Generate Report Card */}
//         <div className="bg-[#1E293B] rounded-lg p-6 mb-12 text-center max-w-md mx-auto">
//           <h2 className="text-xl font-semibold mb-4">Generate Complete Project Report</h2>
//           <button className="btn bg-blue-600 hover:bg-blue-700 border-none text-white px-8">Generate All</button>
//         </div>

//         {/* Recent Projects */}
//         <div className="mb-4  ">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-xl font-semibold">Recent projects</h2>
//             <button className="btn btn-sm btn-ghost text-gray-300">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="h-5 w-5 mr-1"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
//                 />
//               </svg>
//               Message Us
//             </button>
//           </div>

//           {/* Project Files Table */}
//           <div className="overflow-x-auto">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="font-medium">Holy Cross Hospital</h3>
//               <button className="btn btn-sm bg-blue-600 hover:bg-blue-700 border-none text-white">
//                 Sent to Employee
//               </button>
//             </div>
//             <table className="table w-full bg-transparent">
//               <tbody>
//                 {/* Original Files */}
//                 <tr className="border-b border-gray-800 hover:bg-gray-800/30">
//                   <td className="text-blue-500 font-medium">Original Files</td>
//                   <td className="text-blue-400">Structural.pdf</td>
//                   <td>
//                     <a href="#" className="text-blue-400 hover:underline">
//                       View
//                     </a>
//                   </td>
//                   <td className="text-right">
//                     <a href="#" className="text-blue-400 hover:underline flex items-center justify-end gap-2">
//                       Download
//                     <FaDownload/>
//                     </a>
//                   </td>
//                 </tr>

//                 {/* Highlighted PDF */}
//                 <tr className="border-b border-gray-800 hover:bg-gray-800/30">
//                   <td className="text-blue-500 font-medium">Highlighted.pdf</td>
//                   <td className="text-blue-400">Structural highlighted.pdf</td>
//                   <td>
//                     <span className="text-gray-500">None</span>
//                   </td>
//                   <td className="text-right">
//                     <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
//                       Download
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         />
//                       </svg>
//                     </a>
//                   </td>
//                 </tr>

//                 {/* Analysis Reports */}
//                 <tr className="border-b border-gray-800 hover:bg-gray-800/30">
//                   <td className="text-blue-500 font-medium">Analysis reports</td>
//                   <td className="text-blue-400">Steel analysis test</td>
//                   <td>
//                     <span className="text-gray-500">None</span>
//                   </td>
//                   <td className="text-right">
//                     <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
//                       Download
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         />
//                       </svg>
//                     </a>
//                   </td>
//                 </tr>

//                 {/* Detailed Estimate */}
//                 <tr className="border-b border-gray-800 hover:bg-gray-800/30">
//                   <td className="text-blue-500 font-medium">Detailed Estimate</td>
//                   <td>No detailed estimate</td>
//                   <td>
//                     <span className="text-gray-500">None</span>
//                   </td>
//                   <td className="text-right">
//                     <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
//                       Download
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         />
//                       </svg>
//                     </a>
//                   </td>
//                 </tr>

//                 {/* Engineering Estimate */}
//                 <tr className="border-b border-gray-800 hover:bg-gray-800/30">
//                   <td className="text-blue-500 font-medium">Engineering Estimate</td>
//                   <td>No engineering estimate</td>
//                   <td>
//                     <span className="text-gray-500">None</span>
//                   </td>
//                   <td className="text-right">
//                     <a href="#" className="text-blue-400 hover:underline flex items-center justify-end">
//                       Download
//                       <svg
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="h-5 w-5 ml-1"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
//                         />
//                       </svg>
//                     </a>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </main>
//     </div>
//   )
// }




import React, { useState, useEffect } from 'react';
import { FaDownload, FaComment } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import PackagePlanModal from './PackageModal';
import { loadFromLocalStorage } from '../../redux/features/projectSlice';
import { useGetLatestProjectQuery, useSendToEmployeeMutation } from '../../redux/features/baseApi';
import { useGetProjectDetailsQuery } from '../../redux/features/baseApi';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import UserNavbar from './UserNavbar';

const ReportGenerate = () => {
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

  // Dynamic table data
  const [tableData, setTableData] = useState([
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
  ]);

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
              <h3 className="font-medium">Holy Cross Hospital</h3>
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
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.id} className="border-b border-gray-800 hover:bg-gray-800/30">
                    <td className="text-blue-500 font-medium">{row.category}</td>
                    <td className="text-blue-400">{row.name}</td>
                    <td>
                      {row.viewLink ? (
                        <a href={row.viewLink} className="text-blue-400 hover:underline">
                          View
                        </a>
                      ) : (
                        <span className="text-gray-500">None</span>
                      )}
                    </td>
                    <td className="text-right">
                      <a
                        href={row.downloadLink}
                        className="text-blue-400 hover:underline flex items-center justify-end gap-2"
                      >
                        Download
                        <FaDownload className="h-5 w-5" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Package Plan Modal */}
        <PackagePlanModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          projectId={currentProject?.project_id}
        />
      </main>
    </div>
  );
};

export default ReportGenerate;
