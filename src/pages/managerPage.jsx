import ParkingLot from "../components/manager/parkingLot";
import ParkingPieChart from "../components/manager/pieChart";
import "../uniqueStyles/ManagerPage.css";

const ManagerPage = ({ user }) => {
  return (
    <div className="manager-page">
      <div className="manager-body">
        <ParkingPieChart user={user} />
        <ParkingLot user={user} />
      </div>
    </div>
  );
};
export default ManagerPage;
