import { useEffect, useState } from "react";
import "../uniqueStyles/galage.css";
import { SlOptionsVertical } from "react-icons/sl";

const Garage = () => {
  // Store all parked vehicles from localStorage
  const [parkedVehicles, setParkedVehicles] = useState([]);

  // Track which vehicle's options dropdown is currently open
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Get all registered user data from localStorage
  const allUserData = JSON.parse(localStorage.getItem("userData")) || [];

  // This runs once when the component loads (like componentDidMount)
  useEffect(() => {
    // Get all parking data from localStorage
    const storedVehicles =
      JSON.parse(localStorage.getItem("parkingData")) || {};

    // Extract all vehicle arrays and combine them into one flat list
    const allParkedVehicles = Object.values(storedVehicles)
      .filter(Array.isArray) // Keep only arrays
      .flat(); // Flatten into one big array

    // Save the list to state
    setParkedVehicles(allParkedVehicles);
  }, []);

  // Toggle the dropdown menu for a specific vehicle using its license plate as an ID
  const toggleDropdown = (license) => {
    // If the same one is clicked again, close it
    setActiveDropdown((prev) => (prev === license ? null : license));
  };

  const formatTime = (startTime) => {
    const date = new Date(startTime);
    return date.toLocaleString();
  };

  return (
    <div className="garage-container">
      <h2 className="garage-title">Current Vehicles in Garage</h2>

      <div className="garage-stats">
        <div className="stat-card">
          <div className="stat-value">{parkedVehicles.length}</div>
          <div className="stat-label">Total Vehicles</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {parkedVehicles.filter((v) => v.vehicleType === "truck").length}
          </div>
          <div className="stat-label">Trucks</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {parkedVehicles.filter((v) => v.vehicleType === "car").length}
          </div>
          <div className="stat-label">Cars</div>
        </div>

        <div className="stat-card">
          <div className="stat-value">
            {
              parkedVehicles.filter((v) => v.vehicleType === "motorcycle")
                .length
            }
          </div>
          <div className="stat-label">Motorcycles</div>
        </div>
      </div>

      {/* Vehicle Table */}
      <div className="vehicles-table-container">
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>License Plate</th>
              <th>Vehicle Type</th>
              <th>Entry Date</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {parkedVehicles.map((vehicle) => {
              const user = allUserData.find(
                (u) => u.employeeID === vehicle.identification
              );

              const readableTime = formatTime(vehicle.startTime);

              return (
                <tr key={vehicle.license}>
                  <td>{vehicle.license}</td>
                  <td>{vehicle.vehicleType}</td>
                  <td>{readableTime}</td>
                  <td>
                    <div
                      className="options-container"
                      onClick={() => toggleDropdown(vehicle.license)}
                    >
                      <SlOptionsVertical />
                      {activeDropdown === vehicle.license && (
                        <div className="options-dropdown">
                          {user ? (
                            <>
                              <p className="options-dropdown-item">
                                Name: {user.fullname.split(" ")[0]}
                              </p>
                              <p className="options-dropdown-item">
                                ID: {user.employeeID}
                              </p>
                              <p className="options-dropdown-item">
                                No: {user.contact}
                              </p>
                            </>
                          ) : (
                            <p className="options-dropdown-item">
                              User info not found
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Garage;
