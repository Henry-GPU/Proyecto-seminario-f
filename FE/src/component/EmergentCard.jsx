import { useState, useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle, X } from "lucide-react";

const icons = {
  success: <CheckCircle className="text-green-500" />,
  error: <XCircle className="text-red-500" />,
  info: <Info className="text-blue-500" />,
  warning: <AlertTriangle className="text-yellow-500" />,
};

const bgColors = {
  success: "bg-green-100 border-green-500",
  error: "bg-red-100 border-red-500",
  info: "bg-blue-100 border-blue-500",
  warning: "bg-yellow-100 border-yellow-500",
};

export default function EmergentMessage({ message, type = "info", duration = 3000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  return (
    <div className={`fixed ml-5 top-5 right-5 flex items-center gap-3 border-l-4 p-3 shadow-lg rounded-md ${bgColors[type]}`}>
      {icons[type]}
      <span className="text-gray-800">{message}</span>
      <button onClick={() => setVisible(false)} className="ml-auto">
        <X className="text-gray-500 hover:text-gray-700" />
      </button>
    </div>
  );
}
