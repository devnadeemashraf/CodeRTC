import { BrowserRouter, Route, Routes } from "react-router-dom";

import ProtectedRoutes from "@/components/routes/protectedRoutes";

import { Toaster as Sonner } from "@/components/ui/sonner";

import LoadingOverlay from "./components/shared/loadingOverlay";

// Update File
import Home from "./pages/Home";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import Playground from "@/pages/Playground";

import RouteNotFound from "@/pages/RouteNotFound";

import useAuth from "./hooks/useAuth";

const App = () => {
  const authenticating = useAuth();

  if (authenticating) {
    return <LoadingOverlay text="Checking for active Session.." />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />

          <Route path="/playground/:roomId" element={<Playground />} />
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<RouteNotFound />} />
      </Routes>
      <Sonner duration={3000} position="top-center" />
    </BrowserRouter>
  );
};

export default App;
