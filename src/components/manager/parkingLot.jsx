import { useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";
import "../../uniqueStyles/ParkingLot.css";

const totalSlots = 50;

const ParkingLot = () => {
  const { user } = useUser();
  const userId = user?.employeeID;

  const [parkingSlots, setParkingSlots] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const allData = JSON.parse(localStorage.getItem("parkingData")) || {};
    const userData = allData[userId] || [];

    const slots = Array.from({ length: totalSlots }, (_, index) => {
      const vehicle = userData.find((v) => v.slot === index);
      return {
        slotId: index,
        occupied: !!vehicle,
        vehicle: vehicle || null,
      };
    });

    setParkingSlots(slots);
  }, [userId]);

  if (!userId) {
    return (
      <div className="parking-container">
        <h2 className="parking-title">Parking Lots</h2>
        <p>Please log in to view your parking slots.</p>
      </div>
    );
  }

  const isFull = parkingSlots.every((slot) => slot.occupied);

  return (
    <div className="parking-container">
      <h2 className="parking-title">My Parking Slots</h2>

      {isFull && (
        <div className="full-message">
          🚫 All 50 of your slots are occupied.
        </div>
      )}

      <div className="parking-lot">
        {parkingSlots.map((slot) => (
          <div
            key={slot.slotId}
            className={`parking-slot ${slot.occupied ? "occupied" : "free"}`}
          >
            <div className="slot-details">
              <p className="slot-lisence">{slot?.vehicle?.license}</p>
              <p className="slot-vehicleType">{slot?.vehicle?.vehicleType}</p>
            </div>
            <div className="slot-label">
              {slot.occupied ? <IoCloseSharp /> : slot.slotId + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParkingLot;
