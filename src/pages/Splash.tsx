"use client";

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Splash: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Navigate to the main page after a delay
    }, 3000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-app-background p-4">
      {/* This div constrains the logo's display area to match the main content card's width */}
      <div className="max-w-md w-full flex items-center justify-center">
        <img
          src="/urban-eye-logo.png"
          alt="Urban Eye Logo"
          className="max-w-full h-auto animate-fade-in" // Make logo responsive within its container
        />
      </div>
    </div>
  );
};

export default Splash;