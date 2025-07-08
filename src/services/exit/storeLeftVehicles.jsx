export const keepLeftVehiclesData = (values) => {
  const parkingData = JSON.parse(localStorage.getItem("parkingData")) || {};
  const leftParkingData =
    JSON.parse(localStorage.getItem("leftParkingData")) || [];

  let userIdWithVehicle = null;
  let leftCar = null;

  for (const userId in parkingData) {
    const userVehicles = parkingData[userId];
    if (Array.isArray(userVehicles)) {
      const match = userVehicles.find((v) => v.license === values.license);
      if (match) {
        leftCar = match;
        userIdWithVehicle = userId;
        break;
      }
    }
  }

  if (leftCar && userIdWithVehicle) {
    leftParkingData.push({ ...leftCar, leftTime: new Date() });

    const updatedUserVehicles = parkingData[userIdWithVehicle].filter(
      (v) => v.license !== values.license
    );
    parkingData[userIdWithVehicle] = updatedUserVehicles;

    localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));
    localStorage.setItem("parkingData", JSON.stringify(parkingData));
  } else {
    console.warn("Vehicle with license not found:", values.license);
  }
};
