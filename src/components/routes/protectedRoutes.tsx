import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "@/hooks/useTypedRTK";
import { selectAppAuthenticated } from "@/store/selectors/app.selector";

const ProtectedRoutes = () => {
  const authenticated = useAppSelector(selectAppAuthenticated);

  return authenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
