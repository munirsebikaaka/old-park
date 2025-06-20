import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import VehicleExitForm from "./pages/exit";

import Garage from "./pages/garage";

import ParkingHomepage from "./pages/home";
import LoginForm from "./features/login";
import VehicleEntryForm from "./pages/park";
import SignupForm from "./features/signup";
import UserAccount from "./pages/userAccount";
import { useEffect, useState } from "react";
import Applayout from "./components/applayout/applayout";
import ManagerPage from "./pages/managerPage";

function App() {
  const [showApp, setShowApp] = useState(false);
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
                <Applayout />
              ) : (
                <LoginForm setShowApp={setShowApp} setShowSignUp={setShowApp} />
              )
            }
          >
            <Route index element={<Navigate replace to={"home"} />} />
            <Route path="home" element={<ParkingHomepage />} />
            <Route path="entry" element={<VehicleEntryForm />} />
            <Route path="exit" element={<VehicleExitForm />} />
            <Route path="garage" element={<Garage />} />
            <Route path="account" element={<UserAccount />} />
            <Route path="manager" element={<ManagerPage />} />
          </Route>
          <Route
            path="signup"
            element={<SignupForm setShowApp={setShowApp} />}
          />
          <Route path="*" element={<h1>no page found):</h1>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
