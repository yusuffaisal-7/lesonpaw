import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../providers/AuthProvider";
import logo from "../../assets/Logo.png";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

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

  return (
    <nav
      style={{ backgroundColor: "var(--color-text-dark)", boxSizing: "border-box" }}
      className="fixed top-0 left-0 right-0 z-50 shadow-md w-full"
    >
      <div
        className="flex justify-between items-center py-2 px-4 md:px-8 w-full"
        style={{ boxSizing: "border-box" }}
      >
        {/* Logo - Now links to home */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="LesonPaw" className="h-8 w-auto object-contain" />
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-3xl select-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Navigation Links */}
        <ul
          className={`md:flex gap-x-8 absolute md:static top-full left-0 w-full md:w-auto bg-[var(--color-text-dark)] md:bg-transparent p-6 md:p-0 transition-all duration-300 ease-in-out ${
            menuOpen ? "block" : "hidden"
          }`}
          style={{ boxSizing: "border-box" }}
        >
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `text-white hover:text-[var(--color-hero)] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                `text-white hover:text-[var(--color-hero)] transition-colors ${
                  isActive ? "font-bold" : ""
                }`
              }
            >
              Blog
            </NavLink>
          </li>
          {user && (
            <li className="mb-4 md:mb-0">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive
                    ? "text-yellow-300 font-bold block w-full"
                    : "text-white hover:text-yellow-300 block w-full"
                }
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>

        {/* User Area */}
        {user ? (
          <div className="relative ml-4">
            <div
              className="flex items-center gap-2 cursor-pointer select-none"
              onClick={toggleDropdown}
            >
              <img
                src={user.photoURL || "/default-profile.png"}
                alt="Profile"
                className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white"
              />
              <span className="text-sm font-medium text-white hidden md:block truncate max-w-[120px]">
                {user.displayName}
              </span>
            </div>

            {/* Dropdown */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg z-50">
                <button
                  onClick={() => {
                    handleLogout();
                    setDropdownOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left hover:bg-gray-100 text-gray-700"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="hidden md:flex gap-4">
            <NavLink
              to="/login"
              className="px-4 py-2 bg-yellow-400 text-[#005482] rounded hover:bg-yellow-300 whitespace-nowrap"
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className="px-4 py-2 border border-yellow-400 text-yellow-400 rounded hover:bg-yellow-50 whitespace-nowrap"
            >
              Register
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
