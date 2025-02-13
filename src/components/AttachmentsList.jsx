import api from "../utils/api";
import fileNames from "../utils/fileNames";

const AttachmentsList = ({ attachments }) => {
  const handleDownload = async (id, fileName) => {
    try {
      const response = await api.get(`/downloadSingleFile/${id}`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div>
      {attachments.map((attachment, index) => (
        <div
          key={attachment._id}
          className="flex items-center justify-between gap-6 py-4 border-b border-gray-300"
        >
          <span className="font-bold">{fileNames[index + 1]}</span>
          <div className="flex items-center">
            <button
              className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold py-2 px-10 rounded "
              onClick={() =>
                handleDownload(attachment._id, attachment.fileName)
              }
            >
              تحميل
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttachmentsList;
