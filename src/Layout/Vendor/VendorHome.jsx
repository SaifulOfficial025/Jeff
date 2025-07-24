


import { FaRegFilePdf } from 'react-icons/fa6';
import { HiOutlineUpload } from 'react-icons/hi';
import { RiMessage3Fill, RiShareForwardFill } from 'react-icons/ri';
import { useGetVendorStatsQuery, useGetVendorDashboardQuery, useUploadVendorFileMutation } from '../../redux/features/baseApi';
import { toast } from 'sonner';

const VendorHome = () => {
  const { data: stats, isLoading: statsLoading } = useGetVendorStatsQuery();
  const { data: dashboardData = [], isLoading: dashboardLoading, refetch } = useGetVendorDashboardQuery();
  const [uploadVendorFile, { isLoading: uploadLoading }] = useUploadVendorFileMutation();

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
      {/* stats start */}
      <div className="grid md:grid-cols-4 grid-cols-1 gap-10">
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734166/Group_2147225393_unffbi.png"
            alt="New Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">New Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{statsLoading ? '...' : stats?.new_request ?? 0}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734652/Group_2147225398_gymqme.png"
            alt="Total Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Total Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{statsLoading ? '...' : stats?.total_request ?? 0}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734698/Group_2147225401_a2ey6r.png"
            alt="Completed Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Completed Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{statsLoading ? '...' : stats?.request_complete ?? 0}</h1>
          </div>
        </div>
        <div className="bg-[#092A72] p-5 rounded-lg">
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747734734/Group_2147225403_rtyhkz.png"
            alt="Incomplete Requests icon"
          />
          <div className="mt-10">
            <h1 className="text-[24px] text-white mb-2">Incomplete Requests</h1>
            <h1 className="text-[#A1C2FD] text-[32px] font-semibold">{statsLoading ? '...' : stats?.incomplete_request ?? 0}</h1>
          </div>
        </div>
      </div>
      {/* stats end */}

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
      <th className="text-gray-400 font-medium bg-transparent">Vendor Files</th> {/* New column */}
      <th className="text-gray-400 font-medium bg-transparent">Upload Docs</th>
      <th className="text-gray-400 font-medium bg-transparent">Chat</th>
      <th className="text-gray-400 font-medium bg-transparent">Share</th>
    </tr>
  </thead>
  <tbody>
    {dashboardLoading ? (
      <tr><td colSpan={8} className="text-center text-gray-400">Loading...</td></tr>
    ) : dashboardData.length === 0 ? (
      <tr><td colSpan={8} className="text-center text-gray-400">No data found</td></tr>
    ) : dashboardData.map((row) => (
      <tr key={row.employee_id} className="border-b border-gray-800 hover:bg-gray-800/30 cursor-pointer">
        <td className="bg-transparent">
          <div className="flex items-center gap-2">
            <div className="avatar">
              <div className="w-12 rounded-full">
                <img src="https://img.daisyui.com/images/profile/demo/yellingcat@192.webp" alt="User avatar" />
              </div>
            </div>
            <span className="text-gray-300">{row.employee_name}</span>
          </div>
        </td>
        <td className="text-gray-300 bg-transparent">{row.employee_id}</td>
        <td className="text-gray-300 bg-transparent">
          {row.received_file && row.received_file.length > 0 ? (
            row.received_file.map((file) => (
              <a key={file.id} href={file.files} target="_blank" rel="noopener noreferrer">
                <FaRegFilePdf size={24} className="text-blue-600 inline-block mr-1" />
              </a>
            ))
          ) : (
            <span className="text-gray-400">No file</span>
          )}
        </td>
        <td className="text-gray-300 bg-transparent">{row.status || '-'}</td>
        <td className="text-gray-300 bg-transparent">
          {row.vendor_file && row.vendor_file.length > 0 ? (
            row.vendor_file.map((file) => (
              <a key={file.id} href={file.files} target="_blank" rel="noopener noreferrer">
                <FaRegFilePdf size={24} className="text-green-600 inline-block mr-1" />
              </a>
            ))
          ) : (
            <span className="text-gray-400">No file</span>
          )}
        </td>
        <td className="text-gray-300 bg-transparent">
          <button
            className="flex items-center gap-1 text-blue-600 disabled:opacity-50"
            disabled={uploadLoading}
            onClick={async () => {
              if (row.vendor_file && row.vendor_file.length > 0) {
                toast.error('Vendor file already exist!');
                return;
              }
              // Open file input dialog
              const input = document.createElement('input');
              input.type = 'file';
              input.multiple = true;
              input.accept = '.pdf,.doc,.docx,.xls,.xlsx,.png,.jpg,.jpeg';
              input.onchange = async (e) => {
                const files = Array.from(e.target.files);
                if (files.length === 0) return;
                try {
                  const res = await uploadVendorFile({ projectId: row.employee_id, files }).unwrap();
                  toast.success(res.message || 'Files uploaded successfully!');
                  refetch();
                } catch (err) {
                  toast.error('Upload failed!');
                }
              };
              input.click();
            }}
          >
            <HiOutlineUpload size={24} />
            {uploadLoading ? 'Uploading...' : 'Upload'}
          </button>
        </td>
        <td className="text-gray-300 bg-transparent">
          <RiMessage3Fill size={24} />
        </td>
        <td className="text-gray-300 bg-transparent">
          {/* Share logic remains unchanged */}
          <button
            className="cursor-pointer"
            onClick={() => document.getElementById(`modal_${row.employee_id}`).showModal()}
          >
            <RiShareForwardFill size={24} />
          </button>
          <dialog id={`modal_${row.employee_id}`} className="modal">
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
