import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

// eslint-disable-next-line react-refresh/only-export-components
const BlazorMountPoint = "js-root";

const render = () =>
  ReactDOM.createRoot(document.getElementById(BlazorMountPoint)!).render(
    import.meta.env.MODE === "development" ? (
      // React.StrictModeは開発モードでuseEffectを2回呼び出して、useEffectの副作用を検出するのに役に立つ
      // しかしuseEffectが2回呼び出されるとuseEffectのcleanupでBlazor ComponentのDisposeが走るため、外している
      <App />
    ) : (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  );

// call from Blazor
export const renderJSComponent = render;
