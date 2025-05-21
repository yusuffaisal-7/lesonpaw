import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Teacher = () => {
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const { data: tutors = [], isLoading, error } = useQuery({
    queryKey: ['tutors'],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors');
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <section className="full-width-section bg-gray-50">
        <div className="section-container py-20">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="full-width-section bg-gray-50">
        <div className="section-container py-10">
          <div className="text-center text-red-500">
            Error: {error.message}
          </div>
        </div>
      </section>
    );
  }

  const displayedTutors = tutors.slice(0, 6);

  return (
    <section className="full-width-section bg-gray-50">
      <div className="section-container py-12 md:py-16 lg:py-20">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-12 text-center text-gray-800">
          Meet Our Expert Tutors
        </h2>
        <div className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {displayedTutors.map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/tutor/${tutor._id}`)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate(`/tutor/${tutor._id}`)}
            >
              <div className="relative">
                <img
                  src={tutor.photoURL || 'https://i.ibb.co.com/gxzxFJk/profile12.jpg'}
                  alt={tutor.name || 'Tutor'}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                  onError={(e) => (e.target.src = 'https://via.placeholder.com/400x250?text=No+Image')}
                />
                <span
                  className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${
                    tutor.status === 'active'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {tutor.status?.charAt(0).toUpperCase() + tutor.status?.slice(1) || 'Active'}
                </span>
              </div>
              <div className="p-5 space-y-3">
                <h3 className="text-xl font-bold text-gray-800 truncate">{tutor.name || 'Unnamed Tutor'}</h3>
                <p className="text-sm text-gray-500">📧 {tutor.email || 'Not provided'}</p>
                <p className="text-sm text-gray-500">
                  🎓 Subjects: {tutor.subjects?.join(', ') || 'Not specified'}
                </p>
                <p className="text-sm text-gray-500">
                  🎓 Qualification: {tutor.educationalQualifications || 'Not provided'}
                </p>
                <p className="text-sm text-gray-500">
                  💼 Experience: {tutor.experience || 0} years
                </p>
                <p className="text-sm text-gray-500">
                  💰 Rate: ${tutor.hourlyRate?.toFixed(2) || 'N/A'}/hr
                </p>
                <p className="text-sm text-gray-500">
                  📚 Mode: {tutor.teachingMode || 'Not specified'}
                </p>
                <p className="text-sm text-gray-600 line-clamp-2">{tutor.bio || 'No bio available'}</p>
              </div>
            </div>
          ))}
        </div>
        {tutors.length > 6 && (
          <div className="text-center mt-10">
            <button
              onClick={() => navigate('/dashboard/tutor')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
            >
              Show All Tutors
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Teacher;

