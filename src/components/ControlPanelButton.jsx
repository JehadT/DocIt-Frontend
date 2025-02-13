import { useNavigate } from "react-router-dom";

export default function ControlPanelButton({ handleClosingMenu }) {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.getItem("userType") == 1
      ? navigate("/supervisor")
      : navigate("/trainee");
  };
  return (
    <button
      className="text-[#29504D] cursor-pointer hover:scale-102 font-bold"
      onClick={() => {
        handleClick();
        handleClosingMenu;
      }}
    >
      {localStorage.getItem("userType") == 1 ? (
        <p>لوحة التحكم</p>
      ) : (
        <p>المستندات</p>
      )}
    </button>
  );
}
