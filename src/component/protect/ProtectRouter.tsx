import { Navigate } from "react-router-dom";

interface ProtectRouterProps {
  children: React.ReactNode;
}

export default function ProtectRouter({ children }: ProtectRouterProps) {
  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
}
