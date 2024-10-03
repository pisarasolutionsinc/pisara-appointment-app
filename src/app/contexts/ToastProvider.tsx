import {
  createContext,
  useState,
  useContext,
  useCallback,
  ReactNode,
} from "react";
import Toast from "../components/others/Toast";

interface ToastContextType {
  showToast: (
    message: string,
    type: "success" | "error" | "info",
    positionClasses: string
  ) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

interface ToastProviderProp {
  children: ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProp) => {
  const [toasts, setToasts] = useState<
    {
      id: number;
      message: string;
      type: "success" | "error" | "info";
      positionClasses: string;
    }[]
  >([]);

  const showToast = useCallback(
    (
      message: string,
      type: "success" | "error" | "info",
      positionClasses: string
    ) => {
      const id = Date.now();
      setToasts((prevToasts) => [
        ...prevToasts,
        { id, message, type, positionClasses },
      ]);
      setTimeout(() => {
        setToasts((prevToasts) =>
          prevToasts.filter((toast) => toast.id !== id)
        );
      }, 3000);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() =>
              setToasts((prevToasts) =>
                prevToasts.filter((t) => t.id !== toast.id)
              )
            }
            positionClasses={toast.positionClasses}
          />
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
