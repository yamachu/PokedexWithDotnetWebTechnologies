// Based: https://github.com/Eilon/MauiHybridWebView/blob/3ca801076a1e3fbe3b8922b2429524df20def6a4/HybridWebView/KnownStaticFiles/HybridWebView.js

export type HybridWebView = {
  /**
   * Sends a message to .NET using the built in
   * @param {string} message Message to send.
   */
  SendRawMessageToDotNet: (message: string) => void;

  /**
   * Invoke a .NET method. No result is expected.
   * @param {string} methodName Name of .NET method to invoke.
   * @param {any[]} paramValues Parameters to pass to the method.
   */
  SendInvokeMessageToDotNet: (methodName: string, paramValues: any[]) => void;

  /**
   * Asynchronously invoke .NET method and get a result.
   * Leverages the proxy to send the message to .NET.
   * @param {string} methodName Name of .NET method to invoke.
   * @param {any[]} paramValues Parameters to pass to the method.
   * @returns {Promise<any>} Result of the .NET method.
   */
  SendInvokeMessageToDotNetAsync: (
    methodName: string,
    paramValues: any[]
  ) => Promise<any>;
};
