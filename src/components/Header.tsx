import React from 'react';
import { Home, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-urban-eye-pink text-gray-800">
      <Link to="/" className="flex items-center space-x-2">
        <Home className="h-6 w-6" />
        <span className="text-xl font-bold">Urban Eye</span>
      </Link>
      <Link to="/settings"> {/* Assuming a settings page will be added later */}
        <Settings className="h-6 w-6" />
      </Link>
    </header>
  );
};

export default Header;