import "./dashboard.css";
import Header from "./Header";
import Sidebar from "./SideBar";

const Dashboard = ({ children }) => {
  // const { user, isAuthenticated } = useSelector((state) => state.auth);
  // const route = useNavigate();
  // useEffect(() => {
  //   if (isAuthenticated) {
  //     route("/");
  //   } else {
  //     route("/login");
  //   }
  // }, [isAuthenticated]);
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
