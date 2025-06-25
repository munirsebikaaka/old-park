import "../uniqueStyles/nav.css";
import { NavLink } from "react-router-dom";

import React, { useState } from "react";

import {
  FaHome,
  FaSignInAlt,
  FaSignOutAlt,
  FaWarehouse,
  FaUserCircle,
  FaUserCog,
} from "react-icons/fa";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    // { to: "/home", label: "Home", icon: <FaHome /> },
    { to: "/entry", label: "Entry", icon: <FaSignInAlt /> },
    { to: "/exit", label: "Exit", icon: <FaSignOutAlt /> },
    { to: "/garage", label: "Garage", icon: <FaWarehouse /> },
    // { to: "/account", label: "Account", icon: <FaUserCircle /> },
    { to: "/manager", label: "Manager", icon: <FaUserCog /> },
  ];

  return (
    <>
      <div className="navbar-header">
        <NavLink to="/home" className="navbar-logo">
          ParkEasy
        </NavLink>
        <button className="hamburger" onClick={toggleMenu}>
          <span className="bar" />
          <span className="bar" />
          <span className="bar" />
        </button>
      </div>

      <nav className={`navbar ${isOpen ? "open" : ""}`}>
        <ul className={`navbar-nav ${isOpen ? "show" : ""}`}>
          {navLinks.map(({ to, label, icon }) => (
            <li className="nav-item" key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  `nav-link ${isActive ? "active" : ""}`
                }
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-icon">{icon}</span>
                <span className="nav-label">{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
