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
  const startTime = () => {
    const startTime = parkingData.find(
      (el) => el.license === values.license
    )?.startTime;
    return startTime;
  };

  const calculateMinutesPassed = () => {
    if (!startTime()) return "nothing";
    const currentTime = new Date();
    const differenceInMilliseconds = currentTime - new Date(startTime());
    const minutesPassed = differenceInMilliseconds / (1000 * 60);
    return Math.floor(minutesPassed);
  };
  const dayTime = () => {
    const startTime = new Date();
    const startHour = startTime.getHours();
    return startHour >= 6 && startHour < 18;
  };
  const nightTime = () => {
    const startTime = new Date();
    const startHour = startTime.getHours();
    return startHour >= 18 || startHour < 6;
  };

  const countMoneyPaid = (
    data,
    vehicle,
    nightExtraPay,
    dayExtraPay,
    realDayPayment,
    realNightPayment
  ) => {
    let isDayTime;
    let isNightTime;
    let parkingCoast = 0;

    const startParkingTime = new Date(startTime()).getHours();
    let minutesPassed = calculateMinutesPassed();

    if (dayTime()) isDayTime = true;
    if (nightTime()) isNightTime = true;
    if (
      isDayTime &&
      startParkingTime >= 6 &&
      startParkingTime < 18 &&
      data.vehicleType === vehicle
    ) {
      parkingCoast = (minutesPassed / 60) * realDayPayment;
      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    } else if (
      isDayTime &&
      startParkingTime >= 18 &&
      data.vehicleType === vehicle
    ) {
      const timeBeforeDayTime = 18 - startParkingTime;
      const timeBeforeDayTimeMinutes = timeBeforeDayTime * 60;
      const extraMinutes = minutesPassed - timeBeforeDayTimeMinutes;

      if (extraMinutes > 0) {
        const extraParkingCost = extraMinutes * dayExtraPay;
        const parkingShiftTimeCost =
          timeBeforeDayTimeMinutes * realNightPayment;
        parkingCoast = extraParkingCost + parkingShiftTimeCost;
      } else {
        parkingCoast = minutesPassed * realNightPayment;
      }

      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    } else if (
      isDayTime &&
      startParkingTime < 6 &&
      data.vehicleType === vehicle
    ) {
      const timeBeforeDayTime = 6 - startParkingTime;
      const timeBeforeDayTimeMinutes = timeBeforeDayTime * 60;
      const extraMinutes = minutesPassed - timeBeforeDayTimeMinutes;

      if (extraMinutes > 0) {
        const extraParkingCost = extraMinutes * dayExtraPay;
        const parkingShiftTimeCost =
          timeBeforeDayTimeMinutes * realNightPayment;
        parkingCoast = extraParkingCost + parkingShiftTimeCost;
      } else {
        parkingCoast = minutesPassed * realNightPayment;
      }

      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    } else if (
      isNightTime &&
      startParkingTime >= 18 &&
      data.vehicleType === vehicle
    ) {
      parkingCoast = minutesPassed * realNightPayment;
      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    } else if (
      isNightTime &&
      startParkingTime < 6 &&
      data.vehicleType === vehicle
    ) {
      parkingCoast = minutesPassed * realNightPayment;
      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    } else if (
      isNightTime &&
      startParkingTime >= 6 &&
      startParkingTime < 18 &&
      data.vehicleType === vehicle
    ) {
      const timeBeforeNightTime = 18 - startParkingTime;
      const timeBeforeNightTimeMinutes = Math.abs(timeBeforeNightTime * 60);
      const extraMinutes = minutesPassed - timeBeforeNightTimeMinutes;
      if (extraMinutes > 0) {
        const extraParkingCost = extraMinutes * nightExtraPay;
        const parkingShiftTimeCost =
          timeBeforeNightTimeMinutes * realDayPayment;
        parkingCoast = extraParkingCost + parkingShiftTimeCost;
      } else {
        parkingCoast = minutesPassed * realDayPayment;
      }

      console.log(
        `u hv spent ${(minutesPassed / 60).toFixed(
          2
        )} hours, u gona pay ${parkingCoast.toFixed(2)}`
      );

      let leftParkingData = [];
      leftParkingData =
        JSON.parse(localStorage.getItem("leftParkingData")) || [];
      const leftCar = parkingData.find(
        (vehicle) => vehicle.license === values.license
      );
      leftParkingData.push(leftCar);
      localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

      const updatedParkingData = parkingData.filter(
        (vehicle) => vehicle.license !== values.license
      );
      localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { license } = values;
    if (!license)
      return setLicenseError("Please enter your license plate number");
    const data = parkingData.find((el) => el.license === license);
    if (data) {
      countMoneyPaid(data, "truck", 2, 3, 3, 2);
      countMoneyPaid(data, "car", 1, 2, 2, 1);
      countMoneyPaid(data, "motorcycle", 0.5, 1, 1, 0.5);
      setValues({ license: "" });
      setLicenseError("");
    } else {
      setLicenseError("License plate not found");
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Vehicle Exit</h2>
      <form className="parking-form" onSubmit={onSubmitHandler}>
        <p className="exit-license-error">{licenseError}</p>
        <div className="form-group">
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
