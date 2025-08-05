import { Link } from "react-router-dom";

const navItems = [
  { name: "Home", to: "home" },
  { name: "About Us", to: "about" },
  { name: "Workflow", to: "workflow" },
  { name: "Contact", to: "contact" },
];

const Navbar = () => {
  return (
    <>
      {/* Sticky Navbar - moved outside the background section */}
      <div className="backdrop-blur sticky top-0 z-50">
        <div className="navbar bg-white/80 w-full px-4 lg:px-32 mx-auto shadow-sm">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
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
                {navItems.map((item, index) => (
                  <li key={index}>
                  <a
                    href={item.to === 'home' ? '/' : `#${item.to}`}
                    onClick={e => {
                      if (item.to !== 'home') {
                        e.preventDefault();
                        const section = document.getElementById(item.to);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {item.name}
                  </a>
                  </li>
                ))}
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
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.to === 'home' ? '/' : `#${item.to}`}
                    className="text-[#363636] text-xl font-medium "
                    onClick={e => {
                      if (item.to !== 'home') {
                        e.preventDefault();
                        const section = document.getElementById(item.to);
                        if (section) {
                          section.scrollIntoView({ behavior: 'smooth' });
                        }
                      }
                    }}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="navbar-end space-x-2">
            <Link to="/login_role">
            <button className="border-[1px] rounded-full cursor-pointer border-[#1471FF] text-[#1471FF] px-10 py-2 hover:bg-[#1471FF] hover:text-white transition-colors duration-300">
              Login
            </button>
            </Link>
            <Link to='/select_role'>
            <button className="text-white border cursor-pointer border-[#1471FF] rounded-full bg-[#1471FF] px-10 py-2 hover:text-[#1471FF] hover:bg-white transition-colors duration-300">
              Register
            </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Background Layer + Centered Content */}
      <section className="shadow-sm relative">
        <div
          className="absolute min-h-screen inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              'url("https://res.cloudinary.com/dpi0t9wfn/image/upload/v1747562366/Group_2147226060_vrijq5.png")',
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
        <div className="relative z-10 flex items-center justify-center min-h-[80vh] text-center px-4 pt-10">
          <div className="w-9/12 mx-auto">
            <h1 className="text-4xl lg:text-6xl font-bold text-white drop-shadow-md mb-4 leading-[1.3]">
              Effortlessly <span className="text-[#1471FF]">Convert Construction</span> Documents <br /> into Professional Grade Estimates
            </h1>
            <p className="text-white text-lg lg:text-xl drop-shadow mt-8 w-4/6 mx-auto">
              Upload Design Drawing and Specification, and our AI generates Detailed Scopes of Work, Material Take Offs, Estimates and Schedule of Values.
            </p>

            <Link to="/select_role">
              <button className="text-white border mt-10 border-[#1471FF] rounded-full bg-[#1471FF] px-10 py-3 font-semibold cursor-pointer">Explore More</button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Navbar;
