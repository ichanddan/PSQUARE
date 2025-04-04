import { Link } from "react-router-dom";
import "./sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo">LOGO</div>
      </div>

      <div className="sidebar-search">
        <input type="text" placeholder="Search" />
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Recruitment</h3>
        <ul className="nav-list">
          <li className="nav-item active">
            <Link to="/candidates" className="nav-link">
              <span className="icon">👥</span>
              <span className="text">Candidates</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Organization</h3>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/employees" className="nav-link">
              <span className="icon">👤</span>
              <span className="text">Employees</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/attendance" className="nav-link">
              <span className="icon">📊</span>
              <span className="text">Attendance</span>
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/leaves" className="nav-link">
              <span className="icon">🗓️</span>
              <span className="text">Leaves</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Others</h3>
      </div>

      <div className="sidebar-footer">
        <Link to="/logout" className="logout-link">
          <span className="icon">🚪</span>
          <span className="text">Logout</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
