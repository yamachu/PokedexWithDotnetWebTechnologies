import { type FunctionType } from "@pokedex-dotnet-react/interop-shared/src/useCapturePokemon";
import React from "react";
import { useHybridWebView } from "./hooks/useHybridWebView";

export const useCapturePokemon: FunctionType = ({ DataSourceGetter }) => {
  const { sendInvokeMessageToDotNetAsync } = useHybridWebView();

  const fetchCapturedPokemons = React.useCallback((): Promise<number[]> => {
    return sendInvokeMessageToDotNetAsync("FetchCapturedPokemons", []).then(
      (v) => v as number[]
    );
  }, [sendInvokeMessageToDotNetAsync]);

  const migration = React.useCallback((): Promise<void> => {
    return sendInvokeMessageToDotNetAsync("Migration", []).then(() => {});
  }, [sendInvokeMessageToDotNetAsync]);

  const putCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      return sendInvokeMessageToDotNetAsync("PutCapturedPokemon", [id]).then(
        () => {}
      );
    },
    [sendInvokeMessageToDotNetAsync]
  );

  const deleteCapturedPokemon = React.useCallback(
    (id: number): Promise<void> => {
      return sendInvokeMessageToDotNetAsync("DeleteCapturedPokemon", [id]).then(
        () => {}
      );
    },
    [sendInvokeMessageToDotNetAsync]
  );

  const DataSourceGetterValue = React.useMemo(
    () => DataSourceGetter(),
    [DataSourceGetter]
  );

  React.useEffect(
    function InitializeDataSource() {
      sendInvokeMessageToDotNetAsync("SetCaptureDataSourceGetter", [
        DataSourceGetterValue,
      ]);
    },
    [DataSourceGetterValue, sendInvokeMessageToDotNetAsync]
  );

  return {
    migration,
    fetchCapturedPokemons,
    deleteCapturedPokemon,
    putCapturedPokemon,
  };
};
