import { type BlazorRenderFragment } from "@pokedex-dotnet-react/interop-shared/src/types/Blazor";
import { type Pokemon } from "@pokedex-dotnet-react/interop-shared/src/types/Contract";
import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useFetchPokemon";
import React from "react";
import { useBlazor } from "./hooks/useBlazor";
import { useDotnetRef } from "./hooks/useDotnetRef";

export const useFetchPokemon: FunctionType<BlazorRenderFragment> = ({
  DataSourceGetter,
}) => {
  const { dotnetRef, ...cbs } = useDotnetRef();

  const fetchPokemons = React.useCallback((): Promise<Pokemon[]> => {
    if (dotnetRef) {
      return dotnetRef.invokeMethodAsync("FetchPokemons");
    }
    return Promise.resolve([]);
  }, [dotnetRef]);

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  // See: src/PokedexDotnet.MAUIBlazor/MainPage.xaml.cs
  // identifier: FetchPokemon-react
  // BlazorComponent not accept function, so we need to pass the function result
  const fragment = useBlazor("FetchPokemon", {
    DataSource: DataSourceGetterValue,
    ...cbs,
  });

  return { fetchPokemons, fragment };
};
