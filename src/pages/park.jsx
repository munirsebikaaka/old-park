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

  const [vehicleTypeError, setVehicleTypeError] = useState("");
  const [licenseError, setLicenseError] = useState("");
  const [slotError, setSlotError] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const allData = JSON.parse(localStorage.getItem("parkingData")) || {};
    const userData = allData[userId] || [];

    const usedSlots = userData.map((v) => v.slot);
    const totalSlots = 50;

    const freeSlots = Array.from({ length: totalSlots }, (_, index) =>
      usedSlots.includes(index) ? null : index
    ).filter((s) => s !== null);

    setAvailableSlots(freeSlots);
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!userId) return toast.error("You must be logged in.");

    const { license, vehicleType, selectedSlot } = values;

    if (!license) return setLicenseError("Please enter license number");
    setLicenseError("");

    if (!selectedSlot) return setSlotError("Please select a slot");
    setSlotError("");

    if (!vehicleType) return setVehicleTypeError("Select vehicle type");
    setVehicleTypeError("");

    const allData = JSON.parse(localStorage.getItem("parkingData")) || {};
    const userData = allData[userId] || [];

    // Prevent duplicate slot
    if (userData.some((v) => v.slot === Number(selectedSlot))) {
      toast.error("Slot already used.");
      return;
    }

    const newVehicle = {
      slot: Number(selectedSlot),
      license,
      vehicleType,
      identification: userId,
      startTime: new Date(),
    };

    const updatedUserData = [...userData, newVehicle];
    allData[userId] = updatedUserData;
    localStorage.setItem("parkingData", JSON.stringify(allData));

    toast.success("Vehicle parked successfully!");

    setValues({ license: "", vehicleType: "", selectedSlot: "" });

    setAvailableSlots((prev) => prev.filter((s) => s !== Number(selectedSlot)));
  };

  if (!userId) {
    return (
      <div className="entry-form-wrapper">
        <h2 className="entry-form-heading">Vehicle Entry</h2>
        <p className="entry-form-message">
          Please log in to register your vehicle.
        </p>
      </div>
    );
  }

  return (
    <div className="entry-form-wrapper">
      <h2 className="entry-form-heading">Vehicle Entry</h2>
      <form className="entry-parking-form" onSubmit={onSubmitHandler}>
        <div className="entry-form-group">
          <p className="entry-error-license">{licenseError}</p>
          <label htmlFor="plateNumber" className="entry-form-label">
            License Plate Number
          </label>
          <input
            type="text"
            name="license"
            onChange={handleChange}
            value={values.license}
            id="plateNumber"
            className="entry-form-input"
            placeholder="ABC 1234"
            style={{
              border: licenseError ? "1px solid #dc2626" : "1px solid #d1d5db",
            }}
          />
        </div>

        <div className="entry-form-group">
          <p className="entry-error-slot">{slotError}</p>
          <label htmlFor="selectedSlot" className="entry-form-label">
            Available Slots
          </label>
          <select
            name="selectedSlot"
            id="selectedSlot"
            className="entry-form-input"
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

        <div className="entry-form-group">
          <p className="entry-error-vehicle-type">{vehicleTypeError}</p>
          <label htmlFor="vehicleType" className="entry-form-label">
            Vehicle Type
          </label>
          <select
            id="vehicleType"
            className="entry-form-input"
            name="vehicleType"
            onChange={handleChange}
            value={values.vehicleType}
            style={{
              border: vehicleTypeError
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

        <button type="submit" className="entry-form-button primary-btn">
          Register Vehicle
        </button>
      </form>
    </div>
  );
};

export default VehicleEntryForm;
