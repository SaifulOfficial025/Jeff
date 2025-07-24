"use client"
import React, { useState, useEffect } from "react"
import { useGetProfileQuery } from '../../redux/features/baseApi';
import {
  Bell,
  ChevronDown,
  ChevronsLeft,
  ChevronsRight,
  Handshake,
  Home,
  IdCard,
  LayoutPanelLeft,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom"

// --- Get User Role ---
const getUserRole = () => {
  const savedRole = localStorage.getItem("user_role")
  if (savedRole) return savedRole

  const token = localStorage.getItem("access_token")
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1] || ""))
      return payload.role || "Employee"
    } catch (error) {
      console.error("Error decoding token:", error)
    }
  }

  const currentPath = window.location.pathname
  if (currentPath.includes("admin")) return "Admin"
  if (currentPath.includes("employee")) return "Employee"
  if (currentPath.includes("vendor")) return "Vendor"

  return "Employee"
}

export default function DashboardLayout() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [userRole, setUserRole] = useState(getUserRole())
  const { data: profile, isLoading: profileLoading } = useGetProfileQuery();
  const location = useLocation()
  const navigate = useNavigate()

  // Update user role when localStorage or tokens change
  useEffect(() => {
    const updateUserRole = () => {
      const newRole = getUserRole()
      setUserRole(newRole)
    }

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', updateUserRole)
    
    // Also update role when location changes (after login/logout)
    updateUserRole()

    return () => {
      window.removeEventListener('storage', updateUserRole)
    }
  }, [location.pathname]) // Re-run when route changes

  // Menu Items
  const adminMenuItems = [
    { name: "Home", icon: <LayoutPanelLeft size={20} />, path: "/dashboard/admin_home" },
    { name: "Users", icon: <Users size={20} />, path: "/dashboard/users_info" },
    { name: "Employee", icon: <IdCard size={20} />, path: "/dashboard/employee_info" },
    { name: "Vendors", icon: <Handshake size={20} />, path: "/dashboard/vendors_info" },
  ]

  const employeeMenuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard/employee_home" },
    { name: "Chat", icon: <MessageSquare size={20} />, path: "/dashboard/employee_chat" },
    { name: "Profile", icon: <User size={20} />, path: "/dashboard/employee_profile" },
  ]

  const vendorMenuItems = [
    { name: "Home", icon: <Home size={20} />, path: "/dashboard/vendor_home" },
    { name: "Chat", icon: <MessageSquare size={20} />, path: "/dashboard/vendor_chat" },
    { name: "Profile", icon: <User size={20} />, path: "/dashboard/vendor_profile" },
  ]

  const getMenuItemsByRole = () => {
    switch (userRole) {
      case "Admin": return adminMenuItems
      case "Employee": return employeeMenuItems
      case "Vendor": return vendorMenuItems
      default: return adminMenuItems
    }
  }

  const menuItems = getMenuItemsByRole()

  // Load sidebar state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("sidebarCollapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location.pathname])

  // User info for sidebar/navbar
  const displayName = profile
    ? (profile.company_name || profile.full_name || profile.username || profile.email)
    : userRole;
  const displayEmail = profile ? (profile.email || '') : '';
  const displayAvatar = profile && profile.profile_image
    ? profile.profile_image
    : "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp";

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#000000] shadow-xl transition-all duration-300 ease-in-out lg:relative 
          ${isCollapsed ? "w-20" : "w-72"} 
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Logo & Toggle */}
        <div className="flex items-center justify-between px-4 py-4">
          <Link to="/" className="flex items-center justify-center">
            <img
              src="https://images.seeklogo.com/logo-png/33/2/real-estate-logo-png_seeklogo-331345.png"
              alt="logo"
              className="w-[150px]"
            />
          </Link>
          <button
            onClick={() => {
              const next = !isCollapsed
              setIsCollapsed(next)
              localStorage.setItem("sidebarCollapsed", next.toString())
            }}
            className="p-2 rounded text-white hover:bg-gray-800 hidden lg:block"
          >
            {isCollapsed ? <ChevronsRight size={20} /> : <ChevronsLeft size={20} />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-2">
          {menuItems.map((item, idx) => (
            <NavLink
              key={idx}
              to={item.path}
              className={({ isActive }) => `
                relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                ${isActive ? "bg-white/10 text-white font-medium" : "text-white/80 hover:bg-white/5 hover:text-white"}
              `}
            >
              <span>{item.icon}</span>
              <span className={`transition-all ${isCollapsed ? "hidden" : "block"}`}>{item.name}</span>
              {location.pathname === item.path && !isCollapsed && (
                <span className="absolute left-0 w-1 h-8 bg-amber-400 rounded-r-md" />
              )}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-[#000000] border-b border-gray-800">
          <div className="h-full px-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-2 text-gray-300 hover:bg-gray-800 rounded-lg lg:hidden"
              >
                <Menu size={24} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {/* Bell */}
              <div className="relative">
                <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-full">
                  <Bell size={20} className="text-gray-300" />
                  <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
              </div>

              {/* Profile */}
              <div className="flex items-center gap-3">
                {!profileLoading && profile ? (
                  <>
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-amber-600">
                      <img
                        src={displayAvatar}
                        className="w-full h-full object-cover"
                        alt="User Avatar"
                      />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#121212]"></div>
                    </div>
                    <div className="hidden md:block">
                      <h2 className="font-medium text-gray-300">{displayName}</h2>
                      <p className="text-xs text-gray-500">{displayEmail}</p>
                    </div>
                  </>
                ) : (
                  <>
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
                  </>
                )}
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
                        to={`/dashboard/${userRole.toLowerCase()}_profile`}
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
                      <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:bg-gray-800 rounded-md w-full text-left"
                        onClick={() => {
                          localStorage.clear()
                          navigate("/")
                        }}
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
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
