import { useEffect, useState } from "react";
import "../../uniqueStyles/ParkingLot.css";
import { IoCloseSharp } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";

const totalSlots = 50;

const ParkingLot = () => {
  const { user } = useUser();
  const [parkingSlots, setParkingSlots] = useState([]);

  useEffect(() => {
    const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];

    const slots = Array.from({ length: totalSlots }, (_, index) => {
      const occupied = parkingData.find((v) => v.slot === index);
      return {
        slotId: index,
        occupied: !!occupied,
        vehicle: occupied || null,
      };
    });

    setParkingSlots(slots);
  }, []);

  const isFull = parkingSlots.every((slot) => slot.occupied);

  return (
    <div className="parking-container">
      <h2 className="parking-title">Parking Lots</h2>

      {isFull && (
        <div className="full-message">🚫 All parking slots are occupied.</div>
      )}

      <div className="parking-lot">
        {parkingSlots.map((slot) => (
          <div
            key={slot.slotId}
            className={`parking-slot ${slot.occupied ? "occupied" : "free"}`}
          >
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
