import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SplashPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home'); // Navigate to the home page after 3 seconds
    }, 3000); // 3000 milliseconds = 3 seconds

    return () => clearTimeout(timer); // Clean up the timer
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-urban-eye-pink">
      <img
        src="/urban-eye-logo.png" // Assuming the logo is in the public folder
        alt="Urban Eye Logo"
        className="w-64 h-64 object-contain" // Adjust size as needed
      />
    </div>
  );
};

export default SplashPage;