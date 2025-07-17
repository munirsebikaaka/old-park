import { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "../../uniqueStyles/PieChart.css";
import { useUser } from "../../contexts/UserContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const ParkingPieChart = () => {
  const [parkingData, setParkingData] = useState({});
  const { user } = useUser();
  const userId = user?.employeeID;

  useEffect(() => {
    const dataFromStorage =
      JSON.parse(localStorage.getItem("parkingData")) || {};
    setParkingData(dataFromStorage);
  }, []);

  const userVehicles = Array.isArray(parkingData[userId])
    ? parkingData[userId]
    : [];

  const vehicleCounts = userVehicles.reduce(
    (acc, item) => {
      const type = item.vehicleType.toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    { car: 0, truck: 0, motorcycle: 0 }
  );

  const data = {
    labels: ["Cars", "Trucks", "Motorcycles"],
    datasets: [
      {
        data: [
          vehicleCounts.car,
          vehicleCounts.truck,
          vehicleCounts.motorcycle,
        ],
        backgroundColor: ["#e67e22", "#2c3e50", "#7f8c8d"],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "var(--text-color)",
          font: {
            family: "var(--font-family)",
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Vehicle Type Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default ParkingPieChart;
