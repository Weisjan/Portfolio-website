import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = () => {
    return "text-2xl font-bold text-gray-200 hover:text-white transition-colors duration-300";
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
      document.querySelector("main").classList.add("pointer-events-none");
    } else {
      document.body.style.overflow = "auto";
      document.querySelector("main").classList.remove("pointer-events-none");
    }

    return () => {
      document.body.style.overflow = "auto";
      document.querySelector("main").classList.remove("pointer-events-none");
    };
  }, [menuOpen]);

  return (
    <header className="py-6">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">
          JanWeis
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className={isActive()}>
            About
          </Link>
          <Link
            target="__blank"
            to="https://github.com/Weisjan"
            className={isActive()}
          >
            GitHub
          </Link>
          <Link to="/contact" className={isActive()}>
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 text-white focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </nav>
      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full bg-gray-800 bg-opacity-80 text-white w-64 transform transition-transform z-50 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-center p-4">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col items-center space-y-6 p-6">
          <Link to="/about" className={isActive()}>
            About
          </Link>
          <Link to="/projects" className={isActive()}>
            GitHub
          </Link>
          <Link to="/contact" className={isActive()}>
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
