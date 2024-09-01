import { useCallback } from "react";
import type { HybridWebView as HybridWebViewType } from "../utils/HybridWebView";

declare global {
  interface Window {
    HybridWebView: HybridWebViewType;
  }

  interface WindowEventMap {
    HybridWebViewMessageReceived: CustomEvent<{ message: string }>;
  }
}

export const useHybridWebView = () => {
  const sendInvokeMessageToDotNetAsync = useCallback(
    (methodName: string, paramValues: any[]) => {
      const timestamp = performance.now().toString();
      window.HybridWebView.SendRawMessage(
        JSON.stringify({ timestamp, methodName, paramValues })
      );
      return new Promise((resolve) => {
        const cb: Parameters<
          typeof addEventListener<"HybridWebViewMessageReceived">
        >[1] = (ev) => {
          const parsedMessage = JSON.parse(ev.detail.message);
          if (
            parsedMessage.timestamp === timestamp &&
            parsedMessage.methodName === methodName
          ) {
            window.removeEventListener("HybridWebViewMessageReceived", cb);
            resolve(parsedMessage.value);
          }
        };
        window.addEventListener("HybridWebViewMessageReceived", cb);
      });
    },
    []
  );

  return {
    sendInvokeMessageToDotNetAsync,
  };
};
