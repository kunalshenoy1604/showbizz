"use client";

import React, { useState } from 'react';
import { Menu, User, Home, Calendar, Search, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky pb-3  w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-violet-900 bg-clip-text text-transparent">
              ShowBizz
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="w-64 pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
              />
            </div>

            {/* Navigation Links */}
            <div className="flex items-center space-x-6">
              <a href="/" className="nav-link group">
                <Home className="w-5 h-5 group-hover:text-violet-600 transition-colors" />
                <span>Home</span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </a>
              
              <a href="/events" className="nav-link group">
                <Calendar className="w-5 h-5 group-hover:text-violet-600 transition-colors" />
                <span>Events</span>
                <div className="absolute inset-x-0 bottom-0 h-0.5 bg-violet-600 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
              </a>
            </div>

            {/* Sign In Button */}
            <button className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-full hover:shadow-lg hover:shadow-violet-500/20 transition-all duration-300 focus:ring-2 focus:ring-violet-500 focus:ring-offset-2">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-violet-600 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-2xl">
          {/* Search Bar Mobile */}
          <div className="px-4 py-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-2 bg-gray-50 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>
          </div>

          <a href="/" className="mobile-nav-link">
            <Home className="w-5 h-5" />
            <span>Home</span>
          </a>
          <a href="/events" className="mobile-nav-link">
            <Calendar className="w-5 h-5" />
            <span>Events</span>
          </a>
          <div className="px-4 py-2">
            <button className="w-full flex items-center justify-center gap-2 px-6 py-2 bg-gradient-to-r from-violet-600 to-violet-800 text-white rounded-full hover:shadow-lg transition-all">
              <User className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        .nav-link {
          @apply relative flex items-center gap-2 text-gray-600 hover:text-violet-600 transition-colors py-2;
        }
        .mobile-nav-link {
          @apply flex items-center gap-3 px-4 py-3 text-gray-600 hover:text-violet-600 hover:bg-gray-50 rounded-xl transition-colors;
        }
      `}</style>
    </nav>
  );
}