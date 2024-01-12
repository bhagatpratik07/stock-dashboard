import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { StockProvider } from "./contexts/StockContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <StockProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </StockProvider>
  </React.StrictMode>
);
