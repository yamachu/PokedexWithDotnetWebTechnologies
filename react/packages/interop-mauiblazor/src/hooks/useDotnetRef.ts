import React from "react";
import { type DotnetReference } from "./useBlazor";

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
