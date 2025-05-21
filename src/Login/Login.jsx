
// import Lottie from 'lottie-react';
// import React, { useEffect, useState, useRef, useContext } from 'react';
// // import registerLottieData from '../../../';
// import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';

// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import { AuthContext } from '../providers/AuthProvider';
// import SocialLogin from '../components/SocialLogin';
// import bgImage from "../assets/Video.webm";


// const Login = () => {
//     const [disabled, setDisabled] = useState(true);
//     const emailRef = useRef(null);
//     const passwordRef = useRef(null);
//     const { signIn } = useContext(AuthContext);
//     const navigate = useNavigate();
//     const location = useLocation();
//     const from = location.state?.from?.pathname || "/";

//     useEffect(() => {
//         loadCaptchaEnginge(6);
//     }, []);

//     const handleLogin = (event) => {
//         event.preventDefault();
//         const form = event.target;
//         const email = form.email.value;
//         const password = form.password.value;

//         signIn(email, password)
//             .then((result) => {
//                 Swal.fire({
//                     title: 'User Login Successful!',
//                     icon: 'success',
//                     showClass: { popup: 'animate__animated animate__fadeInDown' },
//                     hideClass: { popup: 'animate__animated animate__fadeOutUp' },
//                 });
//                 navigate(from, { replace: true });
//             })
//             .catch((error) => {
//                 Swal.fire({
//                     title: 'Login Failed',
//                     text: error.message,
//                     icon: 'error',
//                     confirmButtonText: 'Try Again',
//                 });
//             });
//     };

//     const handleValidateCaptcha = (e) => {
//         if (validateCaptcha(e.target.value)) {
//             setDisabled(false);
//         } else {
//             setDisabled(true);
//         }
//     };

    

//     return (
      
//         <div className="hero min-h-screen card bg-base-100 shadow-2xl card-body flex flex-col items-center">

    
        
//         <div className="hero-content flex-col md:flex-row-reverse w-full max-w-4xl">
//             <div className="text-center md:w-1/2 lg:text-left">
//                 {/* <Lottie animationData={registerLottieData} /> */}
//             </div>
//             <div className="md:w-1/2 max-w-sm">
//                 <form onSubmit={handleLogin}>
//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Email</span></label>
//                         <input ref={emailRef} type="email" name="email" placeholder="email" className="input input-bordered" required />
//                     </div>
//                     <div className="form-control">
//                         <label className="label"><span className="label-text">Password</span></label>
//                         <input ref={passwordRef} type="password" name="password" placeholder="password" className="input input-bordered" required />
//                         <label className="label"><a href="#" className="label-text-alt link link-hover">Forgot password?</a></label>
//                     </div>
//                     <div className="form-control">
//                         <label className="label"><LoadCanvasTemplate /></label>
//                         <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" required />
//                         <button className="btn btn-outline btn-xs mt-3">Validate</button>
//                     </div>
//                     <div className="form-control mt-6">
//                         <input disabled={disabled} className="btn btn-primary" type="submit" value="Login" />
//                     </div>
//                 </form>
//                 <p className="py-4 text-3xl">
//                     <small>New here? <Link className='text-pink-700' to="/signup">Create an account</Link></small>
//                 </p>
//                 <SocialLogin />
//             </div>
//         </div>
//     </div>
     
      
//     );
// };

// export default Login;



import Lottie from 'lottie-react';
import React, { useEffect, useState, useRef, useContext } from 'react';
// import registerLottieData from '../../../';
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from "sweetalert2";
import { AuthContext } from '../providers/AuthProvider';
import SocialLogin from '../components/SocialLogin';
import bgImage from "../assets/Video.webm";

const Login = () => {
    const [disabled, setDisabled] = useState(true);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    useEffect(() => {
        loadCaptchaEnginge(6);
    }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then((result) => {
                Swal.fire({
                    title: 'User Login Successful!',
                    icon: 'success',
                    showClass: { popup: 'animate__animated animate__fadeInDown' },
                    hideClass: { popup: 'animate__animated animate__fadeOutUp' },
                });
                navigate(from, { replace: true });
            })
            .catch((error) => {
                Swal.fire({
                    title: 'Login Failed',
                    text: error.message,
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                });
            });
    };

    const handleValidateCaptcha = (e) => {
        if (validateCaptcha(e.target.value)) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center text-white relative overflow-hidden">
            {/* Background Video */}
            <video
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover z-0"
                src={bgImage}
            />

            {/* Overlay and Decorative Circles */}
            <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
            <div className="absolute top-0 left-0 w-96 h-96 bg-teal-500 rounded-full filter blur-3xl opacity-20 animate-pulse z-0"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl opacity-20 animate-pulse z-0"></div>

            {/* Main Container */}
            <div className="relative z-10 container flex flex-col md:flex-row w-full max-w-4xl backdrop-blur-md bg-gradient-to-br from-blue-800/50 to-teal-700/50 border border-white/20 shadow-2xl rounded-2xl overflow-hidden mx-4 md:mx-10">
                {/* Left Section */}
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-6 md:p-8 bg-gradient-to-b from-teal-600/30 to-transparent">
                    <h2 className="text-4xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-200 drop-shadow-lg">
                        Welcome Back!
                    </h2>
                    <p className="text-sm text-white/70 mt-4">
                        Sign in to continue your journey.
                    </p>
                    {/* Uncomment if you have Lottie animation */}
                    {/* <Lottie animationData={registerLottieData} className="w-full max-w-xs md:max-w-sm h-auto" /> */}
                </div>

                {/* Right Section - Form */}
                <div className="w-full md:w-1/2 p-6 md:p-8">
                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="form-control">
                            <label className="block mb-2 text-white/90">Email</label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="email"
                                className="input input-bordered w-full bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-teal-300"
                                required
                            />
                        </div>
                        <div className="form-control">
                            <label className="block mb-2 text-white/90">Password</label>
                            <input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder="password"
                                className="input input-bordered w-full bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-teal-300"
                                required
                            />
                            <p className="text-right text-sm text-teal-200 hover:underline cursor-pointer mt-2">
                                <a href="#">Forgot password?</a>
                            </p>
                        </div>
                        <div className="form-control">
                            <label className="block mb-2 text-white/90">
                                <LoadCanvasTemplate />
                            </label>
                            <input
                                onBlur={handleValidateCaptcha}
                                type="text"
                                name="captcha"
                                placeholder="Type the text above"
                                className="input input-bordered w-full bg-white/10 text-white placeholder-white/50 border-white/20 focus:border-teal-300"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline btn-xs mt-3 text-teal-200 border-teal-200 hover:bg-teal-500 hover:border-teal-500"
                            >
                                Validate
                            </button>
                        </div>
                        <div className="form-control mt-6">
                            <input
                                disabled={disabled}
                                className={`btn w-full text-white border-none ${
                                    disabled
                                        ? "bg-gray-400 cursor-not-allowed"
                                        : "bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600"
                                }`}
                                type="submit"
                                value="Login"
                            />
                        </div>
                    </form>
                    <p className="py-4 text-white/80 text-center">
                        <small>
                            New here?{" "}
                            <Link className="text-teal-300 underline" to="/signup">
                                Create an account
                            </Link>
                        </small>
                    </p>
                    <SocialLogin />
                </div>
            </div>
        </div>
    );
};

export default Login;