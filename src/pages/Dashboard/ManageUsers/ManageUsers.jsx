import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaSearch, FaUserShield, FaUserTag, FaTrash, FaFilter, 
  FaSort, FaSortUp, FaSortDown, FaEye 
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterRole, setFilterRole] = useState("all");
  const [selectedUser, setSelectedUser] = useState(null);
  const usersPerPage = 10;

  // Fetch users
  const { data: users = [], isLoading, error, refetch } = useQuery({
    queryKey: ["users", searchQuery, currentPage, sortField, sortOrder, filterRole],
    queryFn: async () => {
      const res = await axiosSecure.get("/users", {
        params: { 
          search: searchQuery, 
          page: currentPage, 
          limit: usersPerPage,
          sort: sortField,
          order: sortOrder,
          role: filterRole
        },
      });
      return res.data;
    },
  });

  const filteredUsers = users.filter(
    (user) =>
      user.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(users.length / usersPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * usersPerPage,
    currentPage * usersPerPage
  );

  const handleMakeAdmin = (user) => {
    Swal.fire({
      title: "Make Admin?",
      text: `Are you sure you want to make ${user.name} an admin?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, make admin",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/admin/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now an admin`,
                showConfirmButton: false,
                timer: 1500,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make admin",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handleMakeTeacher = (user) => {
    Swal.fire({
      title: "Make Teacher?",
      text: `Are you sure you want to make ${user.name} a teacher?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, make teacher",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/users/Teacher/${user._id}`)
          .then((res) => {
            if (res.data.modifiedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                position: "center",
                icon: "success",
                title: `${user.name} is now a teacher`,
                showConfirmButton: false,
                timer: 1500,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to make teacher",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handleDeleteUser = (user) => {
    Swal.fire({
      title: "Delete User?",
      text: `Are you sure you want to delete ${user.name}? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#005482",
      cancelButtonColor: "#DA3A60",
      confirmButtonText: "Yes, delete",
      background: "#ffffff",
      customClass: {
        title: "text-[var(--color-text-dark)] text-xl",
        content: "text-[var(--color-text-dark)]",
      }
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/users/${user._id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              refetch();
              setSelectedUser(null);
              Swal.fire({
                icon: "success",
                title: "User Deleted",
                text: `${user.name} has been deleted successfully.`,
                background: "#ffffff",
                customClass: {
                  title: "text-[var(--color-text-dark)] text-xl",
                  content: "text-[var(--color-text-dark)]",
                }
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: "error",
              title: "Failed to delete",
              text: error.message,
              background: "#ffffff",
              customClass: {
                title: "text-[var(--color-text-dark)] text-xl",
                content: "text-[var(--color-text-dark)]",
              }
            });
          });
      }
    });
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const getSortIcon = (field) => {
    if (sortField !== field) return <FaSort className="ml-1" />;
    return sortOrder === "asc" ? <FaSortUp className="ml-1" /> : <FaSortDown className="ml-1" />;
  };

  const SkeletonRow = () => (
    <tr className="animate-pulse">
      <td className="px-4 py-3">
        <div className="h-8 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-8 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-8 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="h-8 bg-gray-200 rounded"></div>
      </td>
      <td className="px-4 py-3">
        <div className="flex justify-end space-x-2">
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
          <div className="h-8 w-20 bg-gray-200 rounded"></div>
        </div>
      </td>
    </tr>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <p className="text-[var(--color-cta)] text-lg mb-2">Error Loading Users</p>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h2 className="text-3xl font-bold text-[var(--color-text-dark)]">Manage Users</h2>
            <p className="text-gray-600 mt-2">Total Users: {users.length}</p>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative flex-1 sm:w-64">
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admins</option>
              <option value="teacher">Teachers</option>
              <option value="student">Students</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[var(--color-text-dark)]"
                    onClick={() => handleSort("name")}
                  >
                    Name {getSortIcon("name")}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[var(--color-text-dark)]"
                    onClick={() => handleSort("email")}
                  >
                    Email {getSortIcon("email")}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[var(--color-text-dark)]"
                    onClick={() => handleSort("role")}
                  >
                    Role {getSortIcon("role")}
                  </button>
                </th>
                <th className="px-4 py-3 text-left">
                  <button
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-[var(--color-text-dark)]"
                    onClick={() => handleSort("status")}
                  >
                    Status {getSortIcon("status")}
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, index) => <SkeletonRow key={index} />)
              ) : paginatedUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                <AnimatePresence>
                  {paginatedUsers.map((user, index) => (
                    <motion.tr
                      key={user._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                      className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                        selectedUser?._id === user._id ? "bg-blue-50" : ""
                      }`}
                      onClick={() => setSelectedUser(selectedUser?._id === user._id ? null : user)}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white font-semibold text-sm mr-3">
                            {user.name?.charAt(0).toUpperCase() || "U"}
                          </div>
                          <span className="font-medium text-gray-900">{user.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.role === "admin" 
                            ? "bg-blue-100 text-blue-800"
                            : user.role === "teacher"
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}>
                          {user.role || "User"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}>
                          {user.status || "Active"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex justify-end space-x-2">
                          {user.role !== "admin" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMakeAdmin(user);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-text-dark)] text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors"
                            >
                              <FaUserShield className="text-xs" />
                              <span>Admin</span>
                            </button>
                          )}
                          {user.role !== "teacher" && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleMakeTeacher(user);
                              }}
                              className="flex items-center gap-1 px-3 py-1.5 bg-[#70C5D7] text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors"
                            >
                              <FaUserTag className="text-xs" />
                              <span>Teacher</span>
                            </button>
                          )}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteUser(user);
                            }}
                            className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-cta)] text-white rounded-lg text-xs hover:bg-opacity-90 transition-colors"
                          >
                            <FaTrash className="text-xs" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-2" aria-label="Pagination">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-dark)] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    currentPage === page
                      ? "bg-[var(--color-text-dark)] text-white"
                      : "text-[var(--color-text-dark)] bg-white border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-[var(--color-text-dark)] bg-white border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;