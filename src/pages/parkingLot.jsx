import React, { useEffect, useState } from "react";
import "../uniqueStyles/ParkingLot.css";
const TOTAL_SLOTS = 50;

const ParkingLot = () => {
  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    // Get actual data from localStorage
    const data = JSON.parse(localStorage.getItem("parkingData")) || [];
    setParkingData(data);
  }, []);

  // Create a slot map: slotIndex => vehicle
  const slotMap = Array(TOTAL_SLOTS).fill(null);
  parkingData.forEach((vehicle) => {
    if (vehicle.slot >= 0 && vehicle.slot < TOTAL_SLOTS) {
      slotMap[vehicle.slot] = vehicle;
    }
  });

  const isFull = parkingData.length >= TOTAL_SLOTS;

  return (
    <div className="parking-container">
      <h2 className="parking-title">Parking Lot</h2>

      {isFull && (
        <div className="full-message">🚫 All parking slots are occupied.</div>
      )}

      <div className="parking-lot">
        {slotMap.map((vehicle, i) => {
          const isOccupied = !!vehicle;

          return (
            <div
              key={i}
              className={`parking-slot ${isOccupied ? "occupied" : "free"}`}
            >
              <div className="slot-label">Slot {i + 1}</div>
              {isOccupied && (
                <div className="vehicle-info">
                  <div className="plate">{vehicle.license}</div>
                  <div className="type">{vehicle.vehicleType}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkingLot;
