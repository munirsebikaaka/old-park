import { useState } from "react";
import "../uniqueStyles/parkingForms.css";

const VehicleExitForm = () => {
  const [values, setValues] = useState({ license: "" });
  const [licenseError, setLicenseError] = useState("");
  const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const startTime = () =>
    parkingData.find((el) => el.license === values.license)?.startTime;

  const keepLeftVehiclesData = (values) => {
    const leftParkingData =
      JSON.parse(localStorage.getItem("leftParkingData")) || [];
    const leftCar = parkingData.find(
      (vehicle) => vehicle.license === values.license
    );
    if (leftCar) {
      leftParkingData.push({ ...leftCar, leftTime: new Date() });
    }
    localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

    const updatedParkingData = parkingData.filter(
      (vehicle) => vehicle.license !== values.license
    );
    localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
  };

  const countMoneyPaid = (
    data,
    vehicle,
    nightExtraPay,
    dayExtraPay,
    realDayPayment,
    realNightPayment
  ) => {
    if (data.vehicleType !== vehicle) return;

    const startDate = new Date(startTime());
    const currentDate = new Date();
    const differenceInMilliseconds = currentDate - startDate;
    const hoursPassed = differenceInMilliseconds / (1000 * 60 * 60);

    const startHour = startDate.getHours();
    let parkingCost = 0;

    if (startHour >= 6 && startHour < 18) {
      const timeBeforeNight = 18 - startHour;
      if (hoursPassed > timeBeforeNight) {
        const dayHours = timeBeforeNight;
        const nightHours = hoursPassed - dayHours;

        const dayCost = dayHours * realDayPayment;
        const nightCost = nightHours * nightExtraPay;

        parkingCost = dayCost + nightCost;
      } else {
        parkingCost = hoursPassed * realDayPayment;
      }
    } else {
      let timeBeforeDay;
      if (startHour >= 18) {
        timeBeforeDay = 24 - startHour + 6;
      } else {
        timeBeforeDay = 6 - startHour;
      }

      if (hoursPassed > timeBeforeDay) {
        const nightHours = timeBeforeDay;
        const dayHours = hoursPassed - nightHours;

        const nightCost = nightHours * realNightPayment;
        const dayCost = dayHours * dayExtraPay;

        parkingCost = nightCost + dayCost;
      } else {
        parkingCost = hoursPassed * realNightPayment;
      }
    }

    alert(
      `You parked for ${hoursPassed.toFixed(
        2
      )} hours and you gona pay $${parkingCost.toFixed(2)} ${data.vehicleType}`
    );

    keepLeftVehiclesData(values);
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
        countMoneyPaid(data, "truck", 2, 3, 3, 2);
        break;
      case "car":
        countMoneyPaid(data, "car", 1, 2, 2, 1);
        break;
      case "motorcycle":
        countMoneyPaid(data, "motorcycle", 0.5, 1, 1, 0.5);
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
                ? { border: "1px solid  #991b1b" }
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
