import { keepLeftVehiclesData } from "./storeLeftVehicles";
const parkingData = JSON.parse(localStorage.getItem("parkingData")) || [];
const startTime = (values) =>
  parkingData.find((el) => el.license === values.license)?.startTime;

export const countMoneyPaid = (
  data,
  vehicle,
  nightExtraPay,
  dayExtraPay,
  realDayPayment,
  realNightPayment,
  values
) => {
  if (data.vehicleType !== vehicle) return;

  const startDate = new Date(startTime(values));
  const currentDate = new Date();
  const differenceInMilliseconds = currentDate - startDate;
  const hoursPassed = differenceInMilliseconds / (1000 * 60 * 60);

  const startHour = startDate.getHours();
  let parkingCost = 0;

  if (startHour >= 6 && startHour < 18) {
    const timeBeforeNight = 18 - startHour;
    if (hoursPassed > timeBeforeNight) {
      const dayHours = timeBeforeNight;
      const nightHours = hoursPassed - dayHours;

      const dayCost = dayHours * realDayPayment;
      const nightCost = nightHours * nightExtraPay;

      parkingCost = dayCost + nightCost;
    } else {
      parkingCost = hoursPassed * realDayPayment;
    }
  } else {
    let timeBeforeDay;
    if (startHour >= 18) {
      timeBeforeDay = 24 - startHour + 6;
    } else {
      timeBeforeDay = 6 - startHour;
    }

    if (hoursPassed > timeBeforeDay) {
      const nightHours = timeBeforeDay;
      const dayHours = hoursPassed - nightHours;

      const nightCost = nightHours * realNightPayment;
      const dayCost = dayHours * dayExtraPay;

      parkingCost = nightCost + dayCost;
    } else {
      parkingCost = hoursPassed * realNightPayment;
    }
  }

  alert(
    `You parked for ${hoursPassed.toFixed(
      2
    )} hours and you gona pay $${parkingCost.toFixed(2)} ${data.vehicleType}`
  );

  keepLeftVehiclesData(values);
};
