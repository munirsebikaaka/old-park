export const keepLeftVehiclesData = (values) => {
  const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];
  const leftParkingData =
    JSON.parse(localStorage.getItem("leftParkingData")) || [];
  const leftCar = parkingData.find(
    (vehicle) => vehicle.license === values.license
  );
  if (leftCar) {
    leftParkingData.push({ ...leftCar, leftTime: new Date() });
  }
  localStorage.setItem("leftParkingData", JSON.stringify(leftParkingData));

  const updatedParkingData = parkingData.filter(
    (vehicle) => vehicle.license !== values.license
  );
  localStorage.setItem("parkingData", JSON.stringify(updatedParkingData));
};
