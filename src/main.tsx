import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import WorkoutContextProvider from "./context/WorkoutContextProvider.tsx";
import AuthContextProvider from "./context/AuthContextProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutContextProvider>
        <App />
      </WorkoutContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
