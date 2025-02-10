import { useState } from "react";

export default function DeclineButton({ handleClick }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="text-center">
      <button className="btn btn-primary" onClick={() => setIsOpen(true)}>
        رفض
      </button>

      {isOpen && (
        <div className="modal">
          <div className="modal-dialog">
            <div className="modal-body">
              <p>تأكيد</p>
            </div>
            <div className="modal-footer">
              <button className="btn btn-success" onClick={handleClick}>
                متابعة
              </button>
              <button
                className="btn btn-danger"
                onClick={() => setIsOpen(false)}
              >
                رجوع
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
