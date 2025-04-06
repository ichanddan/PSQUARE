import { Link, useLocation, useNavigate } from "react-router-dom";
import "./sidebar.css";
import {
  ChartNoAxesColumnIncreasing,
  LogOut,
  Sparkles,
  UserPlus,
  UsersRound,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";

const Sidebar = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const route = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    route("/login");
  };

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
          <li
            className={`nav-item ${pathname === "/candidates" ? "active" : ""}`}
          >
            <Link to="/candidates" className="nav-link">
              <span className="icon">
                <UserPlus size={15} />
              </span>
              <span className="text">Candidates</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Organization</h3>
        <ul className="nav-list">
          <li
            className={`nav-item ${pathname === "/employees" ? "active" : ""}`}
          >
            <Link to="/employees" className="nav-link">
              <span className="icon">
                <UsersRound size={15} />
              </span>
              <span className="text">Employees</span>
            </Link>
          </li>
          <li
            className={`nav-item ${pathname === "/attendance" ? "active" : ""}`}
          >
            <Link to="/attendance" className="nav-link">
              <span className="icon">
                <ChartNoAxesColumnIncreasing size={15} />
              </span>
              <span className="text">Attendance</span>
            </Link>
          </li>
          <li className={`nav-item ${pathname === "/leaves" ? "active" : ""}`}>
            <Link to="/leaves" className="nav-link">
              <span className="icon">
                <Sparkles size={15} />
              </span>
              <span className="text">Leaves</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Others</h3>
        <div className="sidebar-footer" onClick={handleLogout}>
          <span className="icon">
            <LogOut size={15} />
          </span>
          <span className="text">Logout</span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
