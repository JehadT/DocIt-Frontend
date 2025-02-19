import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../utils/api";
import AttachmentsList from "../components/AttachmentsList";
import FormButton from "../components/FormButton";
import ReturnButton from "../components/ReturnButton";
import DownloadAllFilesButton from "../components/DownloadAllFilesButton";
import Loading from "../components/Loading";

export default function Form() {
  const { id } = useParams();
  const [form, setForm] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isClickedForReturned, setIsClickedForReturned] = useState(false);
  const [showReasonButton, setShowReasonButton] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [showTellingMsg, setShowTellingMsg] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await api.get(`/getForm/${id}`);
        setForm(response.data);
      } catch (error) {
        console.error("Error fetching form data:", error);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleShowCheckboxes = () => {
    window.scrollTo({ top: 200, behavior: "smooth" });
    setIsClickedForReturned(!isClickedForReturned);
    setShowReasonButton(!showReasonButton);
    setShowButton(!showButton);
    setShowTellingMsg(!showTellingMsg);
  };

  const handleApproval = async () => {
    try {
      await api.patch(`/approveForm/${id}`);
      navigate("/supervisor");
    } catch (error) {
      console.error("Error approving form:", error);
    }
  };

  const handleDeclining = async () => {
    try {
      await api.patch(`/declineForm/${id}`);
      navigate("/supervisor");
    } catch (error) {
      console.error("Error declining form:", error);
    }
  };

  if (loading) return <Loading />;
  if (!form) return <p>تعذر تحميل البيانات.</p>;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-3xl mx-auto p-6 flex flex-col text-[#29504D] rounded mt-8 mb-4">
        <h2 className="text-2xl text-center font-bold mb-8">معلومات المتدرب</h2>
        <div className="flex text-center flex-row gap-2 w-full">
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <strong>الاسم:</strong>
              <p>{form.trainee?.name}</p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <strong>المسار:</strong>
              <p>{form.trainee?.track}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <strong>التخصص الجامعي:</strong>
              <p>{form.trainee?.major}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <strong>رقم الهوية:</strong>
              <p>{form.trainee?.nationalId}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <strong>رقم الجوال:</strong>
              <p>0{form.trainee?.phoneNumber}</p>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <strong>الإيميل:</strong>
              <p>{form.trainee?.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-3 sm:mx-auto p-5 md:p-16 text-[#29504D] shadow-md rounded-3xl border border-[#E0E0E0] bg-white mb-8">
        <h1 className="text-2xl font-bold text-center mb-6">مستندات المتدرب</h1>

        <div className="flex justify-between items-center mb-6 sm:mb-4">
          <div className="flex flex-col sm:gap-1 items-start font-bold">
            <p>الحالة:</p>
            <p className="text-black">{form.status}</p>

            <div className="flex flex-col sm:gap-1 items-start font-bold mt-4">
              {form.supervisorComments && (
                <>
                  <p>السبب:</p>
                  <p className="text-black">{form.supervisorComments}</p>
                </>
              )}
              {error && (
                <h1 className="text-center text-red-500 font-bold">{error}</h1>
              )}
            </div>
          </div>
          <DownloadAllFilesButton form={form} setError={setError} />
        </div>
        {showTellingMsg && (
          <h1 className="text-center text-red-500 font-bold md:my-4">
            الرجاء إختيار الملفات المطلوب تعديلها
          </h1>
        )}
        {/* Attachments List */}
        <AttachmentsList
          attachments={form.attachments}
          setError={setError}
          selectedFiles={selectedFiles}
          setSelectedFiles={setSelectedFiles}
          isClickedForReturned={isClickedForReturned}
          showButton={showButton}
        />

        {/* Buttons below AttachmentsList, aligned left */}
        <div className="flex flex-col-reverse md:flex-row justify-center gap-4 w-full mt-6">
          {showButton && (
            <FormButton
              buttonName={"رفض"}
              classes={
                "px-6 py-2 w-full md:flex-1 bg-red-400 text-white font-semibold rounded-xl hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-300"
              }
              handleClick={handleDeclining}
            />
          )}
          <div className="text-center">
            {showButton && (
              <button
                className="px-6 py-2 w-full md:flex-1 bg-gray-400 text-white text-center font-semibold rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                onClick={handleShowCheckboxes}
              >
                إرجاع للتعديل
              </button>
            )}
          </div>
          {showReasonButton && (
            <div className="flex flex-col-reverse md:flex-row justify-center gap-4 w-full mt-6">
              <div className="text-center">
                <button
                  className="px-6 py-2 w-full md:flex-1 bg-gray-400 text-white font-semibold rounded-xl hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  onClick={handleShowCheckboxes}
                >
                  الخلف
                </button>
              </div>
              <ReturnButton formId={id} selectedFiles={selectedFiles} />
            </div>
          )}
          {showButton && (
            <FormButton
              buttonName={"موافقة"}
              classes={
                "px-6 py-2 w-full md:flex-1 bg-green-400 text-white font-semibold rounded-xl hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              }
              handleClick={handleApproval}
            />
          )}
        </div>
      </div>
    </div>
  );
}
