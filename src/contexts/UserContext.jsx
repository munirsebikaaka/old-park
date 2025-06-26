import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const UserContext = createContext();

// 2. Create a hook so other components can use the context easily
export const useUser = () => useContext(UserContext);

// 3. Create a provider to wrap the entire app
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on page refresh
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
