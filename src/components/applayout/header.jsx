import { useEffect, useState } from "react";

import { useUser } from "../../contexts/UserContext";

import "../../uniqueStyles/header.css";

const Header = () => {
  const { user } = useUser();

  const [hours, setHours] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const userName = user?.fullname || "User";

  const firstName =
    userName.split(" ")[0].charAt(0).toUpperCase() +
    userName.split(" ")[0].slice(1);

  return (
    <header className="app-header">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-actions">
        <span className="user-greeting">Welcome, {firstName}</span>
      </div>
      <div className="header-clock">
        <span className="clock">{hours}</span>
      </div>
    </header>
  );
};

export default Header;
