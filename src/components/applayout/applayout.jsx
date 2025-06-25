import { Outlet } from "react-router-dom";
import Navigation from "../../features/nav";
import "../../uniqueStyles/applayout.css";
import Header from "./header";

const AppLayout = ({ user }) => {
  return (
    <div className="layout">
      <Navigation />
      <div className="layout-content">
        <Header user={user} />
        <main className="main-section">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
