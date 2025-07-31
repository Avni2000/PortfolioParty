import React, { useState } from 'react';
import { User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(); // clear user
    navigate('/login'); // redirect
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-green-500 to-green-600 px-6 py-4 shadow-lg">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-4">
          <Link to="/Dashboard" className = "text-xl font-bold text-black hover:underline"> Dashboard</Link>
          
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
            Welcome to Portfolio Party
          </h1>
         
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Manage your portfolio and engage with your community.
          </p>
        </div>
      </section>

      {/* Dashboard Content */}
      <section className="px-6 py-12 max-w-7xl mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Portfolio Value Card */}
          <div className="bg-white rounded-lg p-6 text-black lg:col-span-1">
            <h3 className="text-gray-600 text-sm mb-2">Portfolio Value</h3>
            <div className="text-6xl font-bold mb-2">$1,500.00</div>
            <div className="text-green-600 text-sm">+20% month over month</div>
          </div>

          {/* Right Column - Accounts and NASDAQ info */}
          <div className="flex gap-6">
            {/* Accounts Card */}
            <div className="bg-white rounded-lg p-4 text-black flex-1 flex flex-col">
              <h3 className="text-gray-600 text-sm mb-1">Cash Available</h3>
              <div className="text-6xl font-bold ">$45.00</div>
            </div>

            {/* Market Overview */}
            <div className="bg-gray-900 rounded-lg p-3 flex-1">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">Dow Jones</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">38,664</div>
                    <div className="text-green-500 text-xs">+0.52%</div>
                  </div>
                </div>
               
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">S&P 500</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">5,462</div>
                    <div className="text-green-500 text-xs">+0.53%</div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-white text-sm">NASDAQ</span>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-bold text-sm">17,663</div>
                    <div className="text-green-500 text-xs">+1.1%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Portfolio Value Over Time Chart */}
          <div className="bg-white rounded-lg p-6 text-black min-h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold mb-4">Portfolio Value Over Time</h3>
            <div className="flex-1 h-full bg-gray-100 rounded flex items-center justify-center">
              <span className="text-gray-500">Line Chart Placeholder</span>
            </div>
          </div>

          {/* Pie Chart */}
          <div className="bg-white rounded-lg p-6 text-black">
            <div className="flex-1 h-full flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-green-500 flex items-center justify-center text-white font-semibold">
                Pie Chart
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Asset Breakdown */}
          <div className="bg-white rounded-lg p-6 text-black">
            <h3 className="text-lg font-semibold mb-4">Asset Breakdown</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Nvidia</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">$120</span>
                  <span className="text-green-600 text-sm">+12%</span>
                </div>
              </div>
             
              <div className="flex items-center justify-between">
                <span>Capital One</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">$100</span>
                  <span className="text-green-600 text-sm">+3%</span>
                </div>
              </div>
             
              <div className="flex items-center justify-between">
                <span>Google</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">$90</span>
                  <span className="text-red-600 text-sm">-1%</span>
                </div>
              </div>
             
              <div className="flex items-center justify-between">
                <span>Tesla</span>
                <div className="flex items-center space-x-2">
                  <span className="font-bold">$140</span>
                  <span className="text-red-600 text-sm">-5%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Portfolio Diversity */}
          <div className="bg-white rounded-lg p-6 text-black">
            <h3 className="text-lg font-semibold mb-4">Portfolio Diversity</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Tech</span>
                <span className="font-bold">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{width: '40%'}}></div>
              </div>
             
              <div className="flex items-center justify-between">
                <span>Energy</span>
                <span className="font-bold">60%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{width: '60%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;

