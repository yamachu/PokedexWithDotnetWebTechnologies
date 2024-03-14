import { useCallback } from "react";
import type { HybridWebView as HybridWebViewType } from "../utils/HybridWebView";

declare global {
  interface Window {
    HybridWebView: HybridWebViewType;
  }
}

// BasedType: https://learn.microsoft.com/ja-jp/dotnet/api/system.threading.tasks.task?view=net-8.0
type DotnetTaskResult = {
  Result: any;
};

export const useHybridWebView = () => {
  const sendRawMessageToDotNet = useCallback((message: string) => {
    window.HybridWebView.SendRawMessageToDotNet(message);
  }, []);

  const sendInvokeMessageToDotNet = useCallback(
    (methodName: string, paramValues: any[]) => {
      window.HybridWebView.SendInvokeMessageToDotNet(methodName, paramValues);
    },
    []
  );

  const sendInvokeMessageToDotNetAsync = useCallback(
    (methodName: string, paramValues: any[]) => {
      return window.HybridWebView.SendInvokeMessageToDotNetAsync(
        methodName,
        paramValues
      );
    },
    []
  );

  const sendInvokeMessageToDotNetAsyncTask = useCallback(
    (methodName: string, paramValues: any[]): Promise<DotnetTaskResult> => {
      return window.HybridWebView.SendInvokeMessageToDotNetAsync(
        methodName,
        paramValues
      );
    },
    []
  );

  return {
    sendRawMessageToDotNet,
    sendInvokeMessageToDotNet,
    sendInvokeMessageToDotNetAsync,
    sendInvokeMessageToDotNetAsyncTask,
  };
};
