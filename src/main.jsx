import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// style sheet
import "./index.css";
import "./styles/itemdetails.css";
import "./styles/login.css";
import "./styles/navbar.css";
import "./styles/yourcart.css";
import "./styles/buystatus.css";

const root = document.getElementById("root");
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
