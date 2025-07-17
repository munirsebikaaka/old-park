import "../uniqueStyles/nav.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

import {
  FaSignInAlt,
  FaSignOutAlt,
  FaWarehouse,
  FaUserCog,
} from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleToggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const onLogout = () => {
    try {
      const userRaw = localStorage.getItem("loggedInUser");
      const user = userRaw ? JSON.parse(userRaw) : null;

      const date = new Date();
      const logoutTime = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;

      if (user) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ ...user, logoutTime })
        );
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }

    localStorage.removeItem("showApp");
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="navbar-header">
        <NavLink to="/app/manager" className="navbar-logo">
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
              to="/app/manager"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              <span className="nav-icon">
                <FaUserCog />
              </span>
              <span className="nav-label">Employee</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/app/entry"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              <span className="nav-icon">
                <FaSignInAlt />
              </span>
              <span className="nav-label">Entry</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/app/exit"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              <span className="nav-icon">
                <FaSignOutAlt />
              </span>
              <span className="nav-label">Exit</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <NavLink
              to="/app/garage"
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
              onClick={closeMenu}
            >
              <span className="nav-icon">
                <FaWarehouse />
              </span>
              <span className="nav-label">Garage</span>
            </NavLink>
          </li>

          <li className="nav-item">
            <button className="nav-link" onClick={onLogout}>
              <span className="nav-icon">
                <RiLogoutCircleFill />
              </span>
              <span className="nav-label">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navigation;
