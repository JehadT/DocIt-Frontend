import ControlPanelButton from "./ControlPanelButton";
import Login from "./Login";

export default function HomeButton({ isLoggedIn, setIsLoggedIn, customText }) {
  return isLoggedIn ? (
    <ControlPanelButton />
  ) : (
    <Login
      isLoggedIn={isLoggedIn}
      setIsLoggedIn={setIsLoggedIn}
      customText={customText}
    />
  );
}
