import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const BlazorMountPoint = "js-root";

const render = () =>
  ReactDOM.createRoot(document.getElementById(BlazorMountPoint)!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

// call from Blazor
export const renderJSComponent = render;
