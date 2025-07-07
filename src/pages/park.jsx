import { useEffect, useState } from "react";
import "../uniqueStyles/parkingForms.css";
import { useUser } from "../contexts/UserContext";
import { toast } from "react-toastify";

const VehicleEntryForm = () => {
  const { user } = useUser();
  const userId = user?.employeeID;

  const [values, setValues] = useState({
    license: "",
    vehicleType: "",
    selectedSlot: "",
  });

  const [vehicleTypeErorr, setVehicleTypeError] = useState("");
  const [licenseErorr, setLicenseError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];
    const totalSlots = 50;

    const usedSlots = parkingData.map((v) => v.slot);
    const freeSlots = Array.from({ length: totalSlots }, (_, index) =>
      usedSlots.includes(index) ? null : index
    ).filter((s) => s !== null);

    setAvailableSlots(freeSlots);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const { license, vehicleType, selectedSlot } = values;

    if (!license)
      return setLicenseError("Please enter your license plate number");
    setLicenseError("");

    if (!selectedSlot) return setSlotError("Please select a slot");
    setSlotError("");

    if (!vehicleType)
      return setVehicleTypeError("Please select your vehicle type");
    setVehicleTypeError("");

    const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

    const newVehicle = {
      slot: Number(selectedSlot),
      license,
      vehicleType,
      identification: userId,
      startTime: new Date(),
    };

    parkingData.push(newVehicle);
    localStorage.setItem("parkingData", JSON.stringify(parkingData));
    toast.success("Vehicle Parked successfully!");

    setValues({ license: "", vehicleType: "", selectedSlot: "" });
    // Update available slots
    setAvailableSlots((prev) => prev.filter((s) => s !== Number(selectedSlot)));
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
          <label htmlFor="selectedSlot" className="form-label">
            Available Slots
          </label>
          <select
            name="selectedSlot"
            id="selectedSlot"
            className="form-input"
            onChange={handleChange}
            value={values.selectedSlot}
            style={{
              border: slotError ? "1px solid #dc2626" : "1px solid #d1d5db",
            }}
          >
            <option value="">Select a slot</option>
            {availableSlots.map((slot) => (
              <option key={slot} value={slot}>
                Slot {slot + 1}
              </option>
            ))}
          </select>
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
