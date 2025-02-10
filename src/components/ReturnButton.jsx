import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function ReturnButton({ formId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [supervisorComments, setSupervisorComments] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleReturning = async () => {
    if (!supervisorComments.trim()) {
      setError("الرجاء ذكر السبب");
      return;
    }
    setError("");
    try {
      const body = { supervisorComments };
      await api.patch(`/returnForm/${formId}`, body);
      setSupervisorComments("");
      setIsOpen(false);
      navigate("/supervisor");
      console.log("returned");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-center">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        إرجاع للتعديل
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-header">
              {error && <h5 className="error-text">{error}</h5>}
            </div>
            <div className="modal-body">
              <input
                placeholder="...سبب الترجيع"
                value={supervisorComments}
                onChange={(e) => {
                  setSupervisorComments(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleReturning}>
                متابعة
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                  setSupervisorComments('')
                }}
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
