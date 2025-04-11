// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Wishlist from "./pages/Wishlist";
// import CarDetails from "./pages/CarDetails";
// import Header from "./components/Header";

// const App = () => {
//   return (
   
//     <Router>
//     <Header />
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/wishlist" element={<Wishlist />} />
//       <Route path="/car/:id" element={<CarDetails />} />
//     </Routes>
//   </Router>
  
//   )
// }

// export default App


import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";
import Header from "./components/Header";
import CarDetails from "./pages/CarDetails";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <Router>
        <Header toggleDarkMode={() => setIsDarkMode(prev => !prev)} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/car/:id" element={<CarDetails/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
