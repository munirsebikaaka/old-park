import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import VehicleExitForm from "./pages/exit";
import Garage from "./pages/garage";
import LoginForm from "./features/login";
import VehicleEntryForm from "./pages/park";
import SignupForm from "./features/signup";
import Applayout from "./components/applayout/applayout";
import ManagerPage from "./pages/managerPage";

// 🔁 Import the user context
import { useUser } from "./contexts/UserContext";

function App() {
  // 🔁 Use global user and setter
  const { user, setUser } = useUser();

  const [showApp, setShowApp] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  // Save showApp in localStorage when it changes
  useEffect(() => {
    if (showApp) {
      localStorage.setItem("showApp", true);
    }
  }, [showApp]);

  // Restore showApp from localStorage on page refresh
  useEffect(() => {
    const showApp = localStorage.getItem("showApp");
    if (showApp) {
      setShowApp(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            showApp ? (
              // ✅ Pass user through context (no need for props)
              <Applayout />
            ) : showSignUp ? (
              <SignupForm setShowSignUp={setShowSignUp} />
            ) : (
              <LoginForm
                setShowApp={setShowApp}
                setShowSignUp={setShowSignUp}
              />
            )
          }
        >
          <Route index element={<Navigate replace to={"manager"} />} />
          <Route path="entry" element={<VehicleEntryForm />} />
          <Route path="exit" element={<VehicleExitForm />} />
          <Route path="garage" element={<Garage />} />
          <Route path="manager" element={<ManagerPage />} />
        </Route>
        <Route path="*" element={<h1>no page found ):</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
