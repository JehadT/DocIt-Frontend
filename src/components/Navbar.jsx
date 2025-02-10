import { Link } from "react-router-dom";
import Login from "./Login";
import ControlPanelButton from "./ControlPanelButton";
import { useState } from "react";

export default function Navbar({
  isLoggedIn,
  setIsLoggedIn,
}) {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">
            <button>الصفحة الرئيسية</button>
          </Link>
        </li>
        <li>
          <Link to="/about">
            <button>عن البرنامج</button>
          </Link>
        </li>
        <li>
          <Login
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
          />
        </li>
        <li>{isLoggedIn && <ControlPanelButton />}</li>
      </ul>
    </div>
  );
}
