import { useNavigate } from "react-router-dom";

export default function ControlPanelButton() {
  const navigate = useNavigate();
  const handleClick = () => {
    localStorage.getItem("userType") == 1
      ? navigate("/supervisor")
      : navigate("/trainee");
  };
  return (
    <button onClick={handleClick}>
      {localStorage.getItem("userType") == 1 ? <p>لوحة التحكم</p> : <p>المستندات</p>}
    </button>
  );
}
