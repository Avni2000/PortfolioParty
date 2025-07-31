import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut();
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex items-center space-x-4">
          <Link to="/dashboard" className="text-xl font-bold text-black">
            Dashboard
          </Link>
        </div>

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 rounded-full p-2 transition-colors"
          >
            <User className="w-6 h-6 text-white" />
            <ChevronDown className="w-4 h-4 text-white" />
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Log Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
