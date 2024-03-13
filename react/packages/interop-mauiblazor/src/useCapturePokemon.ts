import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useCapturePokemon";
import React from "react";
import { useBlazor } from "./hooks/useBlazor";
import { useDotnetRef } from "./hooks/useDotnetRef";
import { type BlazorRenderFragment } from "./types/ReturnTypes";

export const useCapturePokemon: FunctionType<BlazorRenderFragment> = ({
  DataSourceGetter,
}) => {
  const { dotnetRef, ...cbs } = useDotnetRef();

  const fetchCapturedPokemons = React.useCallback((): Promise<number[]> => {
    if (dotnetRef) {
      return dotnetRef.invokeMethodAsync("FetchCapturedPokemons");
    }
    return Promise.resolve([]);
  }, [dotnetRef]);

  const migration = React.useCallback((): Promise<void> => {
    if (dotnetRef) {
      return dotnetRef.invokeMethodAsync("Migration");
    }
    return Promise.resolve();
  }, [dotnetRef]);

  const putCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      if (dotnetRef) {
        return dotnetRef.invokeMethodAsync("PutCapturedPokemon", id);
      }
      return Promise.resolve();
    },
    [dotnetRef]
  );

  const deleteCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      if (dotnetRef) {
        return dotnetRef.invokeMethodAsync("DeleteCapturedPokemon", id);
      }
      return Promise.resolve();
    },
    [dotnetRef]
  );

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  // See: src/PokedexDotnet.MAUIBlazor/MainPage.xaml.cs
  // identifier: CapturePokemon-react
  // BlazorComponent not accept function, so we need to pass the function result
  const fragment = useBlazor("CapturePokemon", {
    DataSource: DataSourceGetterValue,
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
