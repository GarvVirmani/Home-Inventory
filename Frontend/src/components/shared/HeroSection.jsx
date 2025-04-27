import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function HeroSection() {
  const { user } = useSelector(state => state.auth);
  const { darkMode } = useSelector(state => state.theme);

  return (
    <div className={`py-20 md:py-24 lg:py-32 transition-colors duration-500 ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100' : 'bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 text-white'}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
          Unlock the Power of Organization with <span className={`${darkMode ? 'text-teal-400' : 'text-orange-300'} transition-colors duration-300`}>Home Inventory</span>
        </h1>
        <p className="mt-5 text-lg sm:text-xl leading-relaxed">
          {user ? `Welcome back, ${user.fullname}! Keep your treasures neatly organized and always within reach.` : 'Transform your clutter into clarity. Start cataloging your home’s treasures today!'}
        </p>
        {user && (
          <p className="mt-3 text-base sm:text-lg text-gray-300 dark:text-gray-400">
            Manage, track, and preserve your precious items.
          </p>
        )}
        {!user && (
          <div className="mt-8">
            <Link
              to="/login"
              className={`inline-block py-3 px-6 rounded-full font-semibold text-lg transition-colors duration-300 shadow-md ${darkMode ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white' : 'bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-300 hover:to-teal-400 text-gray-800'}`}
            >
              Start Your Journey to Organization
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default HeroSection;