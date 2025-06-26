import { useEffect, useState } from "react";

import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

import "../../uniqueStyles/PieChart.css";
import { useUser } from "../../contexts/UserContext";

// Register necessary chart features (pie slices, tooltips, and legends)
ChartJS.register(ArcElement, Tooltip, Legend);

const ParkingPieChart = () => {
  const [parkingData, setParkingData] = useState([]);
  const { user } = useUser();

  useEffect(() => {
    const dataFromStorage = JSON.parse(localStorage.getItem("parkingData"));

    if (dataFromStorage) {
      setParkingData(dataFromStorage);
    }
  }, []);

  const userId = user?.employeeID;

  const userVehicles = parkingData?.filter(
    (vehicle) => vehicle.identification === userId
  );

  const vehicleCounts = userVehicles.reduce(
    (acc, item) => {
      const type = item.vehicleType.toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    { car: 0, truck: 0, motorcycle: 0 }
  );

  // ------------------------------
  // PIE CHART DATA CONFIGURATION
  // ------------------------------

  // This defines the data that will be shown in the pie chart
  const data = {
    labels: ["Cars", "Trucks", "Motorcycles"], // These are the names that will appear in the legend and tooltips
    datasets: [
      {
        // This array defines the actual values shown in the pie chart
        data: [
          vehicleCounts.car, // Number of cars
          vehicleCounts.truck, // Number of trucks
          vehicleCounts.motorcycle, // Number of motorcycles
        ],
        // Background color for each slice (in order)
        backgroundColor: [
          "#e67e22", // orange for cars
          "#2c3e50", // dark blue for trucks
          "#7f8c8d", // gray for motorcycles
        ],
        // Border color for slices
        borderColor: "#fff", // white borders between slices
        borderWidth: 2, // thickness of the borders
      },
    ],
  };

  // ------------------------------
  // PIE CHART OPTIONS/SETTINGS
  // ------------------------------

  // These settings control how the pie chart behaves and looks
  const options = {
    responsive: true, // Makes the chart adjust to the container size
    plugins: {
      legend: {
        position: "top", // Shows the legend at the top
        labels: {
          color: "var(--text-color)", // Uses a CSS variable for legend text color
          font: {
            family: "var(--font-family)", // Font family from your CSS
            size: 14, // Font size for legend labels
          },
        },
      },
    },
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Vehicle Type Distribution</h2>

      {/* Render the pie chart using the data and options defined above */}
      <Pie data={data} options={options} />
    </div>
  );
};

export default ParkingPieChart;
