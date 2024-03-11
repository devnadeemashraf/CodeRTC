import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "@/components/routes/protectedRoutes";
import { Toaster } from "@/components/ui/toaster";

import Home from "@/pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";

import RouteNotFound from "@/pages/RouteNotFound";
import useAuth from "./hooks/useAuth";

const App = () => {
  const [loading] = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
};

export default App;
