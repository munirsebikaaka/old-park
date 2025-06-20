import { Outlet } from "react-router-dom";
import Navigation from "../../features/nav";
import "../../uniqueStyles/applayout.css";
import Header from "./header";

const AppLayout = () => {
  return (
    <div className="layout">
      <Navigation />
      <div className="layout-content">
        <Header />
        <main className="main-section">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
