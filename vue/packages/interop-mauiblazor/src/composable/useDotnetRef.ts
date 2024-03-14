import { ref } from "vue";

type DotnetReference = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  invokeMethodAsync(managedMethodName: string, ...args: any[]): Promise<any>;
};

export function useDotnetRef() {
  const dotnetRef = ref<DotnetReference | null>(null);
  const onComponentInitializedCb = (dRef: DotnetReference) =>
    (dotnetRef.value = dRef);
  const onComponentDestroyedCb = () => (dotnetRef.value = null);

  return { dotnetRef, onComponentInitializedCb, onComponentDestroyedCb };
}
