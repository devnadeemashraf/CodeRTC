import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/hooks/useTypedRTK";
import { RootState } from "@/store";

const ProtectedRoutes = () => {
  const authenticated = useAppSelector((state: RootState) => {
    return state.app.authenticated;
  });

  return authenticated == true ? <Outlet /> : <Navigate to="/register" />;
};

export default ProtectedRoutes;
