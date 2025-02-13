import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Login from "./Login";
import ControlPanelButton from "./ControlPanelButton";
import logo from "../assets/logo.svg";

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => setIsOpen(false);

  return (
    <nav className="bg-white p-3 flex justify-between items-center shadow-md w-full sticky top-0 z-50 px-10">
      <Link to="/" onClick={handleClick}>
        <img
          src={logo}
          alt="logo"
          height="120px"
          width="120px"
          className="text-white text-lg font-bold"
        />
      </Link>
      
      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-[#29504D]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={30} /> : <Menu size={30} />}
      </button>
      
      <div className={`md:flex space-x-5 ${isOpen ? "block" : "hidden"} absolute md:relative top-full left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none md:flex-row flex-col items-center md:items-center p-5 md:p-0`}>
        <Link to="/" className="text-[#29504D] cursor-pointer hover:scale-102 font-bold block md:inline" onClick={handleClick}>
          الصفحة الرئيسية
        </Link>
        <Link to="/about" className="text-[#29504D] cursor-pointer hover:scale-102 font-bold block md:inline" onClick={handleClick}>
          عن الموقع
        </Link>
        {isLoggedIn && <ControlPanelButton handleClosingMenu={handleClick} />}
        <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} handleClosingMenu={handleClick} />
      </div>
    </nav>
  );
}
