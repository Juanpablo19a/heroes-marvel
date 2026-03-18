import { StrictMode } from "react";
import { BrowserRouter } from "react-router-dom";
import "./styles.css";
import { HeroesApp } from "./HeroesApp.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <HeroesApp />
    </BrowserRouter>
  </StrictMode>
);
