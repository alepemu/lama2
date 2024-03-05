import React from "react";
import ReactDOM from "react-dom/client";

import { Navbar } from "./components/Navbar.tsx";
import { Dashboard } from "./Dashboard";

import "./index.css";

import { store } from "./store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
      <Dashboard />
    </Provider>
  </React.StrictMode>
);
