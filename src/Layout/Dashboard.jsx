import { useState, useContext, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FaBars, FaTimes, FaUser, FaTasks, FaHome, FaUserPlus,
  FaBell, FaBook, FaCheckCircle, FaMapMarkerAlt, FaMoneyBillWave,
  FaChartBar, FaBriefcase, FaEdit, FaPlusCircle, FaSignOutAlt, FaSearch
} from "react-icons/fa";

import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/UseAdmin";
import useTeacher from '../hooks/useTeacher';

const Dashboard = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isTeacher] = useTeacher();
  const [isAdmin] = useAdmin();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // 👇 Auto redirect logic
  useEffect(() => {
    if (location.pathname === "/dashboard") {
      if (isAdmin) {
        navigate("/dashboard/manage-users");
      } else if (isTeacher) {
        navigate("/dashboard/teacherProfile");
      } else {
        navigate("/dashboard/studentProfile");
      }
    }
  }, [isAdmin, isTeacher, navigate, location.pathname]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out",
          text: "You have successfully logged out.",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Logout Failed",
          text: "Something went wrong while logging out.",
          confirmButtonText: "Try Again",
        });
      });
  };

  const renderNavLink = (to, icon, label) => (
    <NavLink
      to={to}
      onClick={closeSidebar}
      className={({ isActive }) =>
        `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
          isActive 
            ? "bg-[var(--color-cta)] text-white" 
            : "text-white hover:bg-white/10"
        }`
      }
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );

  return (
    <div className="fixed inset-0 flex w-full h-full overflow-hidden">
      {/* Mobile Navbar */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-white shadow-md z-50 flex items-center justify-between px-4">
        <button
          onClick={toggleSidebar}
          className="text-[var(--color-text-dark)] text-2xl"
          aria-label="Toggle Sidebar"
        >
          <FaBars />
        </button>

        <h2 className="text-lg font-medium text-[var(--color-text-dark)]">Dashboard</h2>

        <div className="flex items-center gap-3">
          <div className="relative">
            <FaBell className="text-[var(--color-text-dark)] text-xl" />
            <span className="absolute -top-1 -right-1 bg-[var(--color-cta)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
          <FaSearch className="text-[var(--color-text-dark)] text-xl" />
        </div>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static h-full w-64 bg-[var(--color-text-dark)] transition-transform duration-300 z-40 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="h-full overflow-y-auto">
          <div className="p-5">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">Menu</h2>
              <nav className="space-y-2">
                {/* Home Link for all users */}
                {renderNavLink("/", <FaHome className="text-xl" />, "Home")}

                {/* Student Routes */}
                {user && !isAdmin && !isTeacher && (
                  <>
                    {renderNavLink("/dashboard/studentProfile", <FaUser className="text-xl" />, "Profile")}
                    {renderNavLink("/dashboard/my-bookings", <FaBook className="text-xl" />, "My Bookings")}
                    {renderNavLink("/dashboard/joinTeacher", <FaUserPlus className="text-xl" />, "Join as Teacher")}
                    {renderNavLink("/dashboard/post-job", <FaPlusCircle className="text-xl" />, "Post Job")}
                  </>
                )}

                {/* Teacher Routes */}
                {user && isTeacher && (
                  <>
                    {renderNavLink("/dashboard/teacherProfile", <FaUser className="text-xl" />, "Manage Profile")}
                    {renderNavLink("/dashboard/tutor-jobs", <FaBriefcase className="text-xl" />, "Available Jobs")}
                    {renderNavLink("/dashboard/manage-services", <FaEdit className="text-xl" />, "Manage Services")}
                  </>
                )}

                {/* Admin Routes */}
                {user && isAdmin && (
                  <>
                    {renderNavLink("/dashboard/manage-users", <FaTasks className="text-xl" />, "Manage Users")}
                    {renderNavLink("/dashboard/tutors", <FaUser className="text-xl" />, "All Tutors")}
                    {renderNavLink("/dashboard/message", <FaBell className="text-xl" />, "Show Messages")}
                    {renderNavLink("/dashboard/add-tutor", <FaUserPlus className="text-xl" />, "Add Tutor")}
                    {renderNavLink("/dashboard/teacher-applications", <FaCheckCircle className="text-xl" />, "Applications")}
                    {renderNavLink("/dashboard/manage-payments", <FaMoneyBillWave className="text-xl" />, "Payments")}
                    {renderNavLink("/dashboard/admin-analytics", <FaChartBar className="text-xl" />, "Analytics")}
                    {renderNavLink("/dashboard/students", <FaBook className="text-xl" />, "Students")}
                    {renderNavLink("/dashboard/all-jobs", <FaBriefcase className="text-xl" />, "All Jobs")}
                    {renderNavLink("/dashboard/service", <FaEdit className="text-xl" />, "All Services")}
                  </>
                )}
              </nav>
            </div>

            {/* User Section */}
            <div className="border-t border-white/10 pt-4 mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={user?.photoURL || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <div>
                  <h3 className="font-medium text-sm text-white">{user?.displayName || "User"}</h3>
                  <p className="text-xs text-white/70">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full bg-[var(--color-cta)] text-white py-2 px-4 rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative w-full h-full bg-[var(--color-background)]">
        <div className="absolute inset-0 overflow-auto md:pt-0 pt-14">
          <div className="min-h-full w-full p-4 md:p-6">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Dashboard;
