


// import { useQuery } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// // import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { useContext } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';
// // import { AuthContext } from '../providers/AuthProvider';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const { data: tutor, isLoading, error } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

//   const handleBookTutor = async () => {
//     if (!user) {
//       alert('Please log in to book a tutor.');
//       navigate('/login');
//       return;
//     }
//     try {
//       await axiosSecure.post('/carts', {
//         email: user.email,
//         tutorId: tutor._id,
//         subject: tutor.subjects[0], 
//       });
//       alert('Tutor booked successfully!');
//       navigate('/dashboard/my-bookings');
//     } catch (error) {
//       console.error('Error booking tutor:', error);
//       alert('Failed to book tutor.');
//     }
//   };

//   if (isLoading) return <div className="text-center py-20">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
//   if (!tutor) return <div className="text-center py-10">Tutor not found</div>;

//   return (
//     <div className="p-6 max-w-4xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="btn btn-outline btn-sm mb-6"
//       >
//         Back
//       </button>
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           <img
//             src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
//             alt={tutor.name}
//             className="w-full md:w-1/3 h-64 object-cover rounded-lg"
//           />
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{tutor.name}</h2>
//             <p className="text-gray-600 mb-2"><strong>Email:</strong> {tutor.email}</p>
//             <p className="text-gray-600 mb-2"><strong>Subjects:</strong> {tutor.subjects?.join(', ')}</p>
//             <p className="text-gray-600 mb-2"><strong>Experience:</strong> {tutor.experience || 0} years</p>
//             <p className="text-gray-600 mb-2"><strong>Status:</strong> {tutor.status || 'Active'}</p>
//             <p className="text-gray-600 mb-2"><strong>Bio:</strong> {tutor.bio || 'No bio available'}</p>
//             <p className="text-gray-600 mb-2"><strong>Location:</strong> {tutor.location || 'Not specified'}</p>
//             <p className="text-gray-600 mb-2"><strong>Education:</strong> {tutor.education || 'Not specified'}</p>
//             <button
//               onClick={handleBookTutor}
//               className="btn btn-primary mt-4"
//             >
//               Book Tutor
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDetails;


// import { useQuery } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const { data: tutor, isLoading, error } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

//   const handleBookTutor = async () => {
//     if (!user) {
//       alert('Please log in to book a tutor.');
//       navigate('/login');
//       return;
//     }
//     try {
//       await axiosSecure.post('/carts', {
//         email: user.email,
//         tutorId: tutor._id,
//         subject: tutor.subjects[0],
//       });
//       alert('Tutor booked successfully!');
//       navigate('/dashboard/my-bookings');
//     } catch (error) {
//       console.error('Error booking tutor:', error);
//       alert('Failed to book tutor.');
//     }
//   };

//   if (isLoading) return <div className="text-center py-20">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
//   if (!tutor) return <div className="text-center py-10">Tutor not found</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto">
//       <button
//         onClick={() => navigate(-1)}
//         className="btn btn-outline btn-sm mb-6"
//       >
//         Back
//       </button>
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           <img
//             src={tutor.photoURL || 'https://i.ibb.co/gxzxFJk/profile12.jpg'}
//             alt={tutor.name}
//             className="w-full md:w-1/3 h-64 object-cover rounded-lg"
//           />
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{tutor.name}</h2>
//             <p className="text-gray-600 mb-1"><strong>Email:</strong> {tutor.email}</p>
//             <p className="text-gray-600 mb-1"><strong>Phone:</strong> {tutor.contactNumber}</p>
//             <p className="text-gray-600 mb-1"><strong>Date of Birth:</strong> {tutor.dateOfBirth}</p>
//             <p className="text-gray-600 mb-1"><strong>Gender:</strong> {tutor.gender}</p>
//             <p className="text-gray-600 mb-1"><strong>Subjects:</strong> {tutor.subjects?.join(', ') || 'N/A'}</p>
//             <p className="text-gray-600 mb-1"><strong>Education:</strong> {tutor.educationalQualifications}</p>
//             <p className="text-gray-600 mb-1"><strong>Institution:</strong> {tutor.institution}</p>
//             <p className="text-gray-600 mb-1"><strong>Certifications:</strong> {tutor.certifications?.join(', ')}</p>
//             <p className="text-gray-600 mb-1"><strong>Experience:</strong> {tutor.experience} years</p>
//             <p className="text-gray-600 mb-1"><strong>Teaching Mode:</strong> {tutor.teachingMode}</p>
//             <p className="text-gray-600 mb-1"><strong>Availability:</strong> {tutor.availability?.join(', ') || 'N/A'}</p>
//             <p className="text-gray-600 mb-1"><strong>Hourly Rate:</strong> ${tutor.hourlyRate}</p>
//             <p className="text-gray-600 mb-1"><strong>Status:</strong> {tutor.status}</p>
//             <p className="text-gray-600 mb-1"><strong>Bio:</strong> {tutor.bio}</p>
//             <button
//               onClick={handleBookTutor}
//               className="btn btn-primary mt-4"
//             >
//               Book Tutor
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDetails;


// import { useQuery } from '@tanstack/react-query';
// import { useParams, useNavigate } from 'react-router-dom';
// import { useContext } from 'react';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';
// import { AuthContext } from '../../../providers/AuthProvider';

// const TeacherDetails = () => {
//   const { tutorId } = useParams();
//   const axiosSecure = useAxiosSecure();
//   const navigate = useNavigate();
//   const { user } = useContext(AuthContext);

//   const { data: tutor, isLoading, error } = useQuery({
//     queryKey: ['tutor', tutorId],
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/tutors/${tutorId}`);
//       return res.data;
//     },
//   });

  
  

//   const handleBookTutor = async () => {
//   if (!user) {
//     alert('Please log in to book a tutor.');
//     navigate('/login');
//     return;
//   }

//   try {
//     const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
//     const alreadyBooked = existingBooking.data.find(
//       (item) => item.tutorId === tutor._id
//     );

//     if (alreadyBooked) {
//       alert('You have already booked this tutor.');
//       return;
//     }

//     await axiosSecure.post('/carts', {
//       email: user.email,
//       tutorId: tutor._id,
//       tutorName: tutor.name,
//       subject: tutor.subjects?.[0] || 'Not specified',
//       price: tutor.hourlyRate,
//       status: 'Pending',
//     });

//     alert('Tutor booked successfully!');
//     navigate('/dashboard/my-bookings');
//   } catch (error) {
//     console.error('Error booking tutor:', error);
//     alert('Failed to book tutor.');
//   }
// };


//   if (isLoading) return <div className="text-center py-20">Loading...</div>;
//   if (error) return <div className="text-center text-red-500 py-10">Error: {error.message}</div>;
//   if (!tutor) return <div className="text-center py-10">Tutor not found</div>;

//   return (
//     <div className="p-6 max-w-5xl mx-auto bg-[#f5f8ff] min-h-screen">
//       <button
//         onClick={() => navigate(-1)}
//         className="btn btn-outline btn-sm mb-6 border-gray-300 text-gray-700 hover:bg-gray-100"
//       >
//         Back
//       </button>
//       <div className="bg-white rounded-2xl shadow-lg p-8">
//         <div className="flex flex-col md:flex-row gap-8">
//           <img
//             src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
//             alt={tutor.name}
//             className="w-full md:w-1/3 h-64 object-cover rounded-lg"
//           />
//           <div className="flex-1">
//             <h2 className="text-3xl font-bold text-gray-800 mb-4">{tutor.name}</h2>
//             <div className="space-y-2">
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">📧</span>
//                 <strong>Email:</strong> {tutor.email}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">📞</span>
//                 <strong>Phone:</strong> {tutor.contactNumber}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">🎂</span>
//                 <strong>Date of Birth:</strong> {tutor.dateOfBirth}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">👤</span>
//                 <strong>Gender:</strong> {tutor.gender}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">📚</span>
//                 <strong>Subjects:</strong> {tutor.subjects?.join(', ') || 'N/A'}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">💼</span>
//                 <strong>Experience:</strong> {tutor.experience} years
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">🏫</span>
//                 <strong>Teaching Mode:</strong> {tutor.teachingMode}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">⏰</span>
//                 <strong>Availability:</strong> {tutor.availability?.join(', ') || 'N/A'}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">💵</span>
//                 <strong>Hourly Rate:</strong> ${tutor.hourlyRate}
//               </p>
//               <p className="text-gray-600 flex items-center">
//                 <span className="mr-2">✅</span>
//                 <strong>Status:</strong> {tutor.status}
//               </p>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Education</h3>
//               <div className="space-y-4">
//                 <div className="border-t border-dashed pt-4">
//                   <p className="font-medium text-gray-800">{tutor.educationalQualifications}</p>
//                   <div className="flex items-center text-gray-500 text-sm mt-1">
//                     <span className="mr-2">🏫</span>
//                     <span>{tutor.institution}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Certifications</h3>
//               <p className="text-gray-600">{tutor.certifications?.join(', ')}</p>
//             </div>
//             <div className="mt-6">
//               <h3 className="text-xl font-semibold text-gray-800 mb-2">Bio</h3>
//               <p className="text-gray-600">{tutor.bio}</p>
//             </div>
//             <button
//               onClick={handleBookTutor}
//               className="btn btn-primary mt-6 bg-purple-600 hover:bg-purple-700 text-white border-none"
//             >
//               Book Tutor
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TeacherDetails;


import { useQuery } from '@tanstack/react-query';
import { useParams, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { AuthContext } from '../../../providers/AuthProvider';
import { FaGlobe, FaUserGraduate, FaClock, FaDollarSign, FaBook, FaChalkboardTeacher, FaStar, FaMapMarkerAlt, FaLanguage } from 'react-icons/fa';

const TeacherDetails = () => {
  const { tutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const { data: tutor, isLoading: tutorLoading, error: tutorError } = useQuery({
    queryKey: ['tutor', tutorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/tutors/${tutorId}`);
      return res.data;
    },
  });

  const { data: ratings, isLoading: ratingsLoading, error: ratingsError } = useQuery({
    queryKey: ['ratings', tutorId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/ratings/${tutorId}`);
      return res.data;
    },
  });

  const handleBookTutor = async () => {
    if (!user) {
      alert('Please log in to book a tutor.');
      navigate('/login');
      return;
    }

    try {
      const existingBooking = await axiosSecure.get(`/carts?email=${user.email}`);
      const alreadyBooked = existingBooking.data.find((item) => item.tutorId === tutor._id);

      if (alreadyBooked) {
        alert('You have already booked this tutor.');
        return;
      }

      await axiosSecure.post('/carts', {
        email: user.email,
        tutorId: tutor._id,
        tutorName: tutor.name,
        subject: tutor.subjects?.[0] || 'Not specified',
        price: tutor.hourlyRate,
        status: 'Pending',
      });

      alert('Tutor booked successfully!');
      navigate('/dashboard/my-bookings');
    } catch (error) {
      console.error('Error booking tutor:', error);
      alert('Failed to book tutor.');
    }
  };

  if (tutorLoading || ratingsLoading) return <div className="text-center py-20">Loading...</div>;
  if (tutorError) return <div className="text-center text-red-500 py-10">Error: {tutorError.message}</div>;
  if (!tutor) return <div className="text-center py-10">Tutor not found</div>;

  return (
    <div className="p-6 max-w-6xl mx-auto min-h-screen bg-gradient-to-br from-white to-[#f5f8ff]">
      <button
        onClick={() => navigate(-1)}
        className="btn btn-sm mb-6 border border-gray-300 text-gray-600 hover:bg-gray-100"
      >
        ⬅ Back
      </button>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Panel - Image */}
        <div className="md:w-1/3 bg-[#f3f6fd] p-6 flex items-center justify-center">
          <img
            src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
            alt="Tutor"
            className="rounded-xl w-full h-64 object-cover"
          />
        </div>

        {/* Right Panel - Info */}
        <div className="flex-1 p-8 space-y-4">
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
              <FaMapMarkerAlt /> {tutor.location || "Unknown Location"}
            </span>
            <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full">
              <FaClock /> {tutor.experience} yrs Experience
            </span>
            <span className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full">
              <FaDollarSign /> ${tutor.hourlyRate}/hr
            </span>
            <span className="inline-flex items-center gap-1 bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
              <FaBook /> {tutor.subjects?.join(', ') || 'No Subjects'}
            </span>
          </div>

          <p className="text-lg text-gray-800 font-medium italic">“{tutor.bio}”</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Education</h3>
              <p className="text-gray-600">{tutor.educationalQualifications}</p>
              <p className="text-sm text-gray-500">{tutor.institution}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Certifications</h3>
              <p className="text-gray-600">{tutor.certifications?.join(', ') || 'N/A'}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Teaching Mode</h3>
              <p className="text-gray-600">{tutor.teachingMode}</p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Languages</h3>
              <p className="text-gray-600">
                {tutor.languages?.join(', ') || 'English, +2 more'}
              </p>
            </div>
          </div>

          <div className="pt-4 border-t border-dashed">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Ratings & Reviews</h3>
            {ratingsError && <p className="text-red-500">Failed to load reviews.</p>}
            {ratings && ratings.length > 0 ? (
              <div className="space-y-3">
                {ratings.map((r, idx) => (
                  <div key={idx} className="border rounded-md p-3 text-sm text-gray-700 bg-gray-50">
                    <p className="flex items-center gap-1 font-medium">
                      <FaStar className="text-yellow-500" /> {r.rating}/5
                    </p>
                    <p>{r.comment}</p>
                    <p className="text-gray-500 text-xs mt-1">by {r.studentEmail} | {new Date(r.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No reviews yet.</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            <button
              onClick={handleBookTutor}
              className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-all"
            >
              Book a Tuition
            </button>
            <button className="border border-purple-600 text-purple-600 px-5 py-2 rounded-full hover:bg-purple-50">
              Let's Talk Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDetails;
