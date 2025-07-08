import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import VehicleExitForm from "./pages/exit";
import Garage from "./pages/garage";
import LoginForm from "./features/login";
import VehicleEntryForm from "./pages/park";
import SignupForm from "./features/signup";
import Applayout from "./components/applayout/applayout";
import EmployeePage from "./pages/employee";
import { ToastContainer } from "react-toastify";
// import EmployeePage from "./pages/managerPage";

function App() {
  const [showApp, setShowApp] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

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
            <Route path="manager" element={<EmployeePage />} />
          </Route>
          <Route path="*" element={<h1>no page found ):</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" toastClassName={"custom-toast"} />
    </>
  );
}

export default App;
