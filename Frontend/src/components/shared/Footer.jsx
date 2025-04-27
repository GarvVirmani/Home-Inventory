import React from 'react';

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 py-8 mt-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm">
                    &copy; {currentYear} Home Inventory. All rights reserved.
                </p>
                <p className="mt-2 text-xs text-gray-400">
                    Follow us for updates and more!
                </p>
                <div className="mt-3 flex justify-center space-x-6">
                    <span className="hover:text-blue-400 transition-colors duration-200 cursor-pointer">Facebook</span>
                    <span className="text-gray-500">•</span>
                    <span className="hover:text-purple-400 transition-colors duration-200 cursor-pointer">Twitter</span>
                    <span className="text-gray-500">•</span>
                    <span className="hover:text-teal-400 transition-colors duration-200 cursor-pointer">Instagram</span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;