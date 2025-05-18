const Navbar = () => {
  return (
    <section className=" shadow-sm relative">
      <div
        className="absolute min-h-screen inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url("https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747562366/Group_2147226060_vrijq5.png")',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)', 
        }}
      />
      <div className="pt-10 ">
        <div className="navbar bg-white/80 px-32 mx-auto relative z-10 shadow-sm">
        <div className="navbar-start  mx-auto">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black"
            >
              <li><a>Item 1</a></li>
              <li>
                <a>Parent</a>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </li>
              <li><a>Item 3</a></li>
            </ul>
          </div>
          <img
            src="https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747563167/dummmy-removebg-preview_emccdr.png"
            alt="logo"
            className="w-[100px]"
          />
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li><a className="text-black">Item 1</a></li>
            <li>
              <details>
                <summary className="text-black">ddsfds</summary>
                <ul className="p-2 bg-base-100 text-black">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li><a className="text-black">Item 3</a></li>
          </ul>
        </div>
        <div className="navbar-end space-x-2">
          <button className="border-[1px] rounded-full cursor-pointer border-[#1471FF] px-10 py-2">Login</button>
<button className="text-white border[1px] cursor-pointer border-[#1471FF] rounded-full bg-[#1471FF] px-10 py-2">Register</button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default Navbar;