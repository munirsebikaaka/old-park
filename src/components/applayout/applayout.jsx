import { Outlet } from "react-router-dom";
import Navigation from "../../features/nav";
import Header from "./header";

const Applayout = () => {
  return (
    <div className="applayout">
      <Header />
      <Navigation />
      <main className="main-section">
        <Outlet />
      </main>
    </div>
  );
};
export default Applayout;
