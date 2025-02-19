import api from "../utils/api";
import fileNames from "../utils/fileNames";

const AttachmentsList = ({
  attachments,
  setError,
  selectedFiles,
  setSelectedFiles,
  isClickedForReturned,
  showButton,
}) => {
  const handleCheckbox = (fileNumber) => {
    // Check if the fileNumber is already in selectedFiles
    if (selectedFiles.includes(fileNumber)) {
      // If yes, remove it from selectedFiles
      setSelectedFiles(selectedFiles.filter((item) => item !== fileNumber));
    } else {
      // If no, add it to selectedFiles
      setSelectedFiles([...selectedFiles, fileNumber]);
    }
  };
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
      setError("");
    } catch (error) {
      setError("حدث خطأ ما");
      console.error("Error downloading the file:", error);
    }
  };

  return (
    <div>
      {attachments.map((attachment, index) => (
        <div
          key={attachment._id}
          className="flex items-center justify-between py-4 border-b border-gray-300"
        >
          <div className="flex items-center px-4 md:px-0 gap-2">
            {isClickedForReturned && (
              <input
                type="checkbox"
                onClick={() => handleCheckbox(attachment.fileNumber)}
              />
            )}
            <span className="font-bold">{fileNames[index + 1]}</span>
          </div>
          {showButton && (
            <button
              className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold py-2 px-10 rounded"
              onClick={() =>
                handleDownload(attachment._id, attachment.fileName)
              }
            >
              تحميل
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default AttachmentsList;
