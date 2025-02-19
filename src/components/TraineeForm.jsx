import React, { useState, useRef } from "react";
import api from "../utils/api";
import fileNames from "../utils/fileNames";
import ReturnedForm from "./ReturnedForm";
import FirstSubmission from "./FirstSubmission";
import Loading from "./Loading";

const TraineeForm = ({ userInfo, loading, setUpdate, form }) => {
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
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
    setError("");
    setSubmitting(true);
    const formData = new FormData();

    // Append each file with its fileNumber as part of the key
    Object.entries(files).forEach(([fileNumber, file]) => {
      if (file) {
        formData.append(`attachments[${fileNumber}]`, file);
      }
    });

    try {
      if (form) {
        await api.patch(`/updateForm/${form._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        if (Object.keys(files).length < 16 || Object.keys(files).length > 17) {
          setError("الرجاء إرفاق جميع المستندات");
          return;
        }
        await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
      setUpdate(true);
    } catch (error) {
      setError(error.response?.data?.msg || "حدث خطأ ما");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Loading />;
  return (
    <div>
      {form?.supervisorComments && (
        <div className="flex flex-col items-center text-center mb-3">
          <h1 className="font-bold">سبب الترجيع:</h1>
          <p className="text-red-500 font-bold">{form.supervisorComments}</p>
        </div>
      )}
      {form ? (
        <ReturnedForm
          userInfo={userInfo}
          attachments={form.attachments}
          files={files}
          setFiles={setFiles}
          triggerFileInput={triggerFileInput}
          error={error}
          handleSubmit={handleSubmit}
          submitting={submitting}
          fileInputs={fileInputs}
        />
      ) : (
        <FirstSubmission
          triggerFileInput={triggerFileInput}
          handleFileChange={handleFileChange}
          error={error}
          handleSubmit={handleSubmit}
          files={files}
          submitting={submitting}
          fileInputs={fileInputs}
        />
      )}
    </div>
  );
};

export default TraineeForm;
