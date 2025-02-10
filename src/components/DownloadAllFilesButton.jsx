import api from "../utils/api";
import { useParams } from "react-router-dom";

export default function DownloadAllFilesButton({ form }) {
  const { id } = useParams();

  const handleDownload = async (id) => {
    try {
      const response = await api.get(`/downloadManyFiles/${id}`, {
        responseType: "blob", 
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${(form.trainee.name)} - ${form.trainee.track} - ${form.trainee.nationalId}.zip`); 
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the files:", error);
    }
  };
  return (
    <button className="btn btn-primary" onClick={() => handleDownload(id)}>تحميل جميع المستندات</button>
  );
}
