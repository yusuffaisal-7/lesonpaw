// import React from 'react';
// import img2 from "../../../assets/img-02.png";

// const Banner = () => {
//     return (
//         <div className="w-full bg-gradient-to-r from-blue-800 to-teal-700 text-white py-16 px-4">
//             <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
//                 <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
//                     <h1 className="text-4xl font-bold mb-4">Welcome to Our Platform</h1>
//                     <p className="text-lg mb-6">Discover amazing features and join our community today!</p>
//                     <button className="btn bg-teal-500 hover:bg-teal-600 text-white font-semibold py-2 px-6 rounded-full">
//                         Get Started
//                     </button>
//                 </div>
//                 <div className="md:w-1/2 flex justify-center">
//                     <img src={img2} alt="Banner Illustration" className="w-full max-w-sm h-auto" />
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Banner;


import React, { useState, useEffect } from 'react';
import img2 from "../../../assets/img-02.png";

const Banner = () => {
  const [emphasizedText, setEmphasizedText] = useState('Equitable society');
  const texts = ['Equitable society', 'Self confidence'];

  useEffect(() => {
    const interval = setInterval(() => {
      setEmphasizedText((prev) => {
        const currentIndex = texts.indexOf(prev);
        return texts[(currentIndex + 1) % texts.length];
      });
    }, 3000);
    return () => clearInterval(interval);
  }, [texts]);

  return (
    <section className="full-width-section bg-hero">
      <div className="section-container py-8 md:py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left space-y-4 md:space-y-6 max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-text-dark">
              A good <span className="text-cta">#education</span> is always a base of
            </h1>
            <div>
              <span className="inline-block bg-cta text-white px-4 md:px-6 py-2 md:py-3 text-2xl md:text-3xl lg:text-4xl font-semibold rounded-sm">
                {emphasizedText}
              </span>
            </div>
            <p className="text-base md:text-lg text-text-dark">
              Consectur adipiscing elit sedo eiusmod tempor incididun ut labore dolore magna aliqua ad minim veniamque.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <button className="w-full sm:w-auto bg-cta text-white font-semibold py-3 px-6 rounded-full hover:opacity-90 transition-all">
                Start as student 
              </button>
              <button className="w-full sm:w-auto bg-white text-text-dark font-semibold py-3 px-6 rounded-full border border-text-dark hover:bg-gray-50 transition-all">
                Join as Instructor It's Free!
              </button>
            </div>
          </div>
          
          {/* Image Grid Section */}
          <div className="relative w-full h-full min-h-[400px] md:min-h-[500px]">
            <div className="grid grid-cols-2 gap-4 absolute inset-0">
              <div className="space-y-4">
                <div className="bg-info rounded-2xl overflow-hidden">
                  <img src="https://source.unsplash.com/random/400x300?teacher" alt="Education" className="w-full h-full object-cover" />
                </div>
                <div className="bg-info rounded-2xl overflow-hidden">
                  <img src="https://source.unsplash.com/random/400x300?student" alt="Learning" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-info rounded-2xl overflow-hidden">
                  <img src="https://source.unsplash.com/random/400x300?classroom" alt="Teaching" className="w-full h-full object-cover" />
                </div>
                <div className="bg-info rounded-2xl overflow-hidden">
                  <img src="https://source.unsplash.com/random/400x300?education" alt="Students" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Parent Join Text */}
        <p className="mt-8 text-text-dark text-sm flex items-center justify-center gap-2">
          <span className="text-xl">🛡️</span> You can also join as parent to explore join today
        </p>
      </div>
    </section>
  );
};

export default Banner;