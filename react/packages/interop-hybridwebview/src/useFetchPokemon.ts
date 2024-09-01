import { type Pokemon } from "@pokedex-dotnet-react/interop-shared/src/types/Contract";
import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useFetchPokemon";
import React from "react";
import { useHybridWebView } from "./hooks/useHybridWebView";

export const useFetchPokemon: FunctionType = ({ DataSourceGetter }) => {
  const { sendInvokeMessageToDotNetAsync } = useHybridWebView();

  const fetchPokemons = React.useCallback((): Promise<Pokemon[]> => {
    return sendInvokeMessageToDotNetAsync("FetchPokemons", []).then(
      (pokemons) => {
        return (pokemons as any as any[]).map((p: any) => ({
          id: p.Id,
          name: p.Name,
        }));
      }
    );
  }, [sendInvokeMessageToDotNetAsync]);

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  React.useEffect(
    function InitializeDataSource() {
      sendInvokeMessageToDotNetAsync("SetDataSourceGetter", [
        DataSourceGetterValue,
      ]);
    },
    [DataSourceGetterValue, sendInvokeMessageToDotNetAsync]
  );

  return { fetchPokemons };
};
