


// import React, { useContext } from "react";

// import { useForm } from "react-hook-form";

// import { Link, useNavigate } from "react-router-dom";
// import Swal from "sweetalert2";

// import { AuthContext } from "../providers/AuthProvider";
// import SocialLogin from "../components/SocialLogin";
// import useAxiosPublic from "../hooks/UseAxiosPublic";



// const SignUp = () => {
//   const axiosPublic = useAxiosPublic();
//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   const {createUser,updateUserProfile} = useContext(AuthContext);
//   const navigate = useNavigate();

  
//   const onSubmit = (data) => {
//     createUser(data.email, data.password)
//     .then(result => {
//         const loggedUser = result.user;
//         console.log("User Created:", loggedUser);

//         updateUserProfile(data.name, data.photoURL)
//         .then(() => {
//             console.log("User profile info updated");

            
//             const userInfo = {
//                 uid: loggedUser.uid, 
//                 name: data.name,
//                 email: data.email,
//                 photoURL: data.photoURL
//             };

//             axiosPublic.post('/users', userInfo)
//             .then(res => {
//                 if (res.data.insertedId) {
//                     console.log("User added to the database");
//                     reset();
//                     Swal.fire({
//                         position: "top-end",
//                         icon: "success",
//                         title: "User Created Successfully",
//                         showConfirmButton: false,
//                         timer: 1500
//                     });
//                     navigate('/');
//                 }
//             })
//             .catch(error => console.log("Database Error:", error));

//         })
//         .catch(error => console.log("Profile Update Error:", error));
//     })
//     .catch(error => console.log("Create User Error:", error));
// };

//   return (
//     <div className="hero   card bg-base-100 shadow-2xl card-body ">
//       <div className="hero-content flex-col md:flex-row-reverse gap-5">
//         <div className="text-center lg:text-left">
//           <h1 className="text-5xl font-bold">Sign Up</h1>
//           {/* <Lottie
//             animationData={signUpLottieData}
//             style={{ width: "300px", height: "300px" }}
//           ></Lottie> */}
//         </div>
//         <div className="  md:w-1/2 max-w-sm">
//           <form onSubmit={handleSubmit(onSubmit)} className="">
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Name</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Name"
//                 name="name"
//                 {...register("name", { required: true })}
//                 className="input input-bordered"
//               />
//               {errors.name && (
//                 <span className="text-red-500">name is required</span>
//               )}
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Photo URL</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="photoURL"
//                 name="photoURL"
//                 {...register("photoURL", { required: true })}
//                 className="input input-bordered"
//               />
//               {errors.photoURL && (
//                 <span className="text-red-500">Photo URL is required</span>
//               )}
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Email</span>
//               </label>
//               <input
//                 type="email"
//                 placeholder="email"
//                 name="email"
//                 {...register("email", { required: true })}
//                 className="input input-bordered"
//               />
//               {errors.email && (
//                 <span className="text-red-500">email is required</span>
//               )}
//             </div>
//             <div className="form-control">
//               <label className="label">
//                 <span className="label-text">Password</span>
//               </label>
//               <input
//                 type="password"
//                 {...register("password", {
//                   required: true,
//                   minLength: 6,
//                   maxLength: 20,
//                   pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
//                 })}
//                 placeholder="password"
//                 className="input input-bordered"
//               />
//               {errors.password?.type === "required" && (
//                 <p className="text-red-600">Password is required</p>
//               )}
//               {errors.password?.type === "minLength" && (
//                 <p className="text-red-600">Password must be 6 characters</p>
//               )}
//               {errors.password?.type === "maxLength" && (
//                 <p className="text-red-600">
//                   Password must be less than 20 characters
//                 </p>
//               )}
//               {errors.password?.type === "pattern" && (
//                 <p className="text-red-600">
//                   Password must have one Uppercase one lower case, one number
//                   and one special character.
//                 </p>
//               )}
//               <label className="label">
//                 <a href="#" className="label-text-alt link link-hover">
//                   Forgot password?
//                 </a>
//               </label>
//             </div>
//             <div className="form-control mt-6">
//                 <input className="btn btn-primary" type="submit" value="Sign up" />
               
//             </div>
//           </form>
//           <p className="px-6 py-4"><small>New here ? <Link to ="/signup">Create an account</Link></small></p>
          
//           <SocialLogin></SocialLogin>
//         </div>
//       </div>
      
//     </div>
//   );
// };

// export default SignUp;

import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../providers/AuthProvider";
import SocialLogin from "../components/SocialLogin";
import useAxiosPublic from "../hooks/UseAxiosPublic";

const SignUp = () => {
  const axiosPublic = useAxiosPublic();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

  const handleImageUpload = async (photo) => {
    const formData = new FormData();
    formData.append('image', photo);

    try {
      const res = await fetch(image_hosting_api, {
        method: 'POST',
        body: formData,
      });
      const imageData = await res.json();
      return imageData.success ? imageData.data.url : null;
    } catch (error) {
      console.error("Image Upload Error:", error);
      return null;
    }
  };

  const onSubmit = async (data) => {
    const photoURL = await handleImageUpload(data.photo[0]);
    if (!photoURL) return Swal.fire("Error", "Failed to upload image.", "error");

    try {
      const result = await createUser(data.email, data.password);
      const loggedUser = result.user;

      await updateUserProfile({ displayName: data.name, photoURL });

      const userInfo = {
        uid: loggedUser.uid,
        name: data.name,
        email: data.email,
        photoURL,
      };

      const res = await axiosPublic.post("/users", userInfo);

      if (res.data.insertedId) {
        reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Account Created Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      Swal.fire("Error", error.message, "error");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-blue-700 flex items-center justify-center px-4">
      <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl w-full">
        
        {/* Left Panel */}
        <div className="text-center md:text-left text-white max-w-md">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome!</h1>
          <p className="mb-5 text-gray-200">
            Join us and explore a world of opportunities. Already have an account?
          </p>
          <Link
            to="/login"
            className="inline-block px-6 py-2 rounded-md border border-white text-white hover:bg-white hover:text-blue-800 transition duration-300"
          >
            Sign In
          </Link>
        </div>

        {/* Sign Up Form */}
        <div className="card w-full max-w-md bg-white shadow-xl rounded-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="card-body p-6 space-y-4">
            <h2 className="text-2xl font-bold text-center text-blue-800">Create Account</h2>

            {/* Social Login */}
            <SocialLogin />
            <div className="divider text-gray-400 text-sm">or use your email</div>

            {/* Name */}
            <div className="form-control">
              <label className="label text-sm text-blue-800">Name</label>
              <input
                type="text"
                placeholder="Full Name"
                {...register("name", { required: "Name is required" })}
                className="input input-bordered bg-white border-blue-300 focus:ring-blue-500"
              />
              {errors.name && <span className="text-red-600 text-sm">{errors.name.message}</span>}
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label text-sm text-blue-800">Email</label>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="input input-bordered bg-white border-blue-300 focus:ring-blue-500"
              />
              {errors.email && <span className="text-red-600 text-sm">{errors.email.message}</span>}
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label text-sm text-blue-800">Password</label>
              <input
                type="password"
                placeholder="Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Min 6 characters" },
                  maxLength: { value: 20, message: "Max 20 characters" },
                  pattern: {
                    value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                    message: "Must include uppercase, lowercase, number & symbol",
                  },
                })}
                className="input input-bordered bg-white border-blue-300 focus:ring-blue-500"
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password.message}</span>}
              <label className="label">
                <Link to="/forgot-password" className="label-text-alt text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </label>
            </div>

            {/* Photo */}
            <div className="form-control">
              <label className="label text-sm text-blue-800">Profile Photo</label>
              <input
                type="file"
                accept="image/*"
                {...register("photo", { required: "Profile photo is required" })}
                className="file-input file-input-bordered w-full bg-white border-blue-300"
              />
              {errors.photo && <span className="text-red-600 text-sm">{errors.photo.message}</span>}
            </div>

            {/* Submit */}
            <button type="submit" className="btn bg-blue-600 hover:bg-blue-700 text-white mt-2 w-full">
              Sign Up
            </button>

            {/* Redirect */}
            <p className="text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
