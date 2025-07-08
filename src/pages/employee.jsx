import ParkingLot from "../components/manager/parkingLot";
import ParkingPieChart from "../components/manager/pieChart";
import "../uniqueStyles/ManagerPage.css";

const EmployeePage = () => {
  return (
    <div className="manager-page">
      <div className="manager-body">
        <ParkingPieChart />
        <ParkingLot />
      </div>
    </div>
  );
};
export default EmployeePage;
