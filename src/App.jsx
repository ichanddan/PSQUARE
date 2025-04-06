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
import ProtectedRoute from "./components/ProtectedRoute"; // ⬅️ import it

function App() {
  const NotFound = () => <h1>404 - Page Not Found</h1>;

  return (
    <Router>
      <WithAutoLogout />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/candidates"
          element={
            <ProtectedRoute>
              <Candidates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/employees"
          element={
            <ProtectedRoute>
              <Employees />
            </ProtectedRoute>
          }
        />
        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />
        <Route
          path="/leaves"
          element={
            <ProtectedRoute>
              <Leaves />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-center" reverseOrder={false} />
    </Router>
  );
}

function WithAutoLogout() {
  useAutoLogout();
  return null;
}

export default App;
