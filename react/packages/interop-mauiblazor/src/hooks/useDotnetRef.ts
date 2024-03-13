import React from "react";

type DotnetReference = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invokeMethodAsync(managedMethodName: string, ...args: any[]): Promise<any>;
};

export function useDotnetRef() {
  const [dotnetRef, setDotnetRef] = React.useState<DotnetReference | null>(
    null
  );

  const onComponentInitializedCb = React.useCallback(
    (dRef: DotnetReference) => setDotnetRef(dRef),
    []
  );
  const onComponentDestroyedCb = React.useCallback(
    () => setDotnetRef(null),
    []
  );

  return { dotnetRef, onComponentInitializedCb, onComponentDestroyedCb };
}
