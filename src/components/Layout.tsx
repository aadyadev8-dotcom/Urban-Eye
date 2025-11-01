"use client";

import React from 'react';
import { Home, Settings } from 'lucide-react';
import { useNavigate, Outlet } from 'react-router-dom'; // Import Outlet
import { cn } from '@/lib/utils';

// Removed LayoutProps interface as children prop is no longer directly passed
// interface LayoutProps {
//   children: React.ReactNode;
// }

const Layout: React.FC = () => { // Removed LayoutProps from FC type
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-app-background items-center justify-center p-4">
      <div className="bg-urban-card-background p-8 md:p-12 rounded-card-lg shadow-card-soft max-w-md w-full text-center">
        {/* Top Navigation Bar - now inside the card */}
        <nav className="relative flex items-center p-4 -mx-8 -mt-8 mb-4 md:-mx-12 md:-mt-12 bg-white shadow-nav-elevation rounded-t-card-lg">
          {/* Home button on the left */}
          <div className="absolute left-4 md:left-8">
            <Home
              className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => navigate('/home')}
            />
          </div>
          {/* Urban Eye in the center */}
          <h1 className="flex-1 text-2xl font-bold text-gray-800 text-center font-tan-meringue">Urban Eye</h1>
          {/* Settings on the right */}
          <div className="absolute right-4 md:right-8 flex space-x-4">
            <Settings
              className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors"
              onClick={() => console.log("Settings clicked")} // Placeholder for settings
            />
          </div>
        </nav>
        <Outlet /> {/* Render nested routes here */}
      </div>
    </div>
  );
};

export default Layout;