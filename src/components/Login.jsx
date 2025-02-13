import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const Login = ({
  isLoggedIn,
  setIsLoggedIn,
  customText,
  handleClosingMenu,
}) => {
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
    <div className="relative">
      {isLoggedIn ? (
        <button
          className="text-[#29504D] cursor-pointer hover:scale-102 font-bold"
          onClick={() => {
            handleLogout();
            handleClosingMenu();
          }}
        >
          تسجيل الخروج
        </button>
      ) : (
        <button
          className="text-[#29504D] cursor-pointer hover:scale-102 font-bold"
          onClick={togglePopup}
        >
          {buttonText}
        </button>
      )}

      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center  bg-black/50 z-50">
          <div
            className="bg-white p-6 rounded-3xl shadow-lg w-96 min-h-96 mx-3 sm:mx-auto"
            ref={popupRef}
          >
            <h2 className="text-xl font-bold mb-6 mt-6 text-center">
              تسجيل الدخول
            </h2>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium pb-2 mt-10">
                  البريد الإلكتروني <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    placeholder="البريد الإلكتروني"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-10 py-2 border rounded pl-10" // Added left padding
                  />
                  <UserIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium pb-2">
                  رقم المرور <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={password}
                    placeholder="رقم المرور"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-10 py-2 border rounded pl-10" // Added left padding
                  />
                  <LockClosedIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-[#29504D] font-bold cursor-pointer text-white py-2 rounded mt-5"
                onClick={handleClosingMenu}
              >
                تسجيل الدخول
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
