import "./index.css";

// Vercel Analytics on Production
import { Analytics } from "@vercel/analytics/react";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import Providers from "./components/providers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    {/* {import.meta.env.VITE_ENV !== "development" ? <Analytics /> : null} */}
    <App />
  </Providers>
);
