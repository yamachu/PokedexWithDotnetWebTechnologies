import { type FunctionType } from "@pokedex-dotnet-vue/interop-shared/src/useCapturePokemon";
import { computed, ref, watch } from "vue";
import { useBlazor } from "./composable/useBlazor";
import { useDotnetRef } from "./composable/useDotnetRef";
import type { BaseProps } from "./types/PropTypes";
import type { BlazorRenderFragment, WrapRef } from "./types/ReturnTypes";

type DotnetRef = ReturnType<typeof useDotnetRef>["dotnetRef"];

const fetchCapturedPokemonsGenerator =
  (dotnetRef: DotnetRef) => (): Promise<number[]> => {
    if (dotnetRef.value) {
      return dotnetRef.value.invokeMethodAsync("FetchCapturedPokemons");
    }
    return Promise.resolve([]);
  };

const migrationGenerator = (dotnetRef: DotnetRef) => (): Promise<void> => {
  if (dotnetRef.value) {
    return dotnetRef.value.invokeMethodAsync("Migration");
  }
  return Promise.resolve();
};

const putCapturedPokemonGenerator =
  (dotnetRef: DotnetRef) =>
  (id: number): Promise<void> => {
    if (dotnetRef.value) {
      return dotnetRef.value.invokeMethodAsync("PutCapturedPokemon", id);
    }
    return Promise.resolve();
  };

const deleteCapturedPokemonGenerator =
  (dotnetRef: DotnetRef) =>
  (id: number): Promise<void> => {
    if (dotnetRef.value) {
      return dotnetRef.value.invokeMethodAsync("DeleteCapturedPokemon", id);
    }
    return Promise.resolve();
  };

export const useCapturePokemon: WrapRef<
  FunctionType<BaseProps, BlazorRenderFragment>,
  keyof BlazorRenderFragment
> = ({ instance, DataSourceGetter }) => {
  const { dotnetRef, ...cbs } = useDotnetRef();

  const fetchCapturedPokemons = ref(fetchCapturedPokemonsGenerator(dotnetRef));

  const migration = ref(migrationGenerator(dotnetRef));

  const putCapturedPokemon = ref(putCapturedPokemonGenerator(dotnetRef));

  const deleteCapturedPokemon = ref(deleteCapturedPokemonGenerator(dotnetRef));

  watch(dotnetRef, () => {
    fetchCapturedPokemons.value = fetchCapturedPokemonsGenerator(dotnetRef);
    migration.value = migrationGenerator(dotnetRef);
    putCapturedPokemon.value = putCapturedPokemonGenerator(dotnetRef);
    deleteCapturedPokemon.value = deleteCapturedPokemonGenerator(dotnetRef);
  });

  const DataSourceGetterValue = computed(() => DataSourceGetter());

  // See: src/PokedexDotnet.MAUIBlazor/MainPage.xaml.cs
  // identifier: capture-pokemon-js
  // BlazorComponent not accept function, so we need to pass the function result
  const fragment = useBlazor(instance, "capture-pokemon", {
    DataSource: DataSourceGetterValue.value,
    ...cbs,
  });

  return {
    migration,
    fetchCapturedPokemons,
    deleteCapturedPokemon,
    putCapturedPokemon,
    fragment,
  };
};
