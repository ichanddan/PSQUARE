import { useState } from "react";
import "./auth.css";
import { Eye, EyeOff } from "lucide-react";
import Rectangle from "../../assets/Rectangle.png";
import { API } from "../../services";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const route = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await API.Signup(formData, "Registration Successful", "Registering...")
      .then((res) => {
        if (res.data) {
          setFormData({
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          route("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <div className="logo-container">
        <div className="logo">
          <div className="logo-square"></div>
          <span>LOGO</span>
        </div>
      </div>

      <div className="main-content">
        <div className="left-panel">
          <div className="dashboard-preview">
            <img
              src={Rectangle}
              alt="Dashboard Preview"
              className="dashboard-image"
            />
          </div>

          <div className="left-panel-text">
            <h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod
            </h2>
            <p>
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
              minim veniam, quis nostrud exercitation ullamco laboris nisi ut
              aliquip ex ea commodo consequat.
            </p>
          </div>

          <div className="slider-dots">
            <span
              className={`dot ${currentSlide === 0 ? "active" : ""}`}
              onClick={() => handleDotClick(0)}
            ></span>
            <span
              className={`dot ${currentSlide === 1 ? "active" : ""}`}
              onClick={() => handleDotClick(1)}
            ></span>
            <span
              className={`dot ${currentSlide === 2 ? "active" : ""}`}
              onClick={() => handleDotClick(2)}
            ></span>
          </div>
        </div>

        <div className="right-panel">
          <div className="form-container">
            <h1>Welcome to Dashboard</h1>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="fullname">
                  Full name<span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Full name"
                  required
                  onChange={handleInputChange}
                  name="name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">
                  Email Address<span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Email Address"
                  required
                  onChange={handleInputChange}
                  name="email"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">
                  Password<span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="Password"
                    required
                    onChange={handleInputChange}
                    name="password"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">
                  Confirm Password<span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    placeholder="Confirm Password"
                    required
                    onChange={handleInputChange}
                    name="confirmPassword"
                  />
                  <button
                    type="button"
                    className="toggle-password"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <button type="submit" className="register-button">
                Register
              </button>
            </form>

            <div className="login-link">
              Already have an account? <a href="/login">Login</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
