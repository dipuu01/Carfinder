// import React from 'react'
// import { Link } from "react-router-dom";
// import ThemeToggle from './ThemeToggle';

// const Header = () => {
//   return (
//     <header className="bg-white shadow-md p-4 flex justify-between items-center">
//     <Link to="/" className="text-xl font-bold text-blue-500">CarFinder</Link>
//     <nav className="flex gap-4">
//       <Link to="/">Home</Link>
//       <Link to="/wishlist">Wishlist</Link>
//       <ThemeToggle/>
//     </nav>
//   </header>

//   )
// }

// export default Header
import React from "react";
import { Link } from "react-router-dom";

const Header = ({ toggleDarkMode, isDarkMode }) => {
  return (
    <header className="bg-white dark:bg-gray-800 dark:text-white shadow-md p-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-500 dark:text-blue-300">
        CarFinder
      </Link>
      <nav className="flex items-center gap-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/wishlist" className="hover:underline">Wishlist</Link>
        <button
          onClick={toggleDarkMode}
          className="bg-gray-200 dark:bg-gray-700 text-black dark:text-white px-3 py-1 rounded"
        >
          {isDarkMode ? "☀ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;


