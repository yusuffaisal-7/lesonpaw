// import React, { useState, useContext } from "react";
// import Swal from "sweetalert2";
// import { AuthContext } from "../../../providers/AuthProvider";
// import useAxiosPublic from "../../../hooks/UseAxiosPublic";

// const JoinTeacher = () => {
//   const { user } = useContext(AuthContext);
//   const axiosPublic = useAxiosPublic(); 
//   const [formData, setFormData] = useState({
//     title: "",
//     reason: "",
//     cvLink: "",
//   });
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "You need to log in to apply!",
//       });
//       return;
//     }

//     try {
//       const response = await axiosPublic.patch(
//         `/users/request-teacher/${user.email}`,
//         {} // Backend only expects status update
//       );

//       if (response.data.success) {
//         Swal.fire({
//           position: "top-end",
//           icon: "success",
//           title: "Teacher application submitted successfully!",
//           showConfirmButton: false,
//           timer: 1500,
//         });
//         setIsModalOpen(true);
//       } else {
//         throw new Error(response.data.message || "Failed to submit application");
//       }
//     } catch (error) {
//       console.error("Error submitting teacher application:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: error.response?.data?.message || "Failed to submit your application. Please try again later.",
//       });
//     }
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFormData({
//       title: "",
//       reason: "",
//       cvLink: "",
//     });
//   };

//   return (
//     <div className="p-6 max-w-md mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Join as a Teacher</h2>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium">
//             Application Title
//           </label>
//           <input
//             id="title"
//             name="title"
//             type="text"
//             placeholder="Enter application title"
//             value={formData.title}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="reason" className="block text-sm font-medium">
//             Why do you want to be a Teacher?
//           </label>
//           <textarea
//             id="reason"
//             name="reason"
//             placeholder="Explain why you'd like to join as a teacher"
//             value={formData.reason}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <div>
//           <label htmlFor="cvLink" className="block text-sm font-medium">
//             CV Link
//           </label>
//           <input
//             id="cvLink"
//             name="cvLink"
//             type="url"
//             placeholder="Enter CV link"
//             value={formData.cvLink}
//             onChange={handleInputChange}
//             required
//             className="w-full p-2 border rounded"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
//         >
//           Submit
//         </button>
//       </form>

//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
//             <h3 className="text-lg font-bold mb-2">Application Successful</h3>
//             <p>Your teacher application has been submitted successfully!</p>
//             <button
//               onClick={closeModal}
//               className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//             >
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default JoinTeacher;

import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Changed to useAxiosSecure

const JoinTeacher = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [formData, setFormData] = useState({
    title: "",
    reason: "",
    cvLink: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to log in to apply!",
      });
      return;
    }

    try {
      const response = await axiosSecure.patch(
        `/users/request-teacher/${user.email}`,
        {
          title: formData.title,
          reason: formData.reason,
          cvLink: formData.cvLink,
        }
      );

      if (response.data.success) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Teacher application submitted successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        setIsModalOpen(true);
      } else {
        throw new Error(response.data.message || "Failed to submit application");
      }
    } catch (error) {
      console.error("Error submitting teacher application:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response?.data?.message || "Failed to submit your application. Please try again later.",
      });
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormData({
      title: "",
      reason: "",
      cvLink: "",
    });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Join as a Teacher</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium">
            Application Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter application title"
            value={formData.title}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium">
            Why do you want to be a Teacher?
          </label>
          <textarea
            id="reason"
            name="reason"
            placeholder="Explain why you'd like to join as a teacher"
            value={formData.reason}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label htmlFor="cvLink" className="block text-sm font-medium">
            CV Link
          </label>
          <input
            id="cvLink"
            name="cvLink"
            type="url"
            placeholder="Enter CV link"
            value={formData.cvLink}
            onChange={handleInputChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-bold mb-2">Application Successful</h3>
            <p>Your teacher application has been submitted successfully!</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinTeacher;