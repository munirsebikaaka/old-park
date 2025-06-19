import "../uniqueStyles/nav.css";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <NavLink to="/home" className="navbar-logo">
            ParkEasy
          </NavLink>
        </div>

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
          <li className="nav-item">
            <NavLink to="/manager" className="nav-link">
              Manager
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
