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
    <div className="min-h-screen flex items-center justify-center bg-app-background">
      <img
        src="/urban-eye-logo.png"
        alt="Urban Eye Logo"
        className="w-64 h-64 animate-fade-in" // Adjust size as needed, add fade-in animation
      />
    </div>
  );
};

export default Splash;