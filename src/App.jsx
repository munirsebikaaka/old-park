import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Garage from "./pages/garage";
import LoginForm from "./features/login";

import VehicleEntryForm from "./pages/park";

import SignupForm from "./features/signup";

import Applayout from "./components/applayout/applayout";
import EmployeePage from "./pages/employee";

import VehicleExitForm from "./pages/exit";

import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />

          {/* Protected Routes */}
          <Route path="/app" element={<Applayout />}>
            <Route index element={<Navigate to="manager" />} />
            <Route path="entry" element={<VehicleEntryForm />} />
            <Route path="exit" element={<VehicleExitForm />} />
            <Route path="garage" element={<Garage />} />
            <Route path="manager" element={<EmployeePage />} />
          </Route>

          <Route path="*" element={<h1>No page found ):</h1>} />
        </Routes>
      </BrowserRouter>
      <ToastContainer position="top-center" toastClassName={"custom-toast"} />
    </>
  );
}

export default App;
