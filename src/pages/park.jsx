import { useState } from "react";
import "../uniqueStyles/parkingForms.css";

import { useUser } from "../contexts/UserContext";

const VehicleEntryForm = () => {
  const { user } = useUser();

  const [values, setValues] = useState({
    license: "",
    vehicleType: "",
    slot: "",
  });
  const [vehicleTypeErorr, setVehicleTypeError] = useState("");
  const [licenseErorr, setLicenseError] = useState("");
  const [slotError, setSlotError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const userId = user?.employeeID;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { license, vehicleType, slot } = values;

    if (!license)
      return setLicenseError("Please enter your license plate number");
    setLicenseError("");

    if (!slot) return setSlotError("Please input slot number");
    setSlotError("");

    if (!vehicleType)
      return setVehicleTypeError("Please select your vehicle type");
    setVehicleTypeError("");

    const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

    const newVehicle = {
      slot: Number(slot) - 1,
      license,
      vehicleType,
      identification: userId,
      startTime: new Date(),
    };

    parkingData.push(newVehicle);
    localStorage.setItem("parkingData", JSON.stringify(parkingData));

    setValues({ license: "", vehicleType: "", slot: "" });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Vehicle Entry</h2>
      <form className="parking-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <p className="error-park-lincense">{licenseErorr}</p>
          <label htmlFor="plateNumber" className="form-label">
            License Plate Number
          </label>
          <input
            type="text"
            name="license"
            onChange={handleChange}
            value={values.license}
            id="plateNumber"
            className="form-input"
            placeholder="ABC 1234"
            style={{
              border: licenseErorr ? "1px solid #dc2626" : "1px solid #d1d5db",
            }}
          />
        </div>

        <div className="form-group">
          <p className="slot-error">{slotError}</p>
          <label htmlFor="slot" className="form-label">
            Slot
          </label>
          <input
            type="number"
            name="slot"
            onChange={handleChange}
            value={values.slot}
            id="slot"
            className="form-input"
            placeholder="Slot number"
            style={{
              border: slotError ? "1px solid #dc2626" : "1px solid #d1d5db",
            }}
          />
        </div>

        <div className="form-group">
          <p className="error-park-type">{vehicleTypeErorr}</p>
          <label htmlFor="vehicleType" className="form-label">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            className="form-input"
            name="vehicleType"
            onChange={handleChange}
            value={values.vehicleType}
            style={{
              border: vehicleTypeErorr
                ? "1px solid #dc2626"
                : "1px solid #d1d5db",
            }}
          >
            <option value="">Select vehicle type</option>
            <option value="car">Car</option>
            <option value="motorcycle">Motorcycle</option>
            <option value="truck">Truck</option>
          </select>
        </div>

        <button type="submit" className="form-button primary">
          Register Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleEntryForm;
