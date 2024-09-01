export type HybridWebView = {
  /**
   * Sends a message to .NET using the built in
   * @param {string} message Message to send.
   */
  SendRawMessage: (message: string) => void;
};
