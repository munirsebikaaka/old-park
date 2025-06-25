import { useEffect, useState } from "react";

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import VehicleExitForm from "./pages/exit";
import Garage from "./pages/garage";
import LoginForm from "./features/login";
import VehicleEntryForm from "./pages/park";
import SignupForm from "./features/signup";

import Applayout from "./components/applayout/applayout";
import ManagerPage from "./pages/managerPage";

function App() {
  const [showApp, setShowApp] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (showApp) {
      localStorage.setItem("showApp", true);
    }
  }, [showApp]);
  useEffect(() => {
    const showApp = localStorage.getItem("showApp");
    if (showApp) {
      setShowApp(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              showApp ? (
                <Applayout user={user} />
              ) : showSignUp ? (
                <SignupForm setShowSignUp={setShowSignUp} />
              ) : (
                <LoginForm
                  setShowApp={setShowApp}
                  setShowSignUp={setShowSignUp}
                  setUser={setUser}
                />
              )
            }
          >
            <Route index element={<Navigate replace to={"home"} />} />
            <Route path="entry" element={<VehicleEntryForm user={user} />} />
            <Route path="exit" element={<VehicleExitForm />} />
            <Route path="garage" element={<Garage />} />
            <Route path="manager" element={<ManagerPage />} />
          </Route>
          <Route path="*" element={<h1>no page found):</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
