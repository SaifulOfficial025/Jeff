// import { useState, useEffect } from "react";
// import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
// import { LuLayoutDashboard } from "react-icons/lu";
// import { FaUserGroup } from "react-icons/fa6";
// import { BadgePercent, Bell, CalendarDays, ChevronDown, ChevronsLeft, ChevronsRight, MessagesSquare } from "lucide-react";
// import { RiUserSettingsLine } from "react-icons/ri";
// import { BsFillBarChartFill } from "react-icons/bs";

// export default function DashboardLayout() {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [selectedItem, setSelectedItem] = useState("Dashboard");
//   const location = useLocation(); 
//   const navigate = useNavigate(); 
//   const menuItems = [
//     {
//       items: [
//         { name: "Dashboard", icon: <LuLayoutDashboard size={20} />, path: "/home" },
//         { name: "Users & Therapists", icon: <FaUserGroup size={20} />, path: "/client_info" },
//         { name: "Bookings & Payments", icon: <CalendarDays size={20} />, path: "/booking_info" },
//         { name: "Roles & Permissions", icon: <RiUserSettingsLine size={20} />, path: "/roles" },
//         { name: "Analytics", icon: <BsFillBarChartFill size={20} />, path: "/analytics" },
//         { name: "Promotions", icon: <BadgePercent size={20} />, path: "/promotions" },
//         { name: "Dispute Management", icon: <MessagesSquare size={20} />, path: "/dispute_management"},
//       ],
//     },
//   ];

//   // Sync selectedItem with current route on initial load
//   useEffect(() => {
//     const currentItem = menuItems[0].items.find(
//       (item) => item.path === location.pathname
//     );
//     if (currentItem) {
//       setSelectedItem(currentItem.name);
//     }
//   }, [location.pathname]);

//   const handleItemClick = (itemName, path) => {
//     setSelectedItem(itemName); // Update the selected item on click
//     navigate(path); // Navigate to the clicked item's path
//   };

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className={`${
//           isCollapsed ? "w-20" : "w-64"
//         } bg-white border-r border-gray-200 transition-all duration-500 ease-in-out`}
//       >
//         {/* Logo */}
//         <div className="h-16 flex items-center px-4">
//           <div className="flex items-center ms-1 gap-2 mt-20">
//             <div
//               className={`transform transition-all duration-500 ${
//                 isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
//               }`}
//             >
//               <img src="https://i.ibb.co.com/6JmxrwwH/Group-1686551099-1.png" alt="Logo" />
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <nav className="p-4 md:mt-20">
//           {menuItems.map((section, idx) => (
//             <div key={idx} className="mb-8">
//               <ul className="space-y-2">
//                 {section.items.map((item, itemIdx) => (
//                   <li key={itemIdx}>
//                     <Link
//                       to={item.path}
//                       onClick={() => handleItemClick(item.name, item.path)}
//                       className={`flex items-center gap-3 px-3 py-2 text-gray-700 rounded-lg hover:bg-gray-100 group relative ${
//                         selectedItem === item.name ? "bg-gray-200 text-gray-900 font-semibold" : ""
//                       }`}
//                     >
//                       <span
//                         className={`group-hover:text-gray-700 transition-colors duration-300 ${
//                           selectedItem === item.name ? "text-gray-900" : "text-gray-500"
//                         }`}
//                       >
//                         {item.icon}
//                       </span>
//                       <span
//                         className={`transform transition-all duration-500 ${
//                           isCollapsed ? "opacity-0 -translate-x-full" : "opacity-100 translate-x-0"
//                         } whitespace-nowrap`}
//                       >
//                         {item.name}
//                       </span>
//                       {item.badge && !isCollapsed && (
//                         <span className="ml-auto bg-red-500 text-white text-xs font-semibold rounded-full px-2 py-0.5">
//                           {item.badge}
//                         </span>
//                       )}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </nav>
//       </aside>

//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Navbar */}
//         <header className="h-16 bg-white border-b border-gray-200">
//           <div className="h-full px-4 flex items-center justify-between">
//             <div className="flex items-center gap-4">
//               <button
//                 onClick={() => setIsCollapsed(!isCollapsed)}
//                 className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
//               >
//                 {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
//               </button>
//               <div className="flex flex-col">
//                 <span className="text-gray-700 font-bold text-xl">{selectedItem}</span>
//                 <h1>
//                   Hi, Welcome <span className="text-[#B28D28] font-bold">Admin</span>
//                 </h1>
//               </div>
//             </div>
//             <div className="flex items-center gap-4 me-10">
//               <button className="p-2 bg-[#FAE08C1A] hover:bg-[#f8de91] border-2 border-[#B28D2833] rounded-full transition-colors duration-300">
//                 <Bell size={24} className="text-[#B28D28]" />
//               </button>
//               <div className="flex items-center justify-center gap-2">
//                 <div className="w-12">
//                   <img
//                     src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
//                     className="rounded-full"
//                     alt="Admin Avatar"
//                   />
//                 </div>
//                 <div>
//                   <h2 className="font-bold">Admin</h2>
//                   <p className="text-gray-900">admin@hn.com</p>
//                 </div>
//                 <div className="dropdown dropdown-end">
//                   <div tabIndex={0} role="button">
//                     <ChevronDown size={20} />
//                   </div>
//                   <ul
//                     tabIndex={0}
//                     className="dropdown-content mt-4 menu bg-base-200 rounded-box z-50 w-32 p-2 shadow-md border border-gray-400"
//                   >
//                     <li>
//                       <Link to="/profile" className="text-gray-700 hover:text-gray-900">
//                         Profile
//                       </Link>
//                     </li>
//                     <li>
//                       <Link to="/logout" className="text-gray-700 hover:text-gray-900">
//                         Logout
//                       </Link>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </header>

//         {/* Main Content */}
//         <main className="flex-1 overflow-auto p-12 bg-[#F5F5F6]">
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }


"use client"

import { useState, useEffect } from "react"
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"
import {
  Bell,
  Calendar,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Handshake,
  Home,
  IdCard,
  LayoutDashboard,
  LayoutPanelLeft,
  LogOut,
  Menu,
  MessageSquare,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"


const getUserRole = () => {
  // For demo purposes, you can change this to test different roles
  return "Admin" // Options: "Admin", "Employee", "Vendor"
}

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState("Dashboard")
  const [userRole, setUserRole] = useState(getUserRole())
  const location = useLocation()
  const navigate = useNavigate()

  // Define menu items for each role
  const adminMenuItems = [
    {
      name: "Home",
      icon: <LayoutPanelLeft  size={20} />,
      path: "/dashboard",
    },
    {
      name: "Users",
      icon: <Users size={20} />,
      path: "/dashboard/users_info",
    },
    {
      name: "Employee",
      icon: <IdCard  size={20} />,
      path: "/dashboard/employee_info",
    },
    {
      name: "Vendors",
      icon: <Handshake size={20} />,
      path: "/dashboard/vendors_info",
    },
  ]

  const employeeMenuItems = [
    {
      name: "Home",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      name: "Chat",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/chat",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/dashboard/profile",
    },
  ]

  const vendorMenuItems = [
    {
      name: "Home",
      icon: <Home size={20} />,
      path: "/dashboard",
    },
    {
      name: "Chat",
      icon: <MessageSquare size={20} />,
      path: "/dashboard/chat",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/dashboard/profile",
    },
  ]

  // Get the appropriate menu items based on user role
  const getMenuItemsByRole = () => {
    switch (userRole) {
      case "Admin":
        return adminMenuItems
      case "Employee":
        return employeeMenuItems
      case "Vendor":
        return vendorMenuItems
      default:
        return adminMenuItems
    }
  }

  const menuItems = getMenuItemsByRole()

  // Sync selectedItem with current route on initial load and when location changes
  useEffect(() => {
    const currentPath = location.pathname
    const currentItem = menuItems.find(
      (item) => item.path === currentPath || (item.path === "/dashboard" && currentPath === "/dashboard/admin_home"),
    )

    if (currentItem) {
      setSelectedItem(currentItem.name)
    }
  }, [location.pathname, menuItems])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  const handleItemClick = (itemName, path) => {
    setSelectedItem(itemName)
    navigate(path)
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
    // Save preference to localStorage
    localStorage.setItem("sidebarCollapsed", (!isCollapsed).toString())
  }

  // Load sidebar state from localStorage on initial render
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#000000] shadow-xl transition-all duration-300 ease-in-out lg:relative ${
          isCollapsed ? "w-20" : "w-72"
        } ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo and collapse button */}
      <div className="flex items-center justify-center">
         <img
              src="https://images.seeklogo.com/logo-png/33/2/real-estate-logo-png_seeklogo-331345.png"
              alt="logo"
              className="w-[150px]"
            />
      </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3">
          <div className="space-y-1">
            {menuItems.map((item, idx) => (
              <NavLink
                key={idx}
                to={item.path}
                onClick={() => handleItemClick(item.name, item.path)}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${
                    selectedItem === item.name ||
                    (item.path === "/dashboard" && location.pathname === "/dashboard/admin_home")
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/80 hover:bg-white/5 hover:text-white"
                  }
                `}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className={`transition-all duration-300 ${isCollapsed ? "opacity-0 w-0 hidden" : "opacity-100"}`}>
                  {item.name}
                </span>
                {(selectedItem === item.name ||
                  (item.path === "/dashboard" && location.pathname === "/dashboard/admin_home")) &&
                  !isCollapsed && <span className="absolute left-0 w-1 h-8 bg-amber-400 rounded-r-md"></span>}
              </NavLink>
            ))}
          </div>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
          
        <header className="h-20 bg-[#000000] border-b border-gray-800">
        
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 rounded-lg text-gray-300 hover:bg-gray-800 lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={24} />
              </button>

             
            </div>

            <div className="flex items-center gap-4">
              {/* Notification bell */}
              <div className="relative">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full transition-colors duration-200">
                  <Bell size={20} className="text-gray-300" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* User profile */}
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600">
                  <img
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    className="w-full h-full object-cover"
                    alt="User Avatar"
                  />
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                </div>
                <div className="hidden md:block">
                  <h2 className="font-medium text-gray-300">{userRole}</h2>
                  <p className="text-xs text-gray-500">user@healingnest.com</p>
                </div>
                <div className="dropdown dropdown-end">
                  <div tabIndex={0} role="button" className="cursor-pointer">
                    <ChevronDown size={18} className="text-gray-400" />
                  </div>
                  <ul
                    tabIndex={0}
                    className="dropdown-content mt-2 menu bg-gray-900 rounded-lg z-50 w-48 p-2 shadow-lg border border-gray-800"
                  >
                    <li>
                      <NavLink
                        to="/dashboard/profile"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                      >
                        <User size={16} />
                        <span>Profile</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/dashboard/settings"
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-gray-800 rounded-md"
                      >
                        <Settings size={16} />
                        <span>Settings</span>
                      </NavLink>
                    </li>
                    <li className="border-t border-gray-800 mt-1 pt-1">
                      <NavLink
                        to="/logout"
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-6 md:p-8 bg-[#121212]/95">
          <div className="mx-auto">
            <Outlet context={{ userRole }} />
          </div>
        </main>
      </div>
    </div>
  )
}
