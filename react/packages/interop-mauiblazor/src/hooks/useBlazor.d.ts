/// <reference types="@types/react" />
export function useBlazor(
  identifier: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  props: any
): React.ReactElement | null;

export type DotnetReference = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invokeMethodAsync(managedMethodName: string, ...args: any[]): Promise<any>;
};
