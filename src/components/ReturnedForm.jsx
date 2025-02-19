import fileNames from "../utils/fileNames";

const ReturnedForm = ({
  userInfo,
  attachments,
  files,
  setFiles,
  triggerFileInput,
  error,
  handleSubmit,
  submitting,
  fileInputs,
}) => {
  const handleFileChange = (e, key) => {
    setFiles({...files, [key]: e.target.files[0] });
  };

  return (
    <div className="max-w-3xl mx-3 sm:mx-auto p-5 text-[#29504D] shadow-md flex justify-center rounded-3xl border border-[#E0E0E0] bg-white mb-6">
      {userInfo.hasSubmittedForm ? (
        <h2 className="text-2xl font-bold p-3">تم إرسال المتطلبات</h2>
      ) : (
        <div>
          <h2 className="text-2xl font-bold text-center mt-4 mb-8">
            إعادة رفع
          </h2>
          {attachments
            .filter((file) => file.isReturned === "true")
            .map(({ fileNumber, fileName, _id }) => (
              <div
                key={_id}
                className="flex items-center justify-between gap-20 md:gap-60 py-4 border-b border-gray-300"
              >
                <span className="mr-2 font-bold">
                  {fileNames[fileNumber]}
                  {fileNumber < 17 && <span className="text-red-500"> *</span>}
                </span>
                <div className="flex items-center">
                  <button
                    className="bg-transparent border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded"
                    onClick={() => triggerFileInput(fileNumber)}
                  >
                    إرفاق
                  </button>
                  <input
                    type="file"
                    accept=".pdf, .doc, .docx, .xlsx, .xls"
                    ref={(el) => (fileInputs.current[fileNumber] = el)}
                    className="hidden"
                    onChange={(e) => handleFileChange(e, fileNumber)}
                  />
                  <span className="text-gray-700 min-w-[24px] text-center mr-6">
                    {files[fileNumber] && <p>&#9989;</p>}
                  </span>
                </div>
              </div>
            ))}
          {error && <h1 className="mt-4 text-center text-red-500">{error}</h1>}
          <div className="flex justify-center">
            <button
              className="mt-4 bg-transparent border border-green-500 text-green-500 hover:bg-green-100 font-bold py-2 px-4 rounded disabled:border-gray-600 disabled:text-gray-600 disabled:hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={submitting || Object.keys(files).length !== attachments.filter((file) => file.isReturned === "true").length}
            >
              {submitting ? "جاري الإرسال..." : "إرسال"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReturnedForm;
