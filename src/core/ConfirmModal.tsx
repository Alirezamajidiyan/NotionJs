import React from "react";
import ReactDOM from "react-dom/client";

interface ConfirmModalProps {
  message: string;
  onConfirm: (confirmed: boolean) => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({ message, onConfirm }) => {
  return (
    <div className="confirm-modal">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={() => onConfirm(true)}>بله</button>
        <button onClick={() => onConfirm(false)}>خیر</button>
      </div>
    </div>
  );
};

export function showConfirmModal(
  message: string,
  onConfirm: (confirmed: boolean) => void
): void {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = ReactDOM.createRoot(container);
  root.render(<ConfirmModal message={message} onConfirm={onConfirm} />);
}
