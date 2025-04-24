import React from 'react';
import { Navigation } from './shared/Navigation';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-black">
            <main className="pb-20">
                {children}
            </main>
            <Navigation tab={0} />
        </div>
    );
};

export default Layout; 