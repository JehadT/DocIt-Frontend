import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserInfo from "../components/UserInfo";
import Submissions from "../components/Submissions";
import SearchFilter from "../components/SearchFilter";
import api from "../utils/api";

export default function Supervisor() {
  const [forms, setForms] = useState([]);
  const [originalForms, setOriginalForms] = useState([]);
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
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  return (
    <div className="container mx-auto sm:mt-8 p-8 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between">
        <UserInfo userInfo={userInfo} loading={loading} />
        <div className="border-t border-gray-300 my-4 sm:hidden" />
        <SearchFilter setForms={setForms} originalForms={originalForms} />
      </div>
      <div className="mt-2">
        <div className="border-t border-gray-300 my-4 sm:hidden" />
        <Submissions
          forms={forms}
          setForms={setForms}
          setOriginalForms={setOriginalForms}
        />
      </div>
    </div>
  );
}
