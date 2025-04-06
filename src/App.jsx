import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Attendance from "./pages/attendance/Attendance";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import useAutoLogout from "./pages/hooks/AuthLogout";
import Candidates from "./pages/candidates/Candidates";
import Employees from "./pages/employees/Employees";
import Home from "./pages/home/home";
import Leaves from "./pages/leaves/Leaves";

function App() {
  const NotFound = () => <h1>404 - Page Not Found</h1>;

  return (
    <Router>
      <WithAutoLogout /> {/* Mounted AFTER Router is initialized */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/leaves" element={<Leaves />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Router>
  );
}

// This ensures useNavigate() is called safely
function WithAutoLogout() {
  useAutoLogout();
  return null;
}

export default App;
