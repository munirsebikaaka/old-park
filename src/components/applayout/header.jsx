import { useEffect, useState } from "react";
import "../../uniqueStyles/header.css";

const Header = (user) => {
  const [hours, setHours] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    const interval = setInterval(() => {
      setHours(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const userName = user?.user?.fullname || "User";
  return (
    <header className="app-header">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-actions">
        <span className="user-greeting">Welcome, {userName}</span>
      </div>
      <div className="header-clock">
        <span className="clock">{hours}</span>
      </div>
    </header>
  );
};

export default Header;
