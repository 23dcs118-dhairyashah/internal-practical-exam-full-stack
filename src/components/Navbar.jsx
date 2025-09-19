import React from "react";
import { Search, Bell, User } from 'lucide-react';

const Navbar = ({ isNavScrolled }) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isNavScrolled
          ? "bg-black/90 backdrop-blur-md"
          : "bg-gradient-to-b from-black/70 to-transparent"
      }`}
    >
      <div className="flex items-center justify-between px-4 md:px-16 py-4">
        <div className="flex items-center space-x-8">
          <div className="text-red-600 text-2xl md:text-3xl font-bold cursor-pointer">
            CharusatFlix
          </div>
          <ul className="hidden md:flex space-x-6 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                TV Shows
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                Movies
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                New & Popular
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition-colors">
                My List
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center space-x-4">
          <Search className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <Bell className="w-5 h-5 cursor-pointer hover:text-gray-300" />
          <User className="w-8 h-8 bg-red-600 rounded p-1 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;