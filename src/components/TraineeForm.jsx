import React, { useState, useRef } from "react";
import api from "../utils/api";
import fileNames from "../utils/fileNames";

const TraineeForm = ({ userInfo, loading, setUpdate, form }) => {
  const [files, setFiles] = useState({});
  const fileInputs = useRef({});
  const handleFileChange = (e, key) => {
    setFiles({ ...files, [key]: e.target.files[0] });
  };

  const triggerFileInput = (key) => {
    if (fileInputs.current[key]) {
      fileInputs.current[key].click();
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(files).length !== Object.keys(fileNames).length) {
      alert("الرجاء إرفاق جميع المستندات");
      return;
    }

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append("attachments", file);
    });

    try {
      if (form) {
        const response = await api.patch(`/updateForm/${form._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert(response.data.message);
      } else {
        const response = await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert(response.data.message);
      }
      setUpdate(true);
    } catch (error) {
      alert(error.response?.data?.error || "حدث خطأ ما");
    }
  };

  if (loading) return <p></p>;
  return (
    <div className="div4">
      {userInfo.hasSubmittedForm ? (
        <h2>تم إرسال المتطلبات</h2>
      ) : (
        <div>
          <h2>المستندات</h2>
          {form?.supervisorComments && (
            <p>سبب الترجيع: {form.supervisorComments}</p>
          )}
          {Object.entries(fileNames).map(([key, label]) => (
            <div key={key}>
              <button
                className="btn btn-primary"
                onClick={() => triggerFileInput(key)}
              >
                إرفاق
              </button>
              <input
                type="file"
                ref={(el) => (fileInputs.current[key] = el)}
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e, key)}
              />
              <span>{label}</span>
              {files[key] && <span> {files[key].name}</span>}
            </div>
          ))}
          <button
            onClick={handleSubmit}
            disabled={
              Object.keys(files).length !== Object.keys(fileNames).length
            }
          >
            إرسال
          </button>
        </div>
      )}
    </div>
  );
};

export default TraineeForm;
