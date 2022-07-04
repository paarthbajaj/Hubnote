import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

export const Toast = () => {
  const { toast, setToast } = useAuth();
  useEffect(() => {
    setTimeout(() => {
      setToast({
        ...toast,
        showToast: false,
      });
    }, 2000);
  }, [toast.showToast]);
  return (
    <>
      {toast.showToast && (
        <div className="app-toast">
          <div className={`alert m-radius ${toast.type}`}>{toast.message}</div>
        </div>
      )}
    </>
  );
};
