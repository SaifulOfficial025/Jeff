import { useState } from "react";
import { Ellipsis } from "lucide-react";
import { FaRegTrashAlt, FaSearch } from "react-icons/fa";
import { MdBlock } from "react-icons/md";
import {
  useBlockUserMutation,
  useDeleteUserMutation,
  useGetDashboardUsersQuery,
} from "../../redux/features/baseApi";
import { toast, Toaster } from "sonner";

const UserInfo = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: userDashboardInfo, refetch } = useGetDashboardUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [blockUser] = useBlockUserMutation();

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id).unwrap();
      toast.success("User deleted successfully");
      refetch();
    } catch (error) {
      toast.error("Failed to delete user");
    }
  };

  const handleToggleBlock = async (id) => {
    try {
      const res = await blockUser(id).unwrap();
      toast.success(res?.message || "User block status updated");
      refetch();
    } catch (error) {
      toast.error("Failed to update user block status");
    }
  };

  const filteredUsers = userDashboardInfo?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <Toaster richColors position="top-right" />
      <div className="form-control w-full mb-5 flex justify-end">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name"
            className="input text-gray-500 rounded-full input-bordered w-full pl-10 px-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FaSearch
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="bg-[#161D27] border border-gray-500/60 rounded-lg p-5">
        <table className="table w-full">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-gray-400 font-medium bg-transparent">SL</th>
              <th className="text-gray-400 font-medium bg-transparent">Name</th>
              <th className="text-gray-400 font-medium bg-transparent">Email</th>
              <th className="text-gray-400 font-medium bg-transparent">Country</th>
              <th className="text-gray-400 font-medium bg-transparent">Time</th>
              <th className="text-gray-400 font-medium bg-transparent">Status</th>
              <th className="text-gray-400 font-medium bg-transparent">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.map((user, idx) => (
              <tr
                key={user?.id}
                className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer"
              >
                <td className="text-gray-300 bg-transparent">{idx + 1}</td>
                <td className="bg-transparent">
                  <div className="flex items-center gap-2">
                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp"
                          alt="User Avatar"
                        />
                      </div>
                    </div>
                    <span className="text-gray-300">{user.name}</span>
                  </div>
                </td>
                <td className="text-gray-300 bg-transparent">{user.email}</td>
                <td className="text-gray-300 bg-transparent">{user.country}</td>
                <td className="text-gray-300 bg-transparent">
                  {new Date(user.joined_at).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>
                <td className="bg-transparent">
                  {user.is_blocked ? (
                    <span className="text-red-500 font-semibold">Blocked</span>
                  ) : (
                    <span className="text-green-500 font-semibold">Active</span>
                  )}
                </td>
                <td className="text-gray-300 bg-transparent">
                  <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="m-1">
                      <Ellipsis size={24} />
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-gray-900 border border-gray-600 rounded-md z-1 w-36 p-2 shadow-sm"
                    >
                      <div className="flex flex-col">
                        <button
                          onClick={() => handleToggleBlock(user?.id)}
                          className="flex items-center gap-2 text-sm text-white hover:bg-gray-700 px-3 py-2 w-full text-left"
                        >
                          <MdBlock size={20} />
                          {user.is_blocked ? "Unblock" : "Block"}
                        </button>

                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="flex items-center gap-2 text-sm text-red-600 hover:bg-gray-700 px-3 py-2 w-full text-left"
                        >
                          <FaRegTrashAlt size={18} />
                          Delete
                        </button>
                      </div>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}

            {filteredUsers?.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-gray-400 py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserInfo;
