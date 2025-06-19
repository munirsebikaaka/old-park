import { useState } from "react";

const Header = () => {
  const [hours, setHours] = useState(new Date().toLocaleTimeString());
  const updateHours = () => {
    setHours(new Date().toLocaleTimeString());
  };
  setInterval(updateHours, 1000);
  return <p className="clock">{hours}</p>;
};
export default Header;
