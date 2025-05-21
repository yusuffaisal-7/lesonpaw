import React from 'react';
import Teacher from './Teacher';
import TutorRating from '../../Dashboard/TutorRating/TutorRating';
import Banner from './Banner';
import ExploreAbout from './ExploreAbout';

const Home = () => {
    return (
        <div className='w-full min-h-screen'>
            <Banner />
            <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
                <ExploreAbout />
                <Teacher />
                <TutorRating />
            </div>
        </div>
    );
};

export default Home;