import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

const useAutoLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const data = localStorage.getItem("userSession");

    if (!data) return;

    try {
      const { expiresIn } = JSON.parse(data);
      if (!expiresIn) return;

      const expiresAt = new Date(expiresIn).getTime();
      const now = Date.now();

      if (now >= expiresAt) {
        dispatch(logout());
        navigate("/login");
      } else {
        const timeoutId = setTimeout(() => {
          dispatch(logout());
          navigate("/login");
        }, expiresAt - now);

        return () => clearTimeout(timeoutId);
      }
    } catch (error) {
      console.error("Invalid session data", error);
      dispatch(logout());
      navigate("/login");
    }
  }, [dispatch, navigate]);
};

export default useAutoLogout;
