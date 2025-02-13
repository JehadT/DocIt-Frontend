import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TraineeForm from "../components/TraineeForm";
import UserInfo from "../components/UserInfo";
import api from "../utils/api";

export default function Trainee() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState(null);
  const [update, setUpdate] = useState(false)
  const [form, setForm] = useState([])
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
        const form = await api.get('/getFormByTraineeId')
        setUserInfo(response.data);
        setForm(form.data)
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [update]);

  return (
    <div className="min-h-screen">
      <UserInfo userInfo={userInfo} loading={loading} />
      <TraineeForm userInfo={userInfo} loading={loading} setUpdate={setUpdate} form={form} />
    </div>
  );
}
