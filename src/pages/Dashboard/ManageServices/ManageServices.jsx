import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageServices = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    subject: "",
    teachingMode: "Online",
    hourlyRate: "",
    availability: "",
    location: "",
    description: "",
  });
  const [editServiceId, setEditServiceId] = useState(null);

  // Fetch user's services
  useEffect(() => {
    if (user?.email) {
      axiosSecure
        .get(`/services/all`)
        .then((res) => {
          const userServices = res.data.filter((s) => s.tutorEmail === user.email);
          setServices(userServices);
        })
        .catch((err) => {
          console.error("Error fetching services:", err);
          Swal.fire("Error", "Failed to load services", "error");
        });
    }
  }, [user, axiosSecure]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newService = {
      tutorEmail: user.email,
      tutorName: user.displayName || "Unknown",
      subject: formData.subject,
      teachingMode: formData.teachingMode,
      hourlyRate: parseFloat(formData.hourlyRate) || 0,
      availability: formData.availability,
      location:
        formData.teachingMode === "Online" ? null : formData.location || "Not specified",
      description: formData.description,
      createdAt: editServiceId ? undefined : new Date().toISOString(),
    };

    try {
      if (editServiceId) {
        const res = await axiosSecure.put(`/services/${editServiceId}`, newService);
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Service updated!", "success");
          setServices((prev) =>
            prev.map((s) =>
              s._id === editServiceId
                ? { ...newService, _id: editServiceId, updatedAt: new Date().toISOString() }
                : s
            )
          );
          setEditServiceId(null);
        }
      } else {
        const res = await axiosSecure.post("/services", newService);
        if (res.data.insertedId) {
          Swal.fire("Success", "Service added!", "success");
          setServices((prev) => [
            ...prev,
            {
              ...newService,
              _id: res.data.insertedId,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ]);
        }
      }

      // Reset form
      setFormData({
        subject: "",
        teachingMode: "Online",
        hourlyRate: "",
        availability: "",
        location: "",
        description: "",
      });
    } catch (err) {
      console.error("Error saving service:", err);
      Swal.fire("Error", err.response?.data?.message || "Failed to save service", "error");
    }
  };

  const handleEdit = (service) => {
    setFormData({
      subject: service.subject,
      teachingMode: service.teachingMode,
      hourlyRate: service.hourlyRate.toString(),
      availability: service.availability,
      location: service.location || "",
      description: service.description,
    });
    setEditServiceId(service._id);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/services/${id}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "Your service has been deleted.", "success");
          setServices((prev) => prev.filter((s) => s._id !== id));
        }
      } catch (err) {
        console.error("Error deleting service:", err);
        Swal.fire("Error", err.response?.data?.message || "Failed to delete service", "error");
      }
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return "N/A";
    return new Date(isoString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Manage Services</h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-base-200 p-6 rounded-md shadow mb-10">
        <input
          name="subject"
          type="text"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <select
          name="teachingMode"
          value={formData.teachingMode}
          onChange={handleChange}
          className="select select-bordered w-full"
        >
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Both">Both</option>
        </select>

        <input
          name="hourlyRate"
          type="number"
          placeholder="Hourly Rate (USD)"
          value={formData.hourlyRate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="availability"
          type="text"
          placeholder="Availability"
          value={formData.availability}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />

        <input
          name="location"
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="input input-bordered w-full"
          required={formData.teachingMode !== "Online"}
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button type="submit" className="btn btn-primary w-full">
          {editServiceId ? "Update Service" : "Add Service"}
        </button>
      </form>

      <div className="space-y-6">
        {services.map((service) => (
          <div key={service._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h3 className="card-title">{service.subject || "Untitled"}</h3>
              <p>
                <strong>Mode:</strong> {service.teachingMode}
              </p>
              <p>
                <strong>Rate:</strong> ${service.hourlyRate}/hr
              </p>
              <p>
                <strong>Availability:</strong> {service.availability || "Not specified"}
              </p>
              {service.location && (
                <p>
                  <strong>Location:</strong> {service.location}
                </p>
              )}
              <p>
                <strong>Description:</strong> {service.description || "No description"}
              </p>
              <p>
                <strong>Created:</strong> {formatDate(service.createdAt)}
              </p>
              <p>
                <strong>Updated:</strong> {formatDate(service.updatedAt)}
              </p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleEdit(service)}
                  className="btn btn-secondary btn-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(service._id)}
                  className="btn btn-error btn-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageServices;
