import React from "react";
import ReactDOM from "react-dom/client";

import { Provider } from "react-redux";
import { store } from "./store";

import { Navbar } from "./components/Navbar.tsx";
import { Dashboard } from "./Dashboard";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Navbar />
      <Dashboard />
    </Provider>
  </React.StrictMode>
);
