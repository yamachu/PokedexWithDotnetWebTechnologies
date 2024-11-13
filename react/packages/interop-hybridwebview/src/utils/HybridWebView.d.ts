export type HybridWebView = {
  /**
   * Sends a message to .NET using the built in
   * @param {string} message Message to send.
   */
  SendRawMessage: (message: string) => void;

  /**
   * Invokes a .NET method with the given name and parameters.
   * @param {string} methodName Dotnet method name to invoke.
   * @param {any} paramValues Json serializable object to pass as parameter.
   * @returns {Promise<any>} Promise that resolves with the result of the .NET method invocation.
   */
  InvokeDotNet: (
    methodName: string,
    paramValues: Array<any> | any
  ) => Promise<any>;
};
