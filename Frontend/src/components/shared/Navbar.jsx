import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '@/redux/authSlice';
import { toggleTheme } from '@/redux/themeSlice';

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const { darkMode } = useSelector(store => store.theme);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggle = () => dispatch(toggleTheme());
  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <div className={`fixed top-0 left-0 w-full z-50 ${darkMode ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 shadow-md' : 'bg-gradient-to-b from-blue-100 to-white text-blue-800 shadow-sm'} transition-colors duration-300`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          {!isMenuOpen && (
            <h1 className="text-2xl font-extrabold">
              Home<span className={`${darkMode ? 'text-blue-400' : 'text-blue-500'} transition-colors duration-300`}>Inventory</span>
            </h1>
          )}
          <button onClick={() => setIsMenuOpen(prev => !prev)} className="lg:hidden text-xl z-50 relative" aria-label="Toggle menu">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        <nav className={`${isMenuOpen ? 'flex' : 'hidden'} absolute top-4 left-4 right-4 items-center pl-12 gap-6 font-medium bg-inherit p-2 rounded-md lg:static lg:flex lg:bg-transparent lg:pl-0`}>
          <li className="list-none">
            <Link to="/" className={`hover:underline transition-colors duration-200 ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}>Home</Link>
          </li>
          <li className="list-none">
            <Link to={user ? "/add-item" : "/login"} className={`hover:underline transition-colors duration-200 ${darkMode ? 'hover:text-blue-300' : 'hover:text-blue-700'}`}>Add Item</Link>
          </li>
          {!user ? (
            <li className="list-none">
              <Link to="/login" className={`bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors duration-200 ${darkMode ? 'dark:bg-blue-600 dark:hover:bg-blue-500' : ''}`}>Login</Link>
            </li>
          ) : (
            <li className="list-none">
              <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition-colors duration-200">Logout</button>
            </li>
          )}
          <li className="list-none">
            <button onClick={handleToggle} className={`p-2 rounded-full transition-colors duration-300 ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-blue-100 text-blue-500'}`} title="Toggle theme">
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </li>
        </nav>
      </div>
    </div>
  );
}

export default Navbar;