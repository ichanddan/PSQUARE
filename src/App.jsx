import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Candidates from "./pages/candidates/Candidates";
import Home from "./pages/home/home";
import Employees from "./pages/employees/Employees";

function App() {
  const NotFound = () => <h1>404 - Page Not Found</h1>;

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
        <Route path="/candidates" element={<Candidates />} /> {/* 404 Page */}
        <Route path="/employees" element={<Employees />} /> {/* 404 Page */}
        <Route path="*" element={<NotFound />} /> {/* 404 Page */}
      </Routes>
    </Router>
  );
}

export default App;
