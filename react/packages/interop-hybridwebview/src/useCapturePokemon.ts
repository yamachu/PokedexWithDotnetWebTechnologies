import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useCapturePokemon";
import React from "react";
import { useHybridWebView } from "./hooks/useHybridWebView";

export const useCapturePokemon: FunctionType = ({ DataSourceGetter }) => {
  const {
    sendInvokeMessageToDotNetAsync,
    sendInvokeMessageToDotNet,
    sendInvokeMessageToDotNetAsyncTask,
  } = useHybridWebView();

  const fetchCapturedPokemons = React.useCallback((): Promise<number[]> => {
    return sendInvokeMessageToDotNetAsyncTask("FetchCapturedPokemons", []).then(
      (v) => v.Result
    );
  }, [sendInvokeMessageToDotNetAsync]);

  const migration = React.useCallback((): Promise<void> => {
    return sendInvokeMessageToDotNetAsync("Migration", []);
  }, [sendInvokeMessageToDotNetAsync]);

  const putCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      return sendInvokeMessageToDotNetAsync("PutCapturedPokemon", [id]);
    },
    [sendInvokeMessageToDotNetAsync]
  );

  const deleteCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      return sendInvokeMessageToDotNetAsync("DeleteCapturedPokemon", [id]);
    },
    [sendInvokeMessageToDotNetAsync]
  );

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  React.useEffect(
    function InitializeDataSource() {
      sendInvokeMessageToDotNet("SetCaptureDataSourceGetter", [
        DataSourceGetterValue,
      ]);
    },
    [DataSourceGetterValue, sendInvokeMessageToDotNet]
  );

  return {
    migration,
    fetchCapturedPokemons,
    deleteCapturedPokemon,
    putCapturedPokemon,
  };
};
