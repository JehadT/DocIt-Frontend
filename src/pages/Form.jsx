import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AttachmentsList from "../components/AttachmentsList";
import DeclineButton from "../components/DeclineButton";
import ReturnButton from "../components/ReturnButton";
import ApproveButton from "../components/ApproveButton";
import DownloadAllFilesButton from "../components/DownloadAllFilesButton";


export default function Form() {
  const { id } = useParams();
  const [form, setForm] = useState([]);
  const [trainee, setTrainee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApproveButton, setShowApproveButton] = useState(true)
  const [showDeclineButton, setShowDeclineButton] = useState(true)
  const [showReturnButton, setShowReturnButton] = useState(true)

  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/getForm/${id}`); 
        setTrainee(response.data.trainee);
        setForm(response.data);
        console.log(response.data.trainee);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user info:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const handleApproval = async () => {
    try {
      await api.patch(`/approveForm/${id}`);
      navigate("/supervisor");
      setShowApproveButton(false)
      console.log("approved");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeclining = async () => {
    try {
      await api.patch(`/declineForm/${id}`);
      navigate("/supervisor");
      console.log("declined");
    } catch (error) {
      console.error("Error:", error);
    }
  };



  return (
    <div className="parent2">
      <div className="form-div3">
        {loading ? (
          <h1>...جارِ التحميل</h1>
        ) : (
          <>
          
            <div className="form-div1">
              <h1>معلومات المتدرب</h1>
              <p><strong>الاسم:</strong> {trainee.name}</p>
              <p>{trainee.email} <strong>:الإيميل</strong></p>
              <p><strong>الجنس:</strong> {trainee.gender}</p>
              <p>{trainee.nationalId} <strong>:رقم الهوية</strong></p>
              <p>0{trainee.phoneNumber} <strong>:رقم الجوال</strong></p>
              <p>{trainee.track} <strong>:المسار</strong></p>
              <p><strong>التخصص الجامعي:</strong> {trainee.major}</p>
            </div>
            <div className="form-div2">
              <h1>مستندات المتدرب</h1>
              <DownloadAllFilesButton form={form}/>
              <AttachmentsList attachments={form.attachments} />
              <ApproveButton
                handleClick={handleApproval}
                showApproveButton={showApproveButton}
              />
              <ReturnButton formId={id}/>
              <DeclineButton handleClick={handleDeclining} />
              <p>الحالة: {form.status}</p>
              {form?.supervisorComments && <p>السبب: {form.supervisorComments}</p>}
              </div>
          </>
        )}
      </div>
    </div>
  );
}
