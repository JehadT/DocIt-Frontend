import api from "../utils/api";
import { useParams } from "react-router-dom";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";


export default function DownloadAllFilesButton({ form, setError }) {
  const { id } = useParams();
  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/downloadManyFiles/${id}`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `${form.trainee.name} - ${form.trainee.track} - ${form.trainee.nationalId}.zip`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setError('')
    } catch (error) {
      if (error.response) {
        const blob = error.response.data;
    
        // Convert Blob to JSON
        const text = await blob.text();
        const errorData = JSON.parse(text); // Convert text to JSON
    
        setError("حدث خطأ ما") // Access the error message
      } else if (error.request) {
        console.log("No response received:", error.request);
      } else {
        console.log("Request setup error:", error.error);
      }
  }};
  return (
    <button
      className="w-auto flex items-center gap-2 bg-blue-500 border border-blue-500 text-white hover:bg-blue-400 font-bold py-4.5 px-3 rounded"
      onClick={() => handleDownload(id)}
    >
      <span>تحميل الكل</span>
      <ArrowDownTrayIcon className="w-5 h-5" />
    </button>
  );
}
