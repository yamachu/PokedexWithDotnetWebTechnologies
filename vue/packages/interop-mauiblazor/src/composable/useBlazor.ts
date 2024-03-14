import {
  defineComponent,
  h,
  onUnmounted,
  ref,
  unref,
  watch,
  type Ref,
} from "vue";

const mountBlazorNode =
  (
    addPromiseRef: Ref<Promise<unknown>>,
    hasPendingRef: Ref<boolean>,
    identifier: string,
    props: any
  ) =>
  (node: Element) => {
    if (!node) {
      return;
    }

    const parentElement = node.parentElement;
    if (!parentElement) {
      return;
    }
    addPromiseRef.value = Promise.resolve()
      .then(() => {
        // @ts-ignore
        return Blazor.rootComponents.add(
          parentElement,
          `${identifier}-js`,
          props
        );
      })
      .then((rootComponent) => {
        hasPendingRef.value = false;
        return rootComponent;
      });
  };

export function useBlazor(instance: any, identifier: string, props: any) {
  const previousPropsRef = ref<Record<string, any>>({});
  const addRootComponentPromiseRef = ref<Promise<unknown>>(
    null as unknown as Promise<unknown>
  );
  const hasPendingSetParametersRef = ref(true);
  const isDisposedRef = ref(false);

  const templateRef = ref(
    mountBlazorNode(
      addRootComponentPromiseRef,
      hasPendingSetParametersRef,
      identifier,
      props
    )
  );

  watch(props, (newProps) => {
    templateRef.value = mountBlazorNode(
      addRootComponentPromiseRef,
      hasPendingSetParametersRef,
      identifier,
      newProps
    );

    instance?.proxy?.$forceUpdate();
  });

  watch(props, (newProps) => {
    if (hasPendingSetParametersRef.value) {
      return;
    }

    const parameters: Record<string, any> = {};
    let parametersDidChange = false;

    // Only send changed parameters to .NET.
    for (const [key, value] of Object.entries(newProps)) {
      if (previousPropsRef.value[key] !== value) {
        parameters[key] = value;
        parametersDidChange = true;
      }
    }

    if (!parametersDidChange) {
      return;
    }

    hasPendingSetParametersRef.value = true;
    addRootComponentPromiseRef.value
      .then((rootComponent) => {
        if (!isDisposedRef.value) {
          // @ts-ignore
          return rootComponent.setParameters(parameters);
        }
      })
      .then(() => {
        hasPendingSetParametersRef.value = false;
      });
  });

  onUnmounted(() => {
    setTimeout(() => {
      isDisposedRef.value = true;
      if (addRootComponentPromiseRef.value) {
        addRootComponentPromiseRef.value.then((rootComponent) =>
          // @ts-ignore
          rootComponent.dispose()
        );
      }
    }, 1000);
  });

  watch(props, (newProps) => {
    previousPropsRef.value = { ...newProps };
  });

  const templateUnRefedRef = unref(templateRef);
  // @ts-ignore
  const render = () => h("template", { ref: templateUnRefedRef });

  return addRootComponentPromiseRef.value === null
    ? defineComponent({ render })
    : null;
}
