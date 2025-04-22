import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="relative w-16 h-16">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full animate-spin border-t-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full opacity-20"></div>
            </div>
        </div>
    );
};

export default LoadingSpinner; 