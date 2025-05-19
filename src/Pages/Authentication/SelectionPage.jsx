// import { Link } from "react-router-dom";


// const SelectionPage = () => {

// //   const navigate = useNavigate();

// //   const handleNavigation = (role) => {
// //     navigate(`/${role.toLowerCase()}`);
// //   };

//   return (
//     <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4">
//       <div className="flex justify-center lg:flex-row items-center w-full ">
//         <img
//           src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747579806/Group_2147226061_brbdcg.png"
//           alt="illustration"
//           className=" w-1/3 basis-5/12"
//         />

//         <div className="text-center lg:text-left space-y-6 basis-4/12">
//          <div className='space-y-5'>
//              <h1 className="text-[#0084FF] text-3xl lg:text-4xl font-bold text-center">DO5 Estimator</h1>
//           <p className="text-gray-300 text-center text-lg pb-8">Login as a</p>
//          </div>

//           <div className="flex flex-col gap-4 justify-center lg:justify-start w-2/4 mx-auto">
//            <Link to="/sign_up" className="w-full">
//              <button 
//             // onClick={() => handleNavigation('user')}
//             className="text-white text-lg cursor-pointer flex items-center font-medium justify-center gap-2 border border-[#1471FF] rounded-full hover:bg-[#1471FF] px-8 py-3.5 hover:opacity-90 transition">
//              <img src="https://cdn-icons-png.flaticon.com/128/4727/4727424.png" className='w-[35px]' alt="" /> User
//             </button>
//            </Link>

//             <button 
//             // onClick={() => handleNavigation('vendor')}
//             className="text-white flex cursor-pointer items-center justify-center font-medium gap-2 border border-[#1471FF] rounded-full bg-transparent px-8 py-3.5 hover:bg-[#1471FF] transition">
//              <img src="https://cdn-icons-png.flaticon.com/128/12371/12371363.png" className='w-[33px]' alt="" /> Vendor
//             </button>

//             <button 
//             // onClick={() => handleNavigation('employee')}
//             className="text-white border cursor-pointer flex items-center justify-center gap-2 border-[#1471FF] rounded-full bg-transparent px-8 py-3.5 hover:bg-[#1471FF] transition font-medium">
//              <img src="https://cdn-icons-png.flaticon.com/128/10856/10856857.png" alt="" className='w-[30px]' />
//               Employee
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SelectionPage;



import { Link } from "react-router-dom";

const SelectionPage = () => {
  return (
    <section className="bg-[#121212] min-h-screen flex items-center justify-center px-4">
      <div className="flex justify-center lg:flex-row items-center w-full">
        <img
          src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747579806/Group_2147226061_brbdcg.png"
          alt="illustration"
          className="w-1/3 basis-5/12"
        />

        <div className="text-center lg:text-left space-y-6 basis-4/12">
          <div className="space-y-5">
            <h1 className="text-[#0084FF] text-3xl lg:text-4xl font-bold text-center">
              DO5 Estimator
            </h1>
            <p className="text-gray-300 text-center text-lg pb-8">Login as a</p>
          </div>

          <div className="flex flex-col gap-4 justify-center lg:justify-start w-2/4 mx-auto">
            <Link 
            to={{
                 pathname: '/sign_up',
                search: '?role=user' }}
            className="w-full">
              <button
                className="w-full text-white text-lg cursor-pointer flex items-center font-medium justify-center gap-2 border border-[#1471FF] rounded-full hover:bg-[#1471FF] px-8 py-3.5 hover:opacity-90 transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/4727/4727424.png"
                  className="w-[35px]"
                  alt="user icon"
                />
                User
              </button>
            </Link>

            <Link 
            to={{
                 pathname: '/vendor_sign_up',
                search: '?role=vendor' }}
            className="w-full">
              <button
                className="w-full text-white cursor-pointer flex items-center justify-center font-medium gap-2 border border-[#1471FF] rounded-full bg-transparent px-8 py-3.5 hover:bg-[#1471FF] transition"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/12371/12371363.png"
                  className="w-[33px]"
                  alt="vendor icon"
                />
                Vendor
              </button>
            </Link>

            <Link 
            to={{
                 pathname: '/sign_up',
                search: '?role=employee' }}
            className="w-full">
              <button
                className="w-full text-white cursor-pointer flex items-center justify-center gap-2 border border-[#1471FF] rounded-full bg-transparent px-8 py-3.5 hover:bg-[#1471FF] transition font-medium"
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10856/10856857.png"
                  alt="employee icon"
                  className="w-[30px]"
                />
                Employee
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectionPage;