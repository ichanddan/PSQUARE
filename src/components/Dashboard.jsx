import Header from "./Header";
import "./dashboard.css";
import Sidebar from "./SideBar";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content1" style={{background:'white'}}>
        <Header />
        {children}
      </div>
    </div>
  );
};

export default Dashboard;
