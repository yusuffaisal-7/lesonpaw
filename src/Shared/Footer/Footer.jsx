import React from "react";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="full-width-section" style={{ backgroundColor: "var(--color-text-dark)" }}>
      <div className="section-container py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">LesonPaw</h2>
            <p className="text-sm md:text-base text-white">
              Organize your tasks efficiently and boost productivity with our seamless task management system.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/about" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/blog" 
                  className="text-sm md:text-base text-white hover:text-[var(--color-hero)] transition-colors inline-block"
                >
                  Blog
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="text-center sm:text-left space-y-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Contact Us</h2>
            <div className="space-y-2 text-sm md:text-base text-white">
              <p className="flex items-center gap-2">
                <span>📧</span> rayhanahmed.nstu@gmail.com
              </p>
              <p className="flex items-center gap-2">
                <span>📞</span> +123 456 7890
              </p>
              <p className="flex items-center gap-2">
                <span>📍</span> 123 Farmgate, Dhaka
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 mt-8 md:mt-12 pt-4 text-sm text-center text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p>&copy; {new Date().getFullYear()} LessonPaw. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-[var(--color-hero)] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[var(--color-hero)] transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

// import { useContext, useState } from "react";
// import useAxiosPublic from "../../hooks/UseAxiosPublic";
// import { AuthContext } from "../../providers/AuthProvider";

// const Footer = () => {
//   const [message, setMessage] = useState("");
//    const { user } = useContext(AuthContext); 
//   const axiosSecure = useAxiosPublic();

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) {
//       return Swal.fire("Error", "Please enter a message", "error");
//     }
//     try {
//       await axiosSecure.post("/send-message", {
//         message,
//         email: user?.email,
//       });
//       setMessage("");
//       Swal.fire("Sent", "Message sent", "success");
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Failed to send message",
//         "error"
//       );
//     }
//   };

//   return (
//     <footer className="bg-base-200 text-base-content p-10">
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
//         {/* Footer Columns */}
//         <div>
//           <span className="footer-title">Services</span>
//           <a className="link link-hover">Branding</a>
//           <a className="link link-hover">Design</a>
//           <a className="link link-hover">Marketing</a>
//           <a className="link link-hover">Advertisement</a>
//         </div>
//         <div>
//           <span className="footer-title">Company</span>
//           <a className="link link-hover">About us</a>
//           <a className="link link-hover">Contact</a>
//           <a className="link link-hover">Jobs</a>
//           <a className="link link-hover">Press kit</a>
//         </div>
//         <div>
//           <span className="footer-title">Legal</span>
//           <a className="link link-hover">Terms of use</a>
//           <a className="link link-hover">Privacy policy</a>
//           <a className="link link-hover">Cookie policy</a>
//         </div>

//         {/* Job Form Preview */}
//         <div className="mt-10 md:mt-0">
//           <h3 className="text-xl font-semibold mb-2">Job Form Preview</h3>
//           <img
//             src="https://via.placeholder.com/600x400.png?text=Job+Form+Preview"
//             alt="Job Form Preview"
//             className="w-full h-auto rounded-lg shadow-md"
//           />
//           <form onSubmit={handleSendMessage} className="space-y-3 mt-4">
//             <textarea
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               className="textarea textarea-bordered w-full"
//               placeholder="Write a message..."
//               rows={3}
//             />
//             <button type="submit" className="btn btn-secondary">
//               Send Message
//             </button>
//           </form>
//         </div>
//       </div>

//       <div className="mt-10 text-center text-sm">
//         © {new Date().getFullYear()} Your Company. All rights reserved.
//       </div>
//     </footer>
//   );
// };

// export default Footer;
