import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Candidates from "./pages/candidates/Candidates";
import Employees from "./pages/employees/Employees";
import Home from "./pages/home/home";
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Attendance from "./pages/attendance/Attendance";
import Leaves from "./pages/leaves/Leaves";

function App() {
  const NotFound = () => <h1>404 - Page Not Found</h1>;

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/candidates" element={<Candidates />} />{" "}
            {/* 404 Page */}
            <Route path="/employees" element={<Employees />} /> {/* 404 Page */}
            <Route path="/attendance" element={<Attendance />} />{" "}
            {/* 404 Page */}
            <Route path="/leaves" element={<Leaves />} /> 404 Page
            <Route path="*" element={<NotFound />} /> {/* 404 Page */}
          </Routes>
          <Toaster position="bottom-center" reverseOrder={false} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
