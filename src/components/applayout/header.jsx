import { useEffect, useState } from "react";
// Import the useUser hook from your UserContext file
import { useUser } from "../../contexts/UserContext"; // Adjust path as needed
import "../../uniqueStyles/header.css";

const Header = () => {
  // Get the current logged-in user from UserContext
  const { user } = useUser();

  // State to keep current time for the clock
  const [hours, setHours] = useState(new Date().toLocaleTimeString());

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setHours(new Date().toLocaleTimeString());
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, []);

  // Get full name from user object or default to 'User'
  const userName = user?.fullname || "User";

  // Capitalize first letter of first name
  const firstName =
    userName.split(" ")[0].charAt(0).toUpperCase() +
    userName.split(" ")[0].slice(1);

  return (
    <header className="app-header">
      <h1 className="header-title">Dashboard</h1>
      <div className="header-actions">
        {/* Show greeting with the first name */}
        <span className="user-greeting">Welcome, {firstName}</span>
      </div>
      <div className="header-clock">
        {/* Show the current time */}
        <span className="clock">{hours}</span>
      </div>
    </header>
  );
};

export default Header;
