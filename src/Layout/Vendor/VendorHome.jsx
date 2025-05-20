
// import { MessageCircle } from 'lucide-react'
// import { AiOutlineMessage } from 'react-icons/ai'
// import { FaFilePdf, FaShare } from 'react-icons/fa'
// import { FaRegFilePdf } from 'react-icons/fa6'
// import { GrDocumentPdf } from 'react-icons/gr'
// import { HiOutlineUpload } from 'react-icons/hi'
// import { IoIosShareAlt } from 'react-icons/io'
// import { RiMessage3Fill, RiShareForwardFill } from 'react-icons/ri'
// import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// const EmployeeHome = () => {



//   const recentUsers = [
//     {
//       id: "02",
//       name: "Mikel Jack",
//       email: "mikel@gmail.com",
//       role: "Supervisor",
//       country: "United States",
//       time: "12:00 AM",
//     },
//     {
//       id: "03",
//       name: "Mikel Jack",
//       email: "mikel@gmail.com",
//       role: "Supervisor",
//       country: "United States",
//       time: "12:00 AM",
//     },
//     {
//       id: "04",
//       name: "Mikel Jack",
//       email: "mikel@gmail.com",
//       role: "Supervisor",
//       country: "United States",
//       time: "12:00 AM",
//     },
//     {
//       id: "05",
//       name: "Mikel Jack",
//       email: "mikel@gmail.com",
//       role: "Supervisor",
//       country: "United States",
//       time: "12:00 AM",
//     },
//     {
//       id: "06",
//       name: "Mikel Jack",
//       email: "mikel@gmail.com",
//       role: "Supervisor",
//       country: "United States",
//       time: "12:00 AM",
//     },
//   ]

//   const vendors = Array(7).fill({
//   name: "Mikel Jack",
//   avatar: "https://randomuser.me/api/portraits/men/32.jpg", // Replace with actual image if needed
// });

//   return (
//     <section className="space-y-8">

//       <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
//         <div className="bg-[#092A72] p-5 rounded-lg">
//           <img
//             src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
//             alt="Users icon"
//           />
//           <div className="mt-10">
//             <h1 className="text-[24px] text-white mb-2">Total User</h1>
//             <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
//           </div>
//         </div>

//         <div className="bg-[#092A72] p-5 rounded-lg">
//           <img
//             src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734652/Group_2147225398_gymqme.png"
//             alt="Revenue icon"
//           />
//           <div className="mt-10">
//             <h1 className="text-[24px] text-white mb-2">Total User</h1>
//             <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
//           </div>
//         </div>

//         <div className="bg-[#092A72] p-5 rounded-lg">
//           <img
//             src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734698/Group_2147225401_a2ey6r.png"
//             alt="Products icon"
//           />
//           <div className="mt-10">
//             <h1 className="text-[24px] text-white mb-2">Total User</h1>
//             <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
//           </div>
//         </div>

//         <div className="bg-[#092A72] p-5 rounded-lg">
//           <img
//             src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734734/Group_2147225403_rtyhkz.png"
//             alt="Orders icon"
//           />
//           <div className="mt-10">
//             <h1 className="text-[24px] text-white mb-2">Total User</h1>
//             <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
//           </div>
//         </div>
//       </div>

  

//       {/* Recently Joined Table */}
//       <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
//         <h2 className="text-[#1471FF] text-[28px] font-semibold mb-6">All Request</h2>
//         <div className="overflow-x-auto">
//           <table className="table w-full">
//             <thead>
//               <tr className="border-b border-gray-800">
//                 <th className="text-gray-400 font-medium bg-transparent">Name</th>
//                 <th className="text-gray-400 font-medium bg-transparent">User ID</th>
//                 <th className="text-gray-400 font-medium bg-transparent">File</th>
//                 <th className="text-gray-400 font-medium bg-transparent">Status</th>
//                 <th className="text-gray-400 font-medium bg-transparent">Upload Docs</th>
//                 <th className="text-gray-400 font-medium bg-transparent">Chat</th>
//                 <th className="text-gray-400 font-medium bg-transparent">Share</th>
//               </tr>
//             </thead>
//             <tbody>
//               {recentUsers.map((user) => (
//                 <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer">
//                      <td className="bg-transparent">
//                     <div className="flex items-center gap-2">
//                       <div className="avatar">
//   <div className="w-12 rounded-full">
//     <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
//   </div>
// </div>
//                       <span className="text-gray-300">{user.name}</span>
//                     </div>
//                   </td>
//                   <td className="text-gray-300 bg-transparent">{user.id}</td>
                 
//                   <td className="text-gray-300 bg-transparent"><FaRegFilePdf  size={24} className='text-blue-600' /></td>
//                   <td className="text-gray-300 bg-transparent">{user.role}</td>
//                   <td className="text-gray-300 bg-transparent"><HiOutlineUpload className='text-blue-600'  size={24}/></td>
//                   <td className="text-gray-300 bg-transparent"><RiMessage3Fill size={24} /></td>
//                   <td className="text-gray-300 bg-transparent">
//                         <button className='cursor-pointer' onClick={()=>document.getElementById('my_modal_3').showModal()}><RiShareForwardFill size={24}/></button>
//                   <dialog id="my_modal_3" className="modal ">
//                     <div className="modal-box bg-gray-900 border border-gray-500">
//                         <form method="dialog">
//                         <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
//                         </form>
//                         <h3 className="font-bold text-lg">Hello!</h3>
//                         <div className="min-h-screen bg-[#0A1540] text-white flex justify-center items-center p-4">
//       <div className="w-[600px]">
//         <h2 className="text-2xl font-semibold text-center mb-6">Share To Vendor</h2>
//         <input
//           type="text"
//           placeholder="Search vendor......"
//           className="input input-bordered w-full rounded-full mb-6 bg-[#0F1E50] text-white placeholder-gray-400"
//         />
//         <div className="space-y-4">
//           {vendors.map((vendor, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between bg-transparent"
//             >
//               <div className="flex items-center space-x-4">
//                 <img
//                   src={vendor.avatar}
//                   alt={vendor.name}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <span className="font-medium">{vendor.name}</span>
//               </div>
//               <button className="btn btn-primary rounded-full px-4 min-h-8 h-8">
//                 Send
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//                     </div>
//                 </dialog>

//                   </td>

//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default EmployeeHome

import { FaRegFilePdf } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiMessage3Fill, RiShareForwardFill } from 'react-icons/ri';

const VendorHome = () => {
  const recentUsers = [
    {
      id: '02',
      name: 'Mikel Jack',
      email: 'mikel@gmail.com',
      role: 'Supervisor',
      country: 'United States',
      time: '12:00 AM',
    },
    {
      id: '03',
      name: 'Jane Doe',
      email: 'jane@gmail.com',
      role: 'Manager',
      country: 'Canada',
      time: '1:00 AM',
    },
    {
      id: '04',
      name: 'John Smith',
      email: 'john@gmail.com',
      role: 'Developer',
      country: 'United Kingdom',
      time: '2:00 AM',
    },
    {
      id: '05',
      name: 'Emily Brown',
      email: 'emily@gmail.com',
      role: 'Analyst',
      country: 'Australia',
      time: '3:00 AM',
    },
    {
      id: '06',
      name: 'David Wilson',
      email: 'david@gmail.com',
      role: 'Designer',
      country: 'Germany',
      time: '4:00 AM',
    },
  ];

  const vendors = [
    {
      name: 'Vendor One',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      name: 'Vendor Two',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      name: 'Vendor Three',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
    },
    {
      name: 'Vendor Four',
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg',
    },
    {
      name: 'Vendor Five',
      avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    },
  ];

  return (
    <section className="space-y-8">
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
            alt="Users icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Users</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734652/Group_2147225398_gymqme.png"
            alt="Revenue icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Revenue</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">$1,234,567</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734698/Group_2147225401_a2ey6r.png"
            alt="Products icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Products</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">1,789</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734734/Group_2147225403_rtyhkz.png"
            alt="Orders icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Orders</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">23,456</h1>
          </div>
        </div>
      </div>

      {/* Recently Joined Table */}
      <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
        <h2 className="text-[#1471FF] text-[28px] font-semibold mb-6">All Requests</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-gray-400 font-medium bg-transparent">Name</th>
                <th className="text-gray-400 font-medium bg-transparent">User ID</th>
                <th className="text-gray-400 font-medium bg-transparent">File</th>
                <th className="text-gray-400 font-medium bg-transparent">Status</th>
                <th className="text-gray-400 font-medium bg-transparent">Upload Docs</th>
                <th className="text-gray-400 font-medium bg-transparent">Chat</th>
                <th className="text-gray-400 font-medium bg-transparent">Share</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer"
                >
                  <td className="bg-transparent">
                    <div className="flex items-center gap-2">
                      <div className="avatar">
                        <div className="w-12 rounded-full">
                          <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="User avatar" />
                        </div>
                      </div>
                      <span className="text-gray-300">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-300 bg-transparent">{user.id}</td>
                  <td className="text-gray-300 bg-transparent">
                    <FaRegFilePdf size={24} className="text-blue-600" />
                  </td>
                  <td className="text-gray-300 bg-transparent">{user.role}</td>
                  <td className="text-gray-300 bg-transparent">
                    <HiOutlineUpload className="text-blue-600" size={24} />
                  </td>
                  <td className="text-gray-300 bg-transparent">
                    <RiMessage3Fill size={24} />
                  </td>
                  <td className="text-gray-300 bg-transparent">
                    <button
                      className="cursor-pointer"
                      onClick={() => document.getElementById(`modal_${user.id}`).showModal()}
                    >
                      <RiShareForwardFill size={24} />
                    </button>
                    <dialog id={`modal_${user.id}`} className="modal">
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
                          {vendors.map((vendor, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 hover:bg-gray-800/50 rounded"
                            >
                              <div className="flex items-center space-x-3">
                                <img
                                  src={vendor.avatar}
                                  alt={vendor.name}
                                  className="w-8 h-8 rounded-full"
                                />
                                <span className="font-medium text-gray-200">{vendor.name}</span>
                              </div>
                              <button className="btn btn-primary btn-sm rounded-full px-4">
                                Send
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </dialog>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default VendorHome;
