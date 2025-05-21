// import React from 'react';
// import CEO from "../../../assets/CEO.png";

// const ExploreAbout = () => {

//     return (
//         <div>
            
//         </div>
//     );
// };

// export default ExploreAbout;

import React from 'react';
import CEO from "../../../assets/CEO.png";

const ExploreAbout = () => {
  return (
    <section className="full-width-section bg-white relative overflow-hidden">
      <div className="section-container py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Text Section */}
          <div className="text-center md:text-left space-y-6 max-w-2xl mx-auto md:mx-0">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold flex items-center gap-2">
              <span className="text-orange-500">~ ~</span> Better Learning. Better Results
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold">
              Online education platform that fits for everyone
            </h2>
            <p className="text-base md:text-lg text-gray-800">
              Accusamus et iusidio dignissimos ducimus blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.
            </p>
            <button className="bg-purple-700 text-white font-semibold py-3 px-8 rounded-full hover:bg-purple-800 transition-all duration-200 flex items-center gap-2 mx-auto md:mx-0">
              Explore more about us <span>&gt;</span>
            </button>
          </div>

          {/* Image Section with Background Elements */}
          <div className="relative w-full min-h-[400px] md:min-h-[500px]">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0">
              <div className="w-72 h-72 md:w-80 md:h-80 bg-green-200 rounded-full absolute -top-10 -right-10 opacity-50"></div>
              <div className="w-64 h-64 md:w-72 md:h-72 bg-yellow-200 rounded-full absolute top-10 right-10 opacity-50"></div>
            </div>

            {/* CEO Image */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative w-72 h-72 md:w-80 md:h-80">
                <div className="w-full h-full bg-blue-300 rounded-full overflow-hidden shadow-lg">
                  <img src={CEO} alt="Founder & CEO Allen Wake" className="w-full h-full object-cover" />
                </div>
                <div className="absolute bottom-4 right-4 text-gray-600 text-sm md:text-base text-right font-medium bg-white/80 p-2 rounded-lg">
                  Founder & CEO <br /> Allen Wake
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 -z-10"></div>
    </section>
  );
};

export default ExploreAbout;
