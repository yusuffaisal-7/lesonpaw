// import React, { useContext, useState } from 'react';

// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../../../providers/AuthProvider';

// const TutorJobApplications = () => {
//   const axiosSecure = useAxiosSecure();
//    const { user } = useContext(AuthContext);
//   const [applying, setApplying] = useState(null); 

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
//       {jobs.length === 0 ? (
//         <div className="text-center text-gray-600 py-10">
//           No available jobs at the moment. Check back later!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {job.userPhotoURL ? (
//                     <img
//                       src={job.userPhotoURL}
//                       alt={job.userName || 'User'}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.userName || job.email}
//                     </h3>
//                     <p className="text-sm text-gray-500">{job.email}</p>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                     <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     </svg>
//                     <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     </svg>
//                     <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                     </svg>
//                     <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   disabled={applying === job._id}
//                 >
//                   {applying === job._id ? 'Applying...' : 'Apply to Job'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorJobApplications;


// import React, { useState, useContext } from 'react';
// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// import Swal from 'sweetalert2';

// const TutorJobApplications = () => {
//   const { user } = useContext(AuthContext);
//   const axiosSecure = useAxiosSecure();
//   const [applying, setApplying] = useState(null);

//   const { data: jobs = [], isLoading } = useQuery({
//     queryKey: ['available-jobs'],
//     queryFn: async () => {
//       const res = await axiosSecure.get('/jobs/available');
//       return res.data;
//     },
//   });

//   const handleApply = async (jobId) => {
//     setApplying(jobId);
//     try {
//       await axiosSecure.post(`/jobs/apply/${jobId}`);
//       Swal.fire({
//         icon: 'success',
//         title: 'Applied to Job',
//         text: 'Your application has been submitted!',
//         timer: 1500,
//         showConfirmButton: false,
//       });
//     } catch (error) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Error',
//         text: error.response?.data?.message || 'Failed to apply to job.',
//       });
//     } finally {
//       setApplying(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
//       </div>
//     );
//   }

//   if (!user?.email) {
//     return (
//       <div className="text-center py-10">
//         <p className="text-red-500 text-lg font-semibold">Please log in to view available jobs.</p>
//         <a href="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//           Go to Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-6 max-w-7xl">
//       <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
//       {jobs.length === 0 ? (
//         <div className="text-center text-gray-600 py-10">
//           No available jobs at the moment. Check back later!
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {jobs.map((job) => (
//             <div
//               key={job._id}
//               className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
//             >
//               <div className="p-6">
//                 <div className="flex items-center mb-4">
//                   {job.userPhotoURL ? (
//                     <img
//                       src={job.userPhotoURL}
//                       alt={job.userName || 'User'}
//                       className="w-12 h-12 rounded-full mr-3 object-cover"
//                       onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
//                     />
//                   ) : (
//                     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
//                       <span className="text-gray-500">No Image</span>
//                     </div>
//                   )}
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-800">
//                       {job.userName || job.email}
//                     </h3>
//                     <p className="text-sm text-gray-500">{job.email}</p>
//                   </div>
//                 </div>
//                 <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
//                 <div className="space-y-2 text-sm text-gray-600">
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
//                     </svg>
//                     <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
//                     </svg>
//                     <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                     </svg>
//                     <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                     </svg>
//                     <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
//                     </svg>
//                     <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
//                   </p>
//                   <p className="flex items-center">
//                     <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
//                     </svg>
//                     <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
//                   </p>
//                 </div>
//                 <button
//                   onClick={() => handleApply(job._id)}
//                   className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
//                   disabled={applying === job._id || job.applicants?.includes(user.name)}
//                 >
//                   {applying === job._id ? 'Applying...' : job.applicants?.includes(user.name) ? 'Already Applied' : 'Apply to Job'}
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default TutorJobApplications;


import React, { useState, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import Swal from 'sweetalert2';

const TutorJobApplications = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [applying, setApplying] = useState(null);

  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ['available-jobs'],
    queryFn: async () => {
      const res = await axiosSecure.get('/jobs/available');
      return res.data;
    },
  });

  const handleApply = async (jobId) => {
    setApplying(jobId);
    try {
      await axiosSecure.post(`/jobs/apply/${jobId}`);
      Swal.fire({
        icon: 'success',
        title: 'Applied to Job',
        text: 'Your application has been submitted!',
        timer: 1500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to apply to job.',
      });
    } finally {
      setApplying(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
      </div>
    );
  }

  if (!user?.email) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg font-semibold">Please log in to view available jobs.</p>
        <a href="/login" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Available Tutoring Jobs</h2>
      {jobs.length === 0 ? (
        <div className="text-center text-gray-600 py-10">
          No available jobs at the moment. Check back later!
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-2 hover:shadow-2xl duration-300"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {job.userPhotoURL ? (
                    <img
                      src={job.userPhotoURL}
                      alt={job.userName || 'User'}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                      onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-gray-500">No Image</span>
                    </div>
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {job.userName || job.email}
                    </h3>
                    <p className="text-sm text-gray-500">{job.email}</p>
                  </div>
                </div>
                <h4 className="text-xl font-bold text-gray-800 mb-3">{job.subject}</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                    <span><strong>Goal:</strong> {job.topicsGoals || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
                    </svg>
                    <span><strong>Grade:</strong> {job.gradeLevel || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Mode:</strong> {job.modeOfLearning || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <span><strong>Location:</strong> {job.location || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Sessions/Week:</strong> {job.sessionsPerWeek || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Budget:</strong> ${job.budget || 'Not specified'} {job.openToNegotiation === 'Yes' ? '(Negotiable)' : ''}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span><strong>Start Date:</strong> {job.startDate ? new Date(job.startDate).toLocaleDateString() : 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span><strong>Deadline:</strong> {job.deadline ? new Date(job.deadline).toLocaleDateString() : 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span><strong>Help Type:</strong> {job.helpType?.join(', ') || 'Not specified'}</span>
                  </p>
                  <p className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                    <span><strong>Notes:</strong> {job.additionalNotes || 'None'}</span>
                  </p>
                </div>
                <button
                  onClick={() => handleApply(job._id)}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
                  disabled={applying === job._id || job.applicants?.includes(user.email)}
                >
                  {applying === job._id ? 'Applying...' : job.applicants?.includes(user.email) ? 'Already Applied' : 'Apply to Job'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TutorJobApplications;