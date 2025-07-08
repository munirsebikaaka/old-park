import { useState } from "react";
import "../uniqueStyles/parkingForms.css";
import { countMoneyPaid } from "../services/exit/countMoney";
import { toast } from "react-toastify";

const VehicleExitForm = () => {
  const [values, setValues] = useState({ license: "" });
  const [licenseError, setLicenseError] = useState("");
  const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { license } = values;
    if (!license) {
      return setLicenseError("Please enter your license plate number");
    }

    let foundData = null;

    // Go through each user's data to find the vehicle
    for (const userId in parkingData) {
      const userVehicles = parkingData[userId];

      if (Array.isArray(userVehicles)) {
        const match = userVehicles.find((el) => el.license === license);
        if (match) {
          foundData = match;
          break;
        }
      }
    }

    if (!foundData) {
      return setLicenseError("License plate not found");
    }

    switch (foundData.vehicleType) {
      case "truck":
        countMoneyPaid(foundData, "truck", 2, 3, 3, 2, values);
        break;
      case "car":
        countMoneyPaid(foundData, "car", 1, 2, 2, 1, values);
        break;
      case "motorcycle":
        countMoneyPaid(foundData, "motorcycle", 0.5, 1, 1, 0.5, values);
        break;
      default:
        alert("Unsupported vehicle type");
    }

    setValues({ license: "" });
    setLicenseError("");
    toast.success("Vehicle left successfully!");
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Vehicle Exit</h2>
      <form className="parking-form" onSubmit={onSubmitHandler}>
        <div className="form-group">
          <p className="exit-license-error">{licenseError}</p>
          <label htmlFor="exitPlateNumber" className="form-label">
            License Plate Number
          </label>
          <input
            type="text"
            name="license"
            onChange={handleChange}
            value={values.license}
            id="exitPlateNumber"
            className="form-input"
            placeholder="Enter plate number to exit"
            style={
              licenseError.length > 0
                ? { border: "1px solid  #dc2626" }
                : { border: "1px solid #d1d5db" }
            }
          />
        </div>

        <button type="submit" className="form-button primary">
          Process Exit
        </button>
      </form>
    </div>
  );
};

export default VehicleExitForm;
