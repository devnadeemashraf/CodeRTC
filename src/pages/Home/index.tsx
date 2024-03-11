import MainLayout from "@/components/shared/layouts/mainLayout";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/useTypedRTK";
import { logoutUser } from "@/http";
import { resetAppState } from "@/store/slices/appSlice";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoading(true);

    logoutUser().finally(() => {
      dispatch(resetAppState());
      navigate("/login");
      setLoading(false);
    });
  };
  return (
    <MainLayout>
      <h1>welcome home</h1>
      <Button disabled={loading} onClick={handleLogout}>
        Logout
      </Button>
    </MainLayout>
  );
};

export default Home;
