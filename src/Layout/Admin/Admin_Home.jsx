

// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
// } from "recharts";
// import {
//   useGetRecentUsersQuery,
//   useGetStatisticDataQuery,
//   useGetUserGrowthQuery,
// } from "../../redux/features/baseApi";

// const AdminHome = () => {
//   const { data: adminStat } = useGetStatisticDataQuery();
//   const { data: userGrowthRaw } = useGetUserGrowthQuery();
//   const { data: recentUsers } = useGetRecentUsersQuery();
//   console.log(recentUsers)

//   // ✅ Transform user growth data
//   const userGrowthData =
//     userGrowthRaw?.map((item) => {
//       const dateObj = new Date(item.date);
//       const formattedDate = dateObj.toLocaleDateString("en-US", {
//         day: "2-digit",
//         month: "short",
//       }); // "18 Jul"
//       return {
//         date: formattedDate,
//         value: item.new_users,
//       };
//     }) || [];

//   const fileUploadData = [
//     { month: "Jan", value: 25 },
//     { month: "Feb", value: 35 },
//     { month: "Mar", value: 15 },
//     { month: "Apr", value: 30 },
//     { month: "May", value: 22 },
//     { month: "Jun", value: 28 },
//     { month: "Jul", value: 32 },
//     { month: "Aug", value: 18 },
//     { month: "Sep", value: 25 },
//     { month: "Oct", value: 35 },
//     { month: "Nov", value: 22 },
//     { month: "Dec", value: 38 },
//   ];

//   return (
//     <section className="space-y-8">
//       {/* Stat Cards */}
//       <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
//         <StatCard title="Total Users" value={adminStat?.total_users} />
//         <StatCard title="PDFs Generated" value={adminStat?.total_pdfs_generated} />
//         <StatCard title="Total Employees" value={adminStat?.total_employees} />
//         <StatCard title="Active Vendors" value={adminStat?.total_active_vendors} />
//       </div>

//       {/* Charts */}
//       <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
//         {/* ✅ User Growth Line Chart */}
//         <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-white text-xl font-medium">User Growth</h2>
//             <div className="badge badge-primary">Daily</div>
//           </div>
//           <div className="h-[200px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart
//                 data={userGrowthData}
//                 margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//               >
//                 <defs>
//                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
//                     <stop offset="5%" stopColor="#0080FF" stopOpacity={0.8} />
//                     <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
//                   </linearGradient>
//                 </defs>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2A3042" />
//                 <XAxis
//                   dataKey="date"
//                   stroke="#8A94A6"
//                   tick={{ fill: "#8A94A6", fontSize: 10 }}
//                 />
//                 <YAxis
//                   stroke="#8A94A6"
//                   tick={{ fill: "#8A94A6", fontSize: 10 }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1E2130",
//                     borderColor: "#2A3042",
//                     color: "#fff",
//                   }}
//                 />
//                 <Line
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#0080FF"
//                   strokeWidth={3}
//                   dot={false}
//                   activeDot={{ r: 6 }}
//                   fillOpacity={1}
//                   fill="url(#colorValue)"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* File Upload Bar Chart */}
//         <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
//           <div className="flex justify-between items-center mb-6">
//             <h2 className="text-white text-xl font-medium">File Uploaded</h2>
//             <div className="badge badge-primary">Monthly</div>
//           </div>
//           <div className="h-[200px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart
//                 data={fileUploadData}
//                 margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" stroke="#2A3042" />
//                 <XAxis
//                   dataKey="month"
//                   stroke="#8A94A6"
//                   tick={{ fill: "#8A94A6", fontSize: 10 }}
//                 />
//                 <YAxis
//                   stroke="#8A94A6"
//                   tick={{ fill: "#8A94A6", fontSize: 10 }}
//                 />
//                 <Tooltip
//                   contentStyle={{
//                     backgroundColor: "#1E2130",
//                     borderColor: "#2A3042",
//                     color: "#fff",
//                   }}
//                 />
//                 <Bar
//                   dataKey="value"
//                   fill="#0080FF"
//                   radius={[4, 4, 0, 0]}
//                   barSize={12}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>
//       </div>
   
//         <div className="space-y-80">
              
//         </div>

//     </section>
//   );
// };

// export default AdminHome;


// const StatCard = ({ title, value }) => (
//   <div className="bg-[#092A72] p-5 rounded-lg">
//     <img
//       src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
//       alt="icon"
//     />
//     <div className="mt-10">
//       <h1 className="text-[24px] text-white mb-2">{title}</h1>
//       <h1 className="text-[#A1C2FD] text-[32px] font-semibold">
//         {value ?? 0}
//       </h1>
//     </div>
//   </div>
// );





import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import {
  useGetRecentUsersQuery,
  useGetStatisticDataQuery,
  useGetUserGrowthQuery,
} from "../../redux/features/baseApi";

const AdminHome = () => {
  const { data: adminStat } = useGetStatisticDataQuery();
  const { data: userGrowthRaw } = useGetUserGrowthQuery();
  const { data: recentUsers } = useGetRecentUsersQuery();
  console.log(recentUsers)

  // ✅ Transform user growth data
  const userGrowthData =
    userGrowthRaw?.map((item) => {
      const dateObj = new Date(item.date);
      const formattedDate = dateObj.toLocaleDateString("en-US", {
        day: "2-digit",
        month: "short",
      }); // "18 Jul"
      return {
        date: formattedDate,
        value: item.new_users,
      };
    }) || [];

  const fileUploadData = [
    { month: "Jan", value: 25 },
    { month: "Feb", value: 35 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 30 },
    { month: "May", value: 22 },
    { month: "Jun", value: 28 },
    { month: "Jul", value: 32 },
    { month: "Aug", value: 18 },
    { month: "Sep", value: 25 },
    { month: "Oct", value: 35 },
    { month: "Nov", value: 22 },
    { month: "Dec", value: 38 },
  ];

  return (
    <section className="space-y-8">
      {/* Stat Cards */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        <StatCard title="Total Users" value={adminStat?.total_users} />
        <StatCard title="PDFs Generated" value={adminStat?.total_pdfs_generated} />
        <StatCard title="Total Employees" value={adminStat?.total_employees} />
        <StatCard title="Active Vendors" value={adminStat?.total_active_vendors} />
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* ✅ User Growth Line Chart */}
        <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-medium">User Growth</h2>
            <div className="badge badge-primary">Daily</div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={userGrowthData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0080FF" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#0080FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3042" />
                <XAxis
                  dataKey="date"
                  stroke="#8A94A6"
                  tick={{ fill: "#8A94A6", fontSize: 10 }}
                />
                <YAxis
                  stroke="#8A94A6"
                  tick={{ fill: "#8A94A6", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E2130",
                    borderColor: "#2A3042",
                    color: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#0080FF"
                  strokeWidth={3}
                  dot={false}
                  activeDot={{ r: 6 }}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* File Upload Bar Chart */}
        <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-white text-xl font-medium">File Uploaded</h2>
            <div className="badge badge-primary">Monthly</div>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={fileUploadData}
                margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2A3042" />
                <XAxis
                  dataKey="month"
                  stroke="#8A94A6"
                  tick={{ fill: "#8A94A6", fontSize: 10 }}
                />
                <YAxis
                  stroke="#8A94A6"
                  tick={{ fill: "#8A94A6", fontSize: 10 }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1E2130",
                    borderColor: "#2A3042",
                    color: "#fff",
                  }}
                />
                <Bar
                  dataKey="value"
                  fill="#0080FF"
                  radius={[4, 4, 0, 0]}
                  barSize={12}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Users Table */}
      <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
        <h2 className="text-white text-xl font-medium mb-4">Recent Users</h2>
        <table className="w-full table-auto text-white">
          <thead>
            <tr className="border-b border-gray-500 cursor-pointer">
              <th className="py-5 px-4 text-left text-gray-400">Name</th>
              <th className="py-5 px-4 text-left text-gray-400">Email</th>
              <th className="py-5 px-4 text-left text-gray-400">Role</th>
              <th className="py-5 px-4 text-left text-gray-400">Country</th>
              <th className="py-5 px-4 text-left text-gray-400">Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {recentUsers?.map((user, index) => (
              <tr key={index} className="border-b border-gray-500/20 cursor-pointer hover:bg-gray-800/30">
                <td className="py-5 px-5 text-gray-400 font-medium ">{user.name}</td>
                <td className="py-3 px-4 text-gray-400 font-medium ">{user.email}</td>
                <td className="py-3 px-4 text-gray-400 font-medium ">{user.role}</td>
                <td className="py-3 px-4 text-gray-400 font-medium ">{user.country}</td>
                <td className="py-3 px-4 text-gray-400 font-medium">
                    {new Date(user.joined_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "2-digit",
                    })}
                  </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminHome;

const StatCard = ({ title, value }) => (
  <div className="bg-[#092A72] p-5 rounded-lg">
    <img
      src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
      alt="icon"
    />
    <div className="mt-10">
      <h1 className="text-[24px] text-white mb-2">{title}</h1>
      <h1 className="text-[#A1C2FD] text-[32px] font-semibold">
        {value ?? 0}
      </h1>
    </div>
  </div>
);
