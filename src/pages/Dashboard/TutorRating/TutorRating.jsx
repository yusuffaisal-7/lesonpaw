import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const TutorRating = () => {
  const { user } = useContext(AuthContext);
  const { tutorId: paramTutorId } = useParams();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  const [tutors, setTutors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const res = await axiosSecure.get('/tutors');
        setTutors(res.data);
      } catch (error) {
        console.error('Failed to fetch tutors', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTutors();
  }, [axiosSecure]);

  const onSubmit = async (data) => {
    const ratingData = {
      tutorId: data.selectedTutor || paramTutorId,
      studentEmail: user.email,
      rating: parseInt(data.rating),
      comment: data.comment,
    };

    try {
      const res = await axiosSecure.post('/ratings', ratingData);
      if (res.data.success) {
        Swal.fire({
          icon: 'success',
          title: 'Rating Submitted',
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error('Rating submission failed', error);
      Swal.fire({
        icon: 'error',
        title: 'Error submitting rating',
        text: error.message || 'Something went wrong!',
      });
    }
  };

  return (
    <section className="w-full py-12 md:py-16 lg:py-20 bg-gray-50">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">
          Rate Your Tutor
        </h2>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-6">
            {!paramTutorId && (
              <div className="space-y-2">
                <label className="text-gray-700 font-medium block">Select Tutor</label>
                <select 
                  {...register('selectedTutor', { required: true })} 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">-- Choose a Tutor --</option>
                  {loading ? (
                    <option disabled>Loading tutors...</option>
                  ) : (
                    tutors.map((tutor) => (
                      <option key={tutor._id} value={tutor._id}>
                        {tutor.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-gray-700 font-medium block">Rating (1-5)</label>
              <input
                {...register('rating', { required: true, min: 1, max: 5 })}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-gray-700 font-medium block">Comment</label>
              <textarea 
                {...register('comment')} 
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
            >
              Submit Rating
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TutorRating;
