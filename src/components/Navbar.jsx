import { Link } from "react-router-dom";

const Navbar = () => {
  const isActive = () => {
    return "text-2xl font-bold text-gray-200 hover:text-white transition-colors duration-300";
  };

  return (
    <header className="py-6">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">
          JanWeis
        </Link>

        <div className="space-x-6">
          <Link to="/about" className={isActive("/About")}>
            About
          </Link>
          <Link to="/projects" className={isActive("/projects")}>
            GitHub
          </Link>
          <Link to="/contact" className={isActive("/contact")}>
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
