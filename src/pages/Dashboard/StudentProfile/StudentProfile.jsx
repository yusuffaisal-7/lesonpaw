// import React, { useState, useContext, useEffect } from 'react';

// import { AuthContext } from '../../../providers/AuthProvider';
// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';

// const StudentProfile = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const queryClient = useQueryClient();

//   const [formData, setFormData] = useState({
//     fullName: '',
//     photoURL: user?.photoURL || '',
//     email: user?.email || '',
//     dateOfBirth: '',
//     gender: '',
//     contactNumber: '',
//     institution: '',
//     studentId: '',
//     gradeYearOfStudy: '',
//     permanentAddress: '',
//     currentAddress: '',
//     cityStateCountry: '',
//     zipPostalCode: '',
//     guardianName: '',
//     guardianContactNumber: '',
//     guardianEmail: '',
//   });

//   // Fetch student profile
//   const {
//     data: student,
//     isLoading: studentLoading,
//     error: studentError,
//   } = useQuery({
//     queryKey: ['studentProfile', user?.email],
//     queryFn: async () => {
//       if (!user?.email) return null;
//       try {
//         const res = await axiosSecure.get(`/students/${user.email}`);
//         return res.data;
//       } catch (error) {
//         if (error.response?.status === 404) {
//           console.log('No student profile found; initializing with user data.');
//           return null;
//         }
//         throw error;
//       }
//     },
//     enabled: !!user?.email,
//   });

//   // Initialize formData when student data is fetched
//   useEffect(() => {
//     if (student) {
//       setFormData({
//         fullName: student.fullName || '',
//         photoURL: student.photoURL || user?.photoURL || '',
//         email: user?.email || '',
//         dateOfBirth: student.dateOfBirth || '',
//         gender: student.gender || '',
//         contactNumber: student.contactNumber || '',
//         institution: student.institution || '',
//         studentId: student.studentId || '',
//         gradeYearOfStudy: student.gradeYearOfStudy || '',
//         permanentAddress: student.permanentAddress || '',
//         currentAddress: student.currentAddress || '',
//         cityStateCountry: student.cityStateCountry || '',
//         zipPostalCode: student.zipPostalCode || '',
//         guardianName: student.guardianName || '',
//         guardianContactNumber: student.guardianContactNumber || '',
//         guardianEmail: student.guardianEmail || '',
//       });
//     }
//   }, [student, user]);

//   // Mutation for saving student profile
//   const mutation = useMutation({
//     mutationFn: async (formData) => {
//       const res = await axiosSecure.put(`/students/${user.email}`, formData);
//       return res.data;
//     },
//     onSuccess: (data) => {
//       queryClient.setQueryData(['studentProfile', user?.email], data);
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Profile saved successfully!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     },
//     onError: (err) => {
//       console.error('Error saving student profile:', err);
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: err.response?.data?.message || 'Failed to save profile.',
//       });
//     },
//   });

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (['contactNumber', 'guardianContactNumber'].includes(name)) {
//       if (!/^[0-9+\-\s]{0,15}$/.test(value)) return;
//     }
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const requiredFields = [
//       'fullName',
//       'dateOfBirth',
//       'gender',
//       'contactNumber',
//       'institution',
//       'studentId',
//       'gradeYearOfStudy',
//       'permanentAddress',
//       'currentAddress',
//       'cityStateCountry',
//       'zipPostalCode',
//       'guardianName',
//       'guardianContactNumber',
//     ];

//     const missingFields = requiredFields.filter((field) => !formData[field]);
//     if (missingFields.length > 0) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Missing Fields',
//         text: `Please fill in: ${missingFields.join(', ')}`,
//       });
//       return;
//     }

//     const phoneRegex = /^[0-9+\-\s]{10,15}$/;
//     if (!phoneRegex.test(formData.contactNumber) || !phoneRegex.test(formData.guardianContactNumber)) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Invalid Input',
//         text: 'Contact numbers must be 10-15 digits (including +, -, or spaces).',
//       });
//       return;
//     }

//     mutation.mutate(formData);
//   };

//   // Handle loading and error states
//   if (studentLoading) {
//     return <p className="text-center mt-10">Loading...</p>;
//   }

//   if (!user?.email) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         Error: Please log in to view your profile.
//         <br />
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       </p>
//     );
//   }

//   if (studentError) {
//     return (
//       <p className="text-center text-red-500 mt-10">
//         Error: {studentError?.response?.data?.message || 'Failed to load profile data.'}
//         <br />
//         <button
//           onClick={() => window.location.reload()}
//           className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Retry
//         </button>
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <h2 className="text-2xl font-bold mb-4">Student Profile</h2>

//       <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <div>
//           <label className="block font-semibold">Full Name</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Photo URL</label>
//           <input
//             type="text"
//             name="photoURL"
//             value={formData.photoURL}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             disabled
//             className="w-full border p-2 rounded disabled:bg-gray-100"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Date of Birth</label>
//           <input
//             type="date"
//             name="dateOfBirth"
//             value={formData.dateOfBirth}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Gender</label>
//           <input
//             type="text"
//             name="gender"
//             value={formData.gender}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Contact Number</label>
//           <input
//             type="text"
//             name="contactNumber"
//             value={formData.contactNumber}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Institution</label>
//           <input
//             type="text"
//             name="institution"
//             value={formData.institution}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Student ID</label>
//           <input
//             type="text"
//             name="studentId"
//             value={formData.studentId}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Grade/Year of Study</label>
//           <input
//             type="text"
//             name="gradeYearOfStudy"
//             value={formData.gradeYearOfStudy}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Permanent Address</label>
//           <input
//             type="text"
//             name="permanentAddress"
//             value={formData.permanentAddress}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Current Address</label>
//           <input
//             type="text"
//             name="currentAddress"
//             value={formData.currentAddress}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">City/State/Country</label>
//           <input
//             type="text"
//             name="cityStateCountry"
//             value={formData.cityStateCountry}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">ZIP/Postal Code</label>
//           <input
//             type="text"
//             name="zipPostalCode"
//             value={formData.zipPostalCode}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Guardian Name</label>
//           <input
//             type="text"
//             name="guardianName"
//             value={formData.guardianName}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Guardian Contact Number</label>
//           <input
//             type="text"
//             name="guardianContactNumber"
//             value={formData.guardianContactNumber}
//             onChange={handleChange}
//             required
//             className="w-full border p-2 rounded"
//           />
//         </div>
//         <div>
//           <label className="block font-semibold">Guardian Email</label>
//           <input
//             type="email"
//             name="guardianEmail"
//             value={formData.guardianEmail}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//           />
//         </div>

//         <div className="col-span-2">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
//             disabled={mutation.isLoading}
//           >
//             {mutation.isLoading ? 'Saving...' : 'Save Profile'}
//           </button>
//         </div>
//       </form>

//       {student && (
//         <div className="mt-10 border-t pt-6">
//           <h3 className="text-xl font-semibold mb-4">Current Profile</h3>
//           {student.photoURL && (
//             <img
//               src={student.photoURL}
//               alt="Student"
//               className="w-32 h-32 rounded-full mb-4"
//               onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//             />
//           )}
//           <ul className="mt-4 space-y-2">
//             <li><strong>ID:</strong> {student._id || 'Not provided'}</li>
//             <li><strong>Name:</strong> {student.fullName || 'Not provided'}</li>
//             <li><strong>Email:</strong> {student.email || 'Not provided'}</li>
//             <li>
//               <strong>DOB:</strong>{' '}
//               {student.dateOfBirth
//                 ? new Date(student.dateOfBirth).toLocaleDateString()
//                 : 'Not provided'}
//             </li>
//             <li><strong>Gender:</strong> {student.gender || 'Not provided'}</li>
//             <li><strong>Contact:</strong> {student.contactNumber || 'Not provided'}</li>
//             <li><strong>Institution:</strong> {student.institution || 'Not provided'}</li>
//             <li><strong>Student ID:</strong> {student.studentId || 'Not provided'}</li>
//             <li><strong>Grade/Year:</strong> {student.gradeYearOfStudy || 'Not provided'}</li>
//             <li>
//               <strong>Permanent Address:</strong> {student.permanentAddress || 'Not provided'}
//             </li>
//             <li><strong>Current Address:</strong> {student.currentAddress || 'Not provided'}</li>
//             <li>
//               <strong>City/State/Country:</strong> {student.cityStateCountry || 'Not provided'}
//             </li>
//             <li><strong>Zip Code:</strong> {student.zipPostalCode || 'Not provided'}</li>
//             <li><strong>Guardian Name:</strong> {student.guardianName || 'Not provided'}</li>
//             <li>
//               <strong>Guardian Phone:</strong> {student.guardianContactNumber || 'Not provided'}
//             </li>
//             <li><strong>Guardian Email:</strong> {student.guardianEmail || 'Not provided'}</li>
//             <li>
//               <strong>Created At:</strong>{' '}
//               {student.createdAt
//                 ? new Date(student.createdAt).toLocaleString()
//                 : 'Not provided'}
//             </li>
//             <li>
//               <strong>Updated At:</strong>{' '}
//               {student.updatedAt
//                 ? new Date(student.updatedAt).toLocaleString()
//                 : 'Not provided'}
//             </li>
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentProfile;

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../../providers/AuthProvider';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const StudentProfile = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    fullName: '',
    photoURL: user?.photoURL || '',
    email: user?.email || '',
    dateOfBirth: '',
    gender: '',
    contactNumber: '',
    institution: '',
    studentId: '',
    gradeYearOfStudy: '',
    permanentAddress: '',
    currentAddress: '',
    cityStateCountry: '',
    zipPostalCode: '',
    guardianName: '',
    guardianContactNumber: '',
    guardianEmail: '',
  });

  // Fetch student profile
  const {
    data: student,
    isLoading: studentLoading,
    error: studentError,
  } = useQuery({
    queryKey: ['studentProfile', user?.email],
    queryFn: async () => {
      if (!user?.email) return null;
      try {
        const res = await axiosSecure.get(`/students/${user.email}`);
        return res.data;
      } catch (error) {
        if (error.response?.status === 404) {
          console.log('No student profile found; initializing with user data.');
          return null;
        }
        throw error;
      }
    },
    enabled: !!user?.email,
  });

  // Initialize formData when student data is fetched
  useEffect(() => {
    if (student) {
      setFormData({
        fullName: student.fullName || '',
        photoURL: student.photoURL || user?.photoURL || '',
        email: user?.email || '',
        dateOfBirth: student.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split('T')[0] : '',
        gender: student.gender || '',
        contactNumber: student.contactNumber || '',
        institution: student.institution || '',
        studentId: student.studentId || '',
        gradeYearOfStudy: student.gradeYearOfStudy || '',
        permanentAddress: student.permanentAddress || '',
        currentAddress: student.currentAddress || '',
        cityStateCountry: student.cityStateCountry || '',
        zipPostalCode: student.zipPostalCode || '',
        guardianName: student.guardianName || '',
        guardianContactNumber: student.guardianContactNumber || '',
        guardianEmail: student.guardianEmail || '',
      });
    }
  }, [student, user]);

  // Mutation for saving student profile
  const mutation = useMutation({
    mutationFn: async (formData) => {
      const res = await axiosSecure.put(`/students/${user.email}`, formData);
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['studentProfile', user?.email], data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Profile saved successfully!',
        timer: 1500,
        showConfirmButton: false,
      });
    },
    onError: (err) => {
      console.error('Error saving student profile:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response?.data?.message || 'Failed to save profile.',
      });
    },
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (['contactNumber', 'guardianContactNumber'].includes(name)) {
      if (!/^[0-9+\-\s]{0,15}$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = [
      'fullName',
      'dateOfBirth',
      'gender',
      'contactNumber',
      'institution',
      'studentId',
      'gradeYearOfStudy',
      'permanentAddress',
      'currentAddress',
      'cityStateCountry',
      'zipPostalCode',
      'guardianName',
      'guardianContactNumber',
    ];

    const missingFields = requiredFields.filter((field) => !formData[field]);
    if (missingFields.length > 0) {
      Swal.fire({
        icon: 'error',
        title: 'Missing Fields',
        text: `Please fill in: ${missingFields.join(', ')}`,
      });
      return;
    }

    const phoneRegex = /^[0-9+\-\s]{10,15}$/;
    if (!phoneRegex.test(formData.contactNumber) || !phoneRegex.test(formData.guardianContactNumber)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Input',
        text: 'Contact numbers must be 10-15 digits (including +, -, or spaces).',
      });
      return;
    }

    const dob = new Date(formData.dateOfBirth);
    if (isNaN(dob) || dob >= new Date()) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Date',
        text: 'Date of Birth must be a valid date in the past.',
      });
      return;
    }

    mutation.mutate(formData);
  };

  // Handle loading and error states
  if (studentLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">Please log in to view your profile.</p>
        <button
          onClick={() => window.location.href = '/login'}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (studentError) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">
          Error: {studentError?.response?.data?.message || 'Failed to load profile data.'}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Student Profile</h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-6 rounded-xl shadow-lg">
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Photo URL</label>
          <input
            type="text"
            name="photoURL"
            value={formData.photoURL}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            disabled
            className="w-full border p-2 rounded-lg bg-gray-100 cursor-not-allowed"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Date of Birth</label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Gender</label>
          <input
            type="text"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Contact Number</label>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Institution</label>
          <input
            type="text"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Student ID</label>
          <input
            type="text"
            name="studentId"
            value={formData.studentId}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Grade/Year of Study</label>
          <input
            type="text"
            name="gradeYearOfStudy"
            value={formData.gradeYearOfStudy}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Permanent Address</label>
          <input
            type="text"
            name="permanentAddress"
            value={formData.permanentAddress}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Current Address</label>
          <input
            type="text"
            name="currentAddress"
            value={formData.currentAddress}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">City/State/Country</label>
          <input
            type="text"
            name="cityStateCountry"
            value={formData.cityStateCountry}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">ZIP/Postal Code</label>
          <input
            type="text"
            name="zipPostalCode"
            value={formData.zipPostalCode}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Name</label>
          <input
            type="text"
            name="guardianName"
            value={formData.guardianName}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Contact Number</label>
          <input
            type="text"
            name="guardianContactNumber"
            value={formData.guardianContactNumber}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Guardian Email</label>
          <input
            type="email"
            name="guardianEmail"
            value={formData.guardianEmail}
            onChange={handleChange}
            className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            disabled={mutation.isLoading}
          >
            {mutation.isLoading ? 'Saving...' : 'Save Profile'}
          </button>
        </div>
      </form>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Current Profile</h3>
        {student ? (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              {student.photoURL ? (
                <img
                  src={student.photoURL}
                  alt="Student"
                  className="w-24 h-24 rounded-full mr-4 object-cover"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <div>
                <h4 className="text-xl font-bold text-gray-800">{student.fullName || 'Not provided'}</h4>
                <p className="text-gray-600">{student.email || 'Not provided'}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span><strong>DOB:</strong> {student.dateOfBirth ? new Date(student.dateOfBirth).toLocaleDateString() : 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                </svg>
                <span><strong>Gender:</strong> {student.gender || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span><strong>Contact:</strong> {student.contactNumber || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span><strong>Institution:</strong> {student.institution || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                </svg>
                <span><strong>Student ID:</strong> {student.studentId || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
                <span><strong>Grade/Year:</strong> {student.gradeYearOfStudy || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span><strong>Permanent Address:</strong> {student.permanentAddress || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span><strong>Current Address:</strong> {student.currentAddress || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span><strong>City/State/Country:</strong> {student.cityStateCountry || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span><strong>Zip Code:</strong> {student.zipPostalCode || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                <span><strong>Guardian Name:</strong> {student.guardianName || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span><strong>Guardian Phone:</strong> {student.guardianContactNumber || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l9-6 9 6v10a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
                <span><strong>Guardian Email:</strong> {student.guardianEmail || 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span><strong>Created At:</strong> {student.createdAt ? new Date(student.createdAt).toLocaleString() : 'Not provided'}</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke Capstone="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span><strong>Updated At:</strong> {student.updatedAt ? new Date(student.updatedAt).toLocaleString() : 'Not provided'}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-600">
            No profile data available. Please fill out and save the form above to create your profile.
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;