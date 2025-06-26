import { useState } from "react";
import "../uniqueStyles/parkingForms.css";
import { countMoneyPaid } from "../services/exit/countMoney";

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
    const data = parkingData.find((el) => el.license === license);
    if (!data) {
      return setLicenseError("License plate not found");
    }

    switch (data.vehicleType) {
      case "truck":
        countMoneyPaid(data, "truck", 2, 3, 3, 2, values);
        break;
      case "car":
        countMoneyPaid(data, "car", 1, 2, 2, 1, values);
        break;
      case "motorcycle":
        countMoneyPaid(data, "motorcycle", 0.5, 1, 1, 0.5, values);
        break;
      default:
        alert("Unsupported vehicle type");
    }

    setValues({ license: "" });
    setLicenseError("");
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
