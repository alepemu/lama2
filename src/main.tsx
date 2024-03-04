import React from "react";
import ReactDOM from "react-dom/client";
import { Dashboard } from "./Dashboard.tsx";
import { Navbar } from "./components/Navbar.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Navbar />
    <Dashboard />
  </React.StrictMode>
);
