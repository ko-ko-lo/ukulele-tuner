type ToastProps = {
  message: string;
  type?: "success" | "error";
};

export const Toast: React.FC<ToastProps> = ({ message, type = "success" }) => {
  return <div className={`toast ${type}`}>{message}</div>;
};
