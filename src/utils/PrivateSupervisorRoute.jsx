import { Navigate } from "react-router-dom";

const PrivateSupervisorRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType == 1 ? children : <Navigate to="/" />;
};

export default PrivateSupervisorRoute;
