import { useEffect, useState } from "react";
import "../uniqueStyles/galage.css";

const Garage = () => {
  const [parkedVehicles, setParkedVehicle] = useState([]);
  useEffect(() => {
    const storedVehicles =
      JSON.parse(localStorage.getItem("parkingData")) || {};

    // Flatten all user vehicle arrays into one array
    const allParkedVehicles = Object.values(storedVehicles)
      .filter(Array.isArray)
      .flat();

    setParkedVehicle(allParkedVehicles);
  }, []);

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

      <div className="vehicles-table-container">
        <table className="vehicles-table">
          <thead>
            <tr>
              <th>License Plate</th>
              <th>Vehicle Type</th>
              <th>Entry Date</th>
            </tr>
          </thead>
          <tbody>
            {parkedVehicles.map((vehicle) => (
              <tr key={vehicle.license}>
                <td>{vehicle.license}</td>
                <td>{vehicle.vehicleType}</td>
                <td>{vehicle.startTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Garage;
