import { CheckCircle2, XCircle, X } from "lucide-react";

function Toast({ type, message, onDismiss }) {
  const isSuccess = type === "success";

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-icon">
        {isSuccess ? (
          <CheckCircle2 size={20} color="var(--color-success)" />
        ) : (
          <XCircle size={20} color="var(--color-danger)" />
        )}
      </div>
      <p className="toast-message">{message}</p>
      <button className="toast-close" onClick={onDismiss} aria-label="Dismiss">
        <X size={16} />
      </button>
    </div>
  );
}

export default Toast;
