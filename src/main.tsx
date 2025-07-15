// import { StrictMode } from "react";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { MicAccessProvider } from "./context/MicAccessContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import "./styles/index.scss";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MicAccessProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MicAccessProvider>
  </React.StrictMode>
);
