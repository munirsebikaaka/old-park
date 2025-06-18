import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// import "./ParkingPieChart.css"; // Import custom styles
import "../uniqueStyles/pieChart.css";

// Register necessary parts of Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

const ParkingPieChart = () => {
  // State to hold parsed parking data
  const [parkingData, setParkingData] = useState([]);

  // useEffect will run once when the component is mounted
  useEffect(() => {
    // Read parking data from localStorage (as a string)
    const dataFromStorage = localStorage.getItem("parkingData");

    if (dataFromStorage) {
      // Convert string to JavaScript array
      const parsedData = JSON.parse(dataFromStorage);
      setParkingData(parsedData);
    } else {
      // If no data is found, log it (optional)
      console.log("No parking data found in localStorage.");
    }
  }, []); // Empty dependency array = runs once on mount

  // Count number of each vehicle type
  const vehicleCounts = parkingData.reduce(
    (acc, item) => {
      const type = item.vehicleType.toLowerCase();
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    },
    { car: 0, truck: 0, motorcycle: 0 }
  );

  // Prepare data for the pie chart
  const data = {
    labels: ["Cars", "Trucks", "Motorcycles"],
    datasets: [
      {
        data: [
          vehicleCounts.car,
          vehicleCounts.truck,
          vehicleCounts.motorcycle,
        ],
        backgroundColor: ["#e67e22", "#2c3e50", "#7f8c8d"], // Color for each slice
        borderColor: "#fff", // Slice border color
        borderWidth: 2,
      },
    ],
  };

  // Chart options for styling
  const options = {
    responsive: true, // Makes chart adjust to screen size
    plugins: {
      legend: {
        position: "bottom",
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
