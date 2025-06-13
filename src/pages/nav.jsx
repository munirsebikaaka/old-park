import { useState } from "react";
import "../uniqueStyles/nav.css";
import { NavLink } from "react-router-dom";
import { MdOutlineLocalParking } from "react-icons/md";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const [hours, setHours] = useState(new Date().toLocaleTimeString());
  const updateHours = () => {
    setHours(new Date().toLocaleTimeString());
  };
  setInterval(updateHours, 1000);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/home" className="navbar-logo">
            ParkEasy
          </NavLink>
        </div>

        <button
          className={`navbar-toggle ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
          <span className="navbar-toggle-icon"></span>
        </button>

        <div className={`navbar-menu ${isMenuOpen ? "active" : ""}`}>
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink to="/home" className="nav-link">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/entry" className="nav-link">
                Entry
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/exit" className="nav-link">
                Exit
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/garage" className="nav-link">
                Garage
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/account" className="nav-link">
                Account
              </NavLink>
            </li>
          </ul>

          <div className="navbar-auth">
            <p className="auth-button signup">{hours}</p>
          </div>
        </div>

        {isMenuOpen && (
          <div className="navbar-auth-mobile">
            <p className="auth-button signup">{hours}</p>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
