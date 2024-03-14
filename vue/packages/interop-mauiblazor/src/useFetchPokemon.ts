import { type Pokemon } from "@pokedex-dotnet-vue/interop-shared/src/types/Contract";
import { type FunctionType } from "@pokedex-dotnet-vue/interop-shared/src/useFetchPokemon";
import { computed, ref, watch } from "vue";
import { useBlazor } from "./composable/useBlazor";
import { useDotnetRef } from "./composable/useDotnetRef";
import type { BaseProps } from "./types/PropTypes";
import type { BlazorRenderFragment, WrapRef } from "./types/ReturnTypes";

type DotnetRef = ReturnType<typeof useDotnetRef>["dotnetRef"];

const fetchPokemonsGenerator =
  (dotnetRef: DotnetRef) => (): Promise<Pokemon[]> => {
    if (dotnetRef.value) {
      return dotnetRef.value.invokeMethodAsync("FetchPokemons");
    }
    return Promise.resolve([]);
  };

export const useFetchPokemon: WrapRef<
  FunctionType<BaseProps, BlazorRenderFragment>,
  keyof BlazorRenderFragment
> = ({ instance, DataSourceGetter }) => {
  const { dotnetRef, ...cbs } = useDotnetRef();

  const fetchPokemons = ref(fetchPokemonsGenerator(dotnetRef));

  watch(dotnetRef, () => {
    fetchPokemons.value = fetchPokemonsGenerator(dotnetRef);
  });

  const DataSourceGetterValue = computed(() => DataSourceGetter());

  // See: src/PokedexDotnet.MAUIBlazor/MainPage.xaml.cs
  // identifier: fetch-pokemon-js
  // BlazorComponent not accept function, so we need to pass the function result
  const fragment = useBlazor(instance, "fetch-pokemon", {
    DataSource: DataSourceGetterValue.value,
    ...cbs,
  });

  return { fetchPokemons, fragment };
};
