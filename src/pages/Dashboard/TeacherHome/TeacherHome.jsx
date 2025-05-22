import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../providers/AuthProvider";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBook, FaClock, FaMapMarkerAlt, FaDollarSign, FaUserTie, FaEnvelope, FaPhone, FaCalendar, FaUniversity, FaChalkboardTeacher, FaCertificate } from "react-icons/fa";

const TeacherHome = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && user?.email) {
      axiosSecure
        .get("/tutors")
        .then((res) => {
          const matchedTutor = res.data.find(
            (tutor) => tutor.email === user.email
          );
          setProfile(matchedTutor || null);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching tutors:", err);
          setIsLoading(false);
        });
    }
  }, [loading, user, axiosSecure]);

  if (loading || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-[#70C5D7]"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="text-[#DA3A60] text-xl font-semibold mb-2">Profile Not Found</div>
        <p className="text-[#005482]">No tutor profile found for {user.email}</p>
      </div>
    );
  }

  const sections = [
    {
      title: "Personal Information",
      icon: <FaUserTie className="text-[#70C5D7]" />,
      items: [
        { icon: <FaEnvelope className="text-[#005482]" />, label: "Email", value: profile.email },
        { icon: <FaCalendar className="text-[#005482]" />, label: "Date of Birth", value: profile.dateOfBirth },
        { icon: <FaPhone className="text-[#005482]" />, label: "Contact", value: profile.contactNumber },
        { icon: <FaMapMarkerAlt className="text-[#DA3A60]" />, label: "Location", value: profile.location },
      ],
    },
    {
      title: "Academic Information",
      icon: <FaGraduationCap className="text-[#70C5D7]" />,
      items: [
        { icon: <FaUniversity className="text-[#005482]" />, label: "Institution", value: profile.institution },
        { icon: <FaBook className="text-[#005482]" />, label: "Subjects", value: profile.subjects?.join(", ") },
        { icon: <FaGraduationCap className="text-[#005482]" />, label: "Qualifications", value: profile.educationalQualifications },
        { icon: <FaUserTie className="text-[#005482]" />, label: "Experience", value: `${profile.experience} years` },
      ],
    },
    {
      title: "Teaching Details",
      icon: <FaChalkboardTeacher className="text-[#70C5D7]" />,
      items: [
        { icon: <FaClock className="text-[#005482]" />, label: "Availability", value: profile.availability?.join(", ") },
        { icon: <FaDollarSign className="text-[#FCBB45]" />, label: "Hourly Rate", value: `$${profile.hourlyRate}` },
        { icon: <FaBook className="text-[#005482]" />, label: "Teaching Mode", value: profile.teachingMode },
        { icon: <FaCertificate className="text-[#005482]" />, label: "Certifications", value: profile.certifications?.join(", ") },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ffffff] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Profile Info */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-6">
              <div className="bg-[#70C5D7] p-8 text-center relative">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden shadow-lg mx-auto">
                    <img
                      src={profile.photoURL || "https://i.ibb.co/0jqHpnp/default-user.png"}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                                     <div className="absolute -bottom-2 right-0 bg-[#4ade80] text-[#ffffff] px-3 py-1 rounded-full text-sm font-medium">
                     Active
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-white mt-4 mb-2">{profile.name}</h1>
                <div className="flex flex-wrap gap-2 justify-center">
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    Professional Educator
                  </span>
                  <span className="bg-white bg-opacity-20 text-white px-3 py-1 rounded-full text-sm">
                    {profile.teachingMode}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <FaEnvelope className="text-[#005482]" />
                    <span className="text-gray-600">{profile.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaPhone className="text-[#005482]" />
                    <span className="text-gray-600">{profile.contactNumber}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaMapMarkerAlt className="text-[#DA3A60]" />
                    <span className="text-gray-600">{profile.location}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-100">
                  <h3 className="text-lg font-semibold text-[#005482] mb-4">About Me</h3>
                  <p className="text-gray-600 leading-relaxed">
                    {profile.bio || "No bio available"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Sections */}
          <div className="lg:col-span-8 space-y-6">
            {/* Stats Section - Moved to top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-6"
            >
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg">
                    <FaUserTie className="text-[#70C5D7] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#70C5D7]">{profile.experience}</div>
                    <div className="text-[#005482] font-medium text-sm">Years Experience</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#DA3A60] bg-opacity-10 rounded-lg">
                    <FaDollarSign className="text-[#DA3A60] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#DA3A60]">${profile.hourlyRate}</div>
                    <div className="text-[#005482] font-medium text-sm">Hourly Rate</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-[#FCBB45] bg-opacity-10 rounded-lg">
                    <FaBook className="text-[#FCBB45] text-xl" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-[#FCBB45]">{profile.subjects?.length || 0}</div>
                    <div className="text-[#005482] font-medium text-sm">Subjects</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: (index + 1) * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-100">
                    <div className="p-3 bg-[#70C5D7] bg-opacity-10 rounded-lg">
                      {section.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-[#005482]">
                      {section.title}
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {section.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className="mt-1">{item.icon}</div>
                        <div>
                          <div className="text-sm font-medium text-gray-500">
                            {item.label}
                          </div>
                          <div className="text-[#005482] font-medium">
                            {item.value || "Not specified"}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHome;
