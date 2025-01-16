// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MicAccessProvider } from "./components/MicAccessContext.tsx";
import "./index.scss";

createRoot(document.getElementById("root")!).render(
  //<StrictMode>
  <MicAccessProvider>
    <App />
  </MicAccessProvider>
  //</StrictMode>
);
