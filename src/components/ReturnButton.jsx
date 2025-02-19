import { useState } from "react";
import api from "../utils/api";
import { useNavigate } from "react-router-dom";

export default function ReturnButton({ formId, selectedFiles }) {
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
      const body = { supervisorComments, selectedFiles };
      if (selectedFiles.length == 0) {
        setError("مطلوب إختيار ملف واحد على الأقل")
        return
      }
      await api.patch(`/returnForm/${formId}`, body);
      setSupervisorComments("");
      setIsOpen(false);
      navigate("/supervisor");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="text-center">
      {/* Return Button */}
      <button
        className="px-6 py-2 w-full md:flex-1 bg-green-400 text-white font-semibold rounded-xl hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => setIsOpen(true)}
        disabled={selectedFiles.length == 0}
      >
        ذكر السبب
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-80">
            <div className="text-center">
              {error && <p className="text-red-500 font-bold text-sm">{error}</p>}
            </div>
            <div className="mt-4">
              <input
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="سبب الترجيع..."
                value={supervisorComments}
                onChange={(e) => {
                  setSupervisorComments(e.target.value);
                  if (error) setError("");
                }}
              />
            </div>
            <div className="flex justify-center gap-4 mt-6">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => {
                  setIsOpen(false);
                  setError("");
                  setSupervisorComments("");
                }}
              >
                رجوع
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleReturning}
              >
                إرسال
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
