
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const AdminHome = () => {

  const userGrowthData = [
    { date: "18 Oct", value: 15 },
    { date: "19 Oct", value: 20 },
    { date: "20 Oct", value: 25 },
    { date: "21 Oct", value: 18 },
    { date: "22 Oct", value: 22 },
    { date: "23 Oct", value: 30 },
    { date: "24 Oct", value: 45 },
    { date: "25 Oct", value: 50 },
  ]


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
  ]


  const recentUsers = [
    {
      id: "02",
      name: "Mikel Jack",
      email: "mikel@gmail.com",
      role: "Supervisor",
      country: "United States",
      time: "12:00 AM",
    },
    {
      id: "03",
      name: "Mikel Jack",
      email: "mikel@gmail.com",
      role: "Supervisor",
      country: "United States",
      time: "12:00 AM",
    },
    {
      id: "04",
      name: "Mikel Jack",
      email: "mikel@gmail.com",
      role: "Supervisor",
      country: "United States",
      time: "12:00 AM",
    },
    {
      id: "05",
      name: "Mikel Jack",
      email: "mikel@gmail.com",
      role: "Supervisor",
      country: "United States",
      time: "12:00 AM",
    },
    {
      id: "06",
      name: "Mikel Jack",
      email: "mikel@gmail.com",
      role: "Supervisor",
      country: "United States",
      time: "12:00 AM",
    },
  ]

  return (
    <section className="space-y-8">

      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
            alt="Users icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total User</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
          </div>
        </div>

        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734652/Group_2147225398_gymqme.png"
            alt="Revenue icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total User</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
          </div>
        </div>

        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734698/Group_2147225401_a2ey6r.png"
            alt="Products icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total User</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
          </div>
        </div>

        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734734/Group_2147225403_rtyhkz.png"
            alt="Orders icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total User</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">55,789</h1>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
        {/* User Growth Chart */}
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
                  tick={{ fill: '#8A94A6', fontSize: 10 }} 
                />
                <YAxis 
                  stroke="#8A94A6" 
                  tick={{ fill: '#8A94A6', fontSize: 10 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2130', 
                    borderColor: '#2A3042',
                    color: '#fff' 
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

        {/* File Uploaded Chart */}
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
                  tick={{ fill: '#8A94A6', fontSize: 10 }} 
                />
                <YAxis 
                  stroke="#8A94A6" 
                  tick={{ fill: '#8A94A6', fontSize: 10 }} 
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1E2130', 
                    borderColor: '#2A3042',
                    color: '#fff' 
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

      {/* Recently Joined Table */}
      <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
        <h2 className="text-white text-xl font-medium mb-6">Recently Joined</h2>
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-gray-400 font-medium bg-transparent">SL</th>
                <th className="text-gray-400 font-medium bg-transparent">Name</th>
                <th className="text-gray-400 font-medium bg-transparent">Email</th>
                <th className="text-gray-400 font-medium bg-transparent">Role</th>
                <th className="text-gray-400 font-medium bg-transparent">Country</th>
                <th className="text-gray-400 font-medium bg-transparent">Time</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer">
                  <td className="text-gray-300 bg-transparent">{user.id}</td>
                  <td className="bg-transparent">
                    <div className="flex items-center gap-2">
                      <div className="avatar">
  <div className="w-12 rounded-full">
    <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" />
  </div>
</div>
                      <span className="text-gray-300">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-gray-300 bg-transparent">{user.email}</td>
                  <td className="text-gray-300 bg-transparent">{user.role}</td>
                  <td className="text-gray-300 bg-transparent">{user.country}</td>
                  <td className="text-gray-300 bg-transparent">{user.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

export default AdminHome

