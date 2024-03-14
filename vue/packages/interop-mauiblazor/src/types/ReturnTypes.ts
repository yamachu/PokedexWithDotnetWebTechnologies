import type { BaseFunctionType } from "@pokedex-dotnet-vue/interop-shared/src/types/Types";
import type { Ref } from "vue";

export type BlazorRenderFragment = {
  fragment: ReturnType<typeof import("../composable/useBlazor")["useBlazor"]>;
};

export type WrapRef<
  T,
  U extends string | number | symbol // keyof...
> = T extends BaseFunctionType<infer P, infer R>
  ? U extends keyof R
    ? (props: P) => {
        [K in keyof Omit<R, U>]: Ref<R[K]>;
      } & { [K in U]: R[K] }
    : never
  : never;
