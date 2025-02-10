import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isLoggedIn, setIsLoggedIn, customText }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
  const navigate = useNavigate();
  const buttonText = customText || (!isLoggedIn && "تسجيل الدخول");

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.user.userType);
        setIsLoggedIn(true);
        setShowPopup(false);
        setEmail("");
        setPassword("");
        response.data.user.userType == 1
          ? navigate("/supervisor")
          : navigate("/trainee");
      }
    } catch (err) {
      console.log(err);
      setError("البريد الإلكتروني أو رقم المرور غير صحيح");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    if (!showPopup) return;

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPopup]);

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={handleLogout}>تسجيل الخروج</button>
      ) : (
        <button onClick={togglePopup}>{buttonText}</button>
      )}

      {showPopup && (
        <div className="login-popup">
          <div className="popup-content" ref={popupRef}>
            <h2>تسجيل الدخول</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleLogin}>
              <label>البريد الإلكتروني</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label>رقم المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit">متابعة</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
