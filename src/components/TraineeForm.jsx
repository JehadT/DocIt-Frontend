import React, { useState, useRef } from "react";
import api from "../utils/api";
import fileNames from "../utils/fileNames";
import Loading from "../components/Loading";

const TraineeForm = ({ userInfo, loading, setUpdate, form }) => {
  const [files, setFiles] = useState({});
  const [error, setError] = useState("");
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
      setError("الرجاء إرفاق جميع المستندات");
      return;
    }
    setError("");

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => {
      if (file) formData.append("attachments", file);
    });

    try {
      if (form) {
        await api.patch(`/updateForm/${form._id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await api.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setUpdate(true);
    } catch (error) {
      setError(error.response?.data?.msg || "حدث خطأ ما");
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
      <div className="max-w-3xl mx-3 sm:mx-auto p-6 text-[#29504D] shadow-md flex justify-center rounded-3xl border border-[#E0E0E0] bg-white mb-6">
        {userInfo.hasSubmittedForm ? (
          <h2 className="text-2xl font-bold p-3">تم إرسال المتطلبات</h2>
        ) : (
          <div>
            <h2 className="text-2xl font-bold text-center mt-4 mb-8">
              المستندات المطلوبة
            </h2>
            {Object.entries(fileNames).map(([key, label]) => (
              <div
                key={key}
                className="flex items-center justify-between gap-20 py-4 border-b border-gray-300"
              >
                <span className="mr-2 font-bold">{label}</span>
                <div className="flex items-center">
                  <button
                    className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded"
                    onClick={() => triggerFileInput(key)}
                  >
                    إرفاق
                  </button>
                  <input
                    type="file"
                    ref={(el) => (fileInputs.current[key] = el)}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, key)}
                  />
                  <span className="text-gray-700 min-w-[24px] text-center mr-6">
                    {files[key] && <p>&#9989;</p>}
                  </span>
                </div>
              </div>
            ))}
            {error && (
              <h1 className="mt-4 text-center text-red-500">{error}</h1>
            )}
            <div className="flex justify-center">
              <button
                className="mt-4 bg-transparent border border-green-500 text-green-500 hover:bg-green-100 font-bold py-2 px-4 rounded disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSubmit}
                disabled={
                  Object.keys(files).length !== Object.keys(fileNames).length
                }
              >
                إرسال
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TraineeForm;
