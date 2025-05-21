import React from 'react';

const Intro = () => {
    return (
        <div className="h-full w-full">
            <div className="grid grid-cols-1 gap-6 h-full">
                {/* Welcome Section */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h1 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4">Welcome to Dashboard</h1>
                    <p className="text-[var(--color-text-dark)]">
                        Manage your educational journey from one central location.
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-[var(--color-text-dark)]">Total Students</h3>
                        <p className="text-3xl font-bold text-[var(--color-cta)] mt-2">245</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-[var(--color-text-dark)]">Active Courses</h3>
                        <p className="text-3xl font-bold text-[var(--color-cta)] mt-2">12</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-[var(--color-text-dark)]">Total Teachers</h3>
                        <p className="text-3xl font-bold text-[var(--color-cta)] mt-2">18</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col justify-between">
                        <h3 className="text-lg font-semibold text-[var(--color-text-dark)]">Active Sessions</h3>
                        <p className="text-3xl font-bold text-[var(--color-cta)] mt-2">32</p>
                    </div>
                </div>

                {/* Recent Activity Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 flex-grow">
                    <h2 className="text-xl font-bold text-[var(--color-text-dark)] mb-4">Recent Activity</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-cta)]"></div>
                            <p className="text-[var(--color-text-dark)]">New student registration</p>
                            <span className="text-sm text-gray-500 ml-auto">2 mins ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-cta)]"></div>
                            <p className="text-[var(--color-text-dark)]">Course completion by John Doe</p>
                            <span className="text-sm text-gray-500 ml-auto">1 hour ago</span>
                        </div>
                        <div className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                            <div className="w-2 h-2 rounded-full bg-[var(--color-cta)]"></div>
                            <p className="text-[var(--color-text-dark)]">New teacher application</p>
                            <span className="text-sm text-gray-500 ml-auto">3 hours ago</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Intro;
