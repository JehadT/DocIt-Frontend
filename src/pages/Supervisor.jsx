import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Submissions from "../components/Submissions";
import SearchFilter from "../components/SearchFilter";
import api from "../utils/api";

export default function Supervisor() {
  const [forms, setForms] = useState([]);
  const [originalForms, setOriginalForms] = useState([])
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/userInfo");
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="parent">
      <UserInfo userInfo={userInfo} loading={loading} />
      <SearchFilter setForms={setForms} originalForms={originalForms} />
      <Submissions forms={forms} setForms={setForms} setOriginalForms={setOriginalForms} />
    </div>
  );
}
