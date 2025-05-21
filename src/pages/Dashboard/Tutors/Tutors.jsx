import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { 
  FaGraduationCap, FaChalkboardTeacher, FaClock, FaDollarSign, 
  FaMapMarkerAlt, FaEnvelope, FaPhone, FaEdit, FaTrash, FaEye,
  FaFilter, FaSearch, FaSortAmountDown, FaSortAmountUp
} from 'react-icons/fa';

const Tutors = () => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const [editingTutor, setEditingTutor] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [tutorToDelete, setTutorToDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const { data: tutors = [], isLoading, error } = useQuery({
    queryKey: ['tutors', searchQuery, filterStatus, sortField, sortOrder],
    queryFn: async () => {
      const res = await axiosSecure.get('/tutors', {
        params: { search: searchQuery, status: filterStatus, sort: sortField, order: sortOrder }
      });
      return res.data;
    },
  });

  const updateTutorMutation = useMutation({
    mutationFn: async (tutorData) =>
      (await axiosSecure.put(`/tutors/${tutorData._id}`, tutorData)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['tutors']);
      setEditingTutor(null);
    },
    onError: (error) => {
      console.error('Error updating tutor:', error);
      alert(`Failed to update tutor: ${error.response?.data?.message || error.message}`);
    },
  });

  const deleteTutorMutation = useMutation({
    mutationFn: async (tutorId) => (await axiosSecure.delete(`/tutors/${tutorId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries(['tutors']);
      setIsDeleteConfirmOpen(false);
      setTutorToDelete(null);
    },
    onError: (error) => {
      console.error('Error deleting tutor:', error);
      alert(`Failed to delete tutor: ${error.response?.data?.message || error.message}`);
    },
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('asc');
    }
  };

  const handleDelete = (tutor) => {
    setTutorToDelete(tutor);
    setIsDeleteConfirmOpen(true);
  };

  const confirmDelete = () => {
    deleteTutorMutation.mutate(tutorToDelete._id);
  };

  const filteredTutors = tutors.filter(tutor => {
    const matchesSearch = tutor.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tutor.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || tutor.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const SkeletonCard = () => (
    <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
      <div className="space-y-3">
        <div className="h-3 bg-gray-200 rounded w-full"></div>
        <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        <div className="h-3 bg-gray-200 rounded w-4/6"></div>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
        <div className="h-8 w-20 bg-gray-200 rounded"></div>
      </div>
    </div>
  );

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <div className="text-red-500 text-xl mb-2">Error Loading Tutors</div>
          <p className="text-gray-600">{error.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[var(--color-text-dark)] mb-2">
            Manage Tutors
          </h2>
          <p className="text-gray-600">
            Total Tutors: {tutors.length}
          </p>
        </div>

        {/* Controls Section */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search tutors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
            </div>
            <div className="flex gap-4 w-full md:w-auto">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
                    <button
                onClick={() => handleSort('name')}
                className="flex items-center gap-2 px-4 py-2 bg-[var(--color-text-dark)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
                    >
                {sortOrder === 'asc' ? <FaSortAmountUp /> : <FaSortAmountDown />}
                Sort
                    </button>
            </div>
          </div>
        </div>

        {/* Tutors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            Array(6).fill(0).map((_, index) => <SkeletonCard key={index} />)
          ) : filteredTutors.length === 0 ? (
            <div className="col-span-full text-center py-10">
              <p className="text-gray-500 text-lg">No tutors found matching your criteria.</p>
            </div>
          ) : (
            filteredTutors.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-[var(--color-text-dark)] flex items-center justify-center text-white text-xl font-semibold">
                      {tutor.name?.charAt(0).toUpperCase() || "T"}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-[var(--color-text-dark)] mb-1">{tutor.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <FaEnvelope className="text-gray-400" />
                        <span>{tutor.email}</span>
                      </div>
                      {tutor.contactNumber && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FaPhone className="text-gray-400" />
                          <span>{tutor.contactNumber}</span>
              </div>
                      )}
    </div>
  </div>

                  {/* Status Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      tutor.status === 'active'
                        ? 'bg-green-100 text-green-800'
                        : tutor.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {tutor.status?.charAt(0).toUpperCase() + tutor.status?.slice(1) || 'Status N/A'}
        </span>
    </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <FaGraduationCap className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{tutor.educationalQualifications || 'Qualification N/A'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaChalkboardTeacher className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{tutor.experience || '0'} years exp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaDollarSign className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">${tutor.hourlyRate?.toFixed(2) || '0'}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <FaClock className="text-[var(--color-text-dark)]" />
                      <span className="text-gray-600">{tutor.teachingMode || 'Mode N/A'}</span>
    </div>
  </div>

                  {/* Subjects */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Subjects:</h4>
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects && tutor.subjects.length > 0 ? (
                        tutor.subjects.map((subject, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-[var(--color-text-dark)] text-white rounded-full text-xs font-medium"
                          >
                            {subject}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-500">No subjects listed</span>
                      )}
                    </div>
  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Link
                      to={`/dashboard/tutors/${tutor._id}`}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-text-dark)] text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                >
                      <FaEye className="text-xs" />
                      <span>View</span>
                </Link>
                    <button
                      onClick={() => setEditingTutor(tutor)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[#70C5D7] text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                    >
                      <FaEdit className="text-xs" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(tutor)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-[var(--color-cta)] text-white rounded-lg text-sm hover:bg-opacity-90 transition-colors"
                    >
                      <FaTrash className="text-xs" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
          </div>
      </div>

      {/* Edit Modal */}
      {editingTutor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-2xl font-bold text-[var(--color-text-dark)] mb-6">Edit Tutor</h3>
            <Formik
              initialValues={{
                name: editingTutor.name || '',
                email: editingTutor.email || '',
                subjects: editingTutor.subjects?.join(', ') || '',
                educationalQualifications: editingTutor.educationalQualifications || '',
                experience: editingTutor.experience || 0,
                hourlyRate: editingTutor.hourlyRate || 0,
                teachingMode: editingTutor.teachingMode || '',
                availability: editingTutor.availability?.join(', ') || '',
                bio: editingTutor.bio || '',
                photoURL: editingTutor.photoURL || '',
                status: editingTutor.status || 'active',
                contactNumber: editingTutor.contactNumber || '',
              }}
              onSubmit={(values) => {
                const tutorData = {
                  _id: editingTutor._id,
                    ...values,
                  subjects: values.subjects.split(',').map(s => s.trim()),
                    availability: values.availability.split(',').map(a => a.trim()),
                  experience: parseInt(values.experience),
                  hourlyRate: parseFloat(values.hourlyRate),
                };
                updateTutorMutation.mutate(tutorData);
              }}
            >
              {({ isSubmitting }) => (
                  <Form className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                      <Field
                        name="name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Subjects (comma-separated)</label>
                      <Field
                        name="subjects"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Educational Qualifications</label>
                      <Field
                        name="educationalQualifications"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                      <Field
                        name="experience"
                        type="number"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Hourly Rate ($)</label>
                      <Field
                        name="hourlyRate"
                        type="number"
                        step="0.01"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Teaching Mode</label>
                      <Field
                        name="teachingMode"
                        as="select"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      >
                        <option value="">Select Mode</option>
                        <option value="Online">Online</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Both">Both</option>
                      </Field>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <Field
                        name="status"
                        as="select"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      >
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="inactive">Inactive</option>
                      </Field>
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Availability (comma-separated)</label>
                      <Field
                        name="availability"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                      <Field
                        name="bio"
                        as="textarea"
                        rows="3"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                      <Field
                        name="photoURL"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                      <Field
                        name="contactNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-text-dark)]"
                      />
                    </div>
                    <div className="col-span-2 flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={() => setEditingTutor(null)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-4 py-2 bg-[var(--color-text-dark)] text-white rounded-lg hover:bg-opacity-90 disabled:opacity-50"
                      >
                        Save Changes
                      </button>
                  </div>
                </Form>
              )}
            </Formik>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {tutorToDelete?.name}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsDeleteConfirmOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-[var(--color-cta)] text-white rounded-lg hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tutors;



