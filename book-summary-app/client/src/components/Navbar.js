import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            Book Summary App
          </Link>
          <div>
            <Link to="/" className="hover:text-blue-200 transition-colors">
              Home
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 