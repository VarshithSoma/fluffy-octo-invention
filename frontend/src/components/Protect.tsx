import { Navigate } from "react-router-dom";

export const Protect = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <></>;
};
