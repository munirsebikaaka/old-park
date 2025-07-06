import "../uniqueStyles/nav.css";
import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  FaSignInAlt,
  FaSignOutAlt,
  FaWarehouse,
  FaUserCog,
} from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const onLogout = () => {
    localStorage.removeItem("showApp");
    window.location.href = "/";
  };

  return (
    <>
      <div className="navbar-header">
        <NavLink to="/home" className="navbar-logo">
          ParkEasy
        </NavLink>

        <button className="hamburger" onClick={handleToggleMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      <nav className={`navbar ${menuOpen ? "open" : ""}`}>
        <ul className={`navbar-nav ${menuOpen ? "show" : ""}`}>
          <li className="nav-item">
            <NavLink
              to="/manager"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">
                <FaUserCog />
              </span>
              <span className="nav-label">Employee</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">
                <FaSignInAlt />
              </span>
              <span className="nav-label">Entry</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/exit"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">
                <FaSignOutAlt />
              </span>
              <span className="nav-label">Exit</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/garage"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={() => setMenuOpen(false)}
            >
              <span className="nav-icon">
                <FaWarehouse />
              </span>
              <span className="nav-label">Garage</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <button
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={onLogout}
            >
              <span className="nav-icon">
                <RiLogoutCircleFill />
              </span>
              <span className="nav-label">logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
