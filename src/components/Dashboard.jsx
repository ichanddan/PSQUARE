import Header from "./Header";
import "./dashboard.css";
import Sidebar from "./SideBar";

const Dashboard = ({ children }) => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <Header />
        {children}
      </main>
    </div>
  );
};

export default Dashboard;
