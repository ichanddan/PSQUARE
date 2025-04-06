import Header from "./Header";
import "./dashboard.css";
import Sidebar from "./SideBar";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const route = useNavigate();
  useEffect(() => {
    if (!isAuthenticated) {
      route("/login");
    }
  }, [isAuthenticated]);
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content1" style={{ background: "white" }}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
