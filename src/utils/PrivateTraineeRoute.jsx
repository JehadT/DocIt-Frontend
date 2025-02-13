import { Navigate } from "react-router-dom";

const PrivateTraineeRoute = ({ children }) => {
  const userType = localStorage.getItem("userType");
  return userType == 2 ? children : <Navigate to="/" />;
};

export default PrivateTraineeRoute;
