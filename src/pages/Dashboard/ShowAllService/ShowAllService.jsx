import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Create SweetAlert2 instance with React support
const MySwal = withReactContent(Swal);

// Skeleton loader for a single service card
const ServiceCardSkeleton = () => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
    <div className="p-6 space-y-2">
      <div className="h-6 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
    </div>
  </div>
);

// ServiceCard component
const ServiceCard = ({ service }) => {
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  // Mutation for deleting a service
  const deleteServiceMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosSecure.delete(`/services/${id}`);
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['services']);
      MySwal.fire({
        icon: 'success',
        title: 'Success',
        text: data.message || 'Service deleted successfully',
        confirmButtonColor: '#3085d6',
      });
    },
    onError: (err) => {
      console.error('Error deleting service:', err);
      const errorMessage = err.response?.data?.message || 'Failed to delete service';
      MySwal.fire({
        icon: 'error',
        title: 'Error',
        text: errorMessage,
        confirmButtonColor: '#d33',
      });
    },
  });

  // Handle delete button click
  const handleDelete = (id) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this service?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteServiceMutation.mutate(id);
      }
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 duration-300">
      <div className="p-6 space-y-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {service.subject || 'Not specified'}
        </h3>
        <p>
          <strong>Tutor:</strong> {service.tutorName || 'Not specified'}
        </p>
        <p>
          <strong>Email:</strong> {service.tutorEmail || 'Not specified'}
        </p>
        <p>
          <strong>Teaching Mode:</strong> {service.teachingMode || 'Not specified'}
        </p>
        <p>
          <strong>Hourly Rate:</strong> ${service.hourlyRate || 'Not specified'}
        </p>
        <p>
          <strong>Location:</strong>{' '}
          {service.location || service.teachingMode === 'Online' ? 'Online' : 'Not specified'}
        </p>
        <p>
          <strong>Availability:</strong> {service.availability || 'Not specified'}
        </p>
        <p>
          <strong>Description:</strong> {service.description || 'Not specified'}
        </p>
        <p>
          <strong>Created At:</strong>{' '}
          {service.createdAt
            ? new Date(service.createdAt).toLocaleString('en-US', {
                timeZone: 'Asia/Dhaka',
              })
            : 'Not specified'}
        </p>
        <button
          onClick={() => handleDelete(service._id)}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors"
          disabled={deleteServiceMutation.isLoading}
        >
          {deleteServiceMutation.isLoading ? 'Deleting...' : 'Delete Service'}
        </button>
      </div>
    </div>
  );
};

// ShowAllService component
const ShowAllService = () => {
  const axiosSecure = useAxiosSecure();

  const { data: services = [], isLoading, error } = useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      try {
        const response = await axiosSecure.get('/services/all');
        return response.data;
      } catch (err) {
        console.error('Error fetching services:', err);
        throw err;
      }
    },
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
          All Services
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {Array(3).fill(0).map((_, index) => (
            <ServiceCardSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error.message || 'Failed to fetch services.'}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-10 text-center text-gray-800">
        All Services
      </h2>
      {services.length === 0 ? (
        <p className="text-center text-gray-500">No services found.</p>
      ) : (
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowAllService;