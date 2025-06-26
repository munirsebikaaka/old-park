import React, { useEffect, useState } from "react";
import "../../uniqueStyles/ParkingLot.css";
import { IoCloseSharp } from "react-icons/io5";
import { useUser } from "../../contexts/UserContext";

const TOTAL_SLOTS = 30;

const ParkingLot = () => {
  const { user } = useUser();

  const [parkingData, setParkingData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("parkingData")) || [];
    setParkingData(data);
  }, []);

  const userId = user?.employeeID;

  const userVehicles = parkingData.filter(
    (vehicle) => vehicle.identification === userId
  );

  const slotMap = Array(TOTAL_SLOTS).fill(null);
  userVehicles.forEach((vehicle) => {
    if (vehicle.slot >= 0 && vehicle.slot < TOTAL_SLOTS) {
      slotMap[vehicle.slot] = vehicle;
    }
  });

  const isFull = parkingData.length >= TOTAL_SLOTS;

  return (
    <div className="parking-container">
      <h2 className="parking-title">Parking Lots</h2>

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
              <div className="slot-label">
                {isOccupied ? <IoCloseSharp /> : i + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ParkingLot;
