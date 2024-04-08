import MainLayout from "@/components/shared/layouts/mainLayout";
import { Link } from "react-router-dom";

const RouteNotFound = () => {
  return (
    <MainLayout className="flex items-center justify-center">
      <h1 className="text-4xl text-muted">(°ロ°)</h1>
      <Link
        to="/"
        className="text-muted mt-4 font-mono underline underline-offset-8"
      >
        you shouldn't be here! go back to home!
      </Link>
    </MainLayout>
  );
};

export default RouteNotFound;
