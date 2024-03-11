import "./index.css";

// Vercel Analytics
import { Analytics } from "@vercel/analytics/react";

import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import Providers from "./components/providers/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <Analytics />
    <App />
  </Providers>
);
