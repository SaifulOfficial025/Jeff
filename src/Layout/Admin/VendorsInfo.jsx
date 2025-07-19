import { Ellipsis } from "lucide-react"
import { FaRegTrashAlt, FaSearch } from "react-icons/fa"
import { MdBlock } from "react-icons/md"
import { useGetDashboardVendorQuery } from "../../redux/features/baseApi"


const VendorsInfo = () => {



  const {data:vendorDashboardInfo} = useGetDashboardVendorQuery()
  return (
    <div>
<div className="form-control w-full mb-5 flex justify-end ">
  <div className="relative">
    <input
      type="text"
      placeholder="Search by name"
      className="input text-gray-500 rounded-full  input-bordered w-full pl-10 px-10"
    />
    <FaSearch
      size={18}
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
    />
  </div>
</div>
     
        <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
     
      

        <div className="">

          <table className="table w-full">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-gray-400 font-medium bg-transparent">SL</th>
                <th className="text-gray-400 font-medium bg-transparent">Name</th>
                <th className="text-gray-400 font-medium bg-transparent">Email</th>
                <th className="text-gray-400 font-medium bg-transparent">Role</th>
                <th className="text-gray-400 font-medium bg-transparent">Country</th>
                <th className="text-gray-400 font-medium bg-transparent">Time</th>
                <th className="text-gray-400 font-medium bg-transparent">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendorDashboardInfo?.map((user) => (
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
                   <td className="text-gray-300 bg-transparent">
                    {new Date(user.joined_at).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="text-gray-300 bg-transparent">
                        <div className="dropdown dropdown-end z-50">
                            <div tabIndex={0} role="button" className="m-1"><Ellipsis size={24} /></div>
                            <ul tabIndex={0} className="dropdown-content menu bg-gray-900 border border-gray-600 rounded-md z-1 w-36 p-2 shadow-sm">
                                <li className="hover:bg-gray-700"><a className="flex items-center text-xm"><MdBlock size={20}/> Block</a></li>
                                <li className="hover:bg-gray-700"><a className="flex items-center text-xm"><FaRegTrashAlt className="text-red-600"  size={18}/> Delete</a></li>
                            </ul>
                       </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default VendorsInfo
