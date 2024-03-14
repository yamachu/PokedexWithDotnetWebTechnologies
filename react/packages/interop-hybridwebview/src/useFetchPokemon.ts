import { type Pokemon } from "@pokedex-dotnet-react/interop-shared/src/types/Contract";
import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useFetchPokemon";
import React from "react";
import { useHybridWebView } from "./hooks/useHybridWebView";

export const useFetchPokemon: FunctionType = ({ DataSourceGetter }) => {
  const {
    sendInvokeMessageToDotNetAsync,
    sendInvokeMessageToDotNet,
    sendInvokeMessageToDotNetAsyncTask,
  } = useHybridWebView();

  const fetchPokemons = React.useCallback((): Promise<Pokemon[]> => {
    return sendInvokeMessageToDotNetAsyncTask("FetchPokemons", [])
      .then((v) => v.Result)
      .then((pokemons) =>
        pokemons.map((p: any) => ({ id: p.Id, name: p.Name }))
      );
  }, [sendInvokeMessageToDotNetAsync]);

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  React.useEffect(
    function InitializeDataSource() {
      sendInvokeMessageToDotNet("SetDataSourceGetter", [DataSourceGetterValue]);
    },
    [DataSourceGetterValue, sendInvokeMessageToDotNet]
  );

  return { fetchPokemons };
};
