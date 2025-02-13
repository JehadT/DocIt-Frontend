import { useState } from "react";

export default function FormButton({ handleClick, buttonName, classes }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center">
      <button
        className={classes}
        onClick={() => setIsOpen(true)}
      >
        {buttonName}
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-white p-10 rounded-lg shadow-lg w-80">
            <div className="text-center">
              <p className="text-lg font-semibold">تأكيد</p>
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <button
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg shadow-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-400"
                onClick={() => setIsOpen(false)}
              >
                رجوع
              </button>
              <button
                className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={handleClick}
              >
                متابعة
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
