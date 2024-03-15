import { useCapturePokemon } from "@pokedex-dotnet-react/interop-hybridwebview/src/useCapturePokemon";
import { useFetchPokemon } from "@pokedex-dotnet-react/interop-hybridwebview/src/useFetchPokemon";
import { useCallback, useEffect, useState } from "react";

type Pokemon = Awaited<
  ReturnType<ReturnType<typeof useFetchPokemon>["fetchPokemons"]>
>;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon>([]);
  const [capturedPokemonIds, setCapturedPokemonIds] = useState<number[]>([]);
  const { fetchPokemons } = useFetchPokemon({
    // This path is relative to the .NET project's output directory
    // But this structure is only support macOS, for Windows and Linux, you need to change the path or use another way to get the path...
    DataSourceGetter: () => "Data Source=./Contents/Resources/pokemons.db",
  });
  const {
    migration,
    deleteCapturedPokemon,
    fetchCapturedPokemons,
    putCapturedPokemon,
  } = useCapturePokemon({
    DataSourceGetter: () => "this value not used in .NET MAUI Blazor",
  });

  useEffect(() => {
    fetchPokemons().then((pokemons) => {
      setPokemons(pokemons);
    });
  }, [fetchPokemons]);

  useEffect(() => {
    migration();
  }, [migration]);

  useEffect(() => {
    fetchCapturedPokemons().then((ids) => {
      setCapturedPokemonIds(ids);
    });
  }, [fetchCapturedPokemons]);

  const deleteCaptured = useCallback(
    (id: number) => {
      deleteCapturedPokemon(id).then(() =>
        fetchCapturedPokemons().then((ids) => {
          setCapturedPokemonIds(ids);
        })
      );
    },
    [deleteCapturedPokemon, fetchCapturedPokemons]
  );

  const putCaptured = useCallback(
    (id: number) => {
      putCapturedPokemon(id).then(() =>
        fetchCapturedPokemons().then((ids) => {
          setCapturedPokemonIds(ids);
        })
      );
    },
    [putCapturedPokemon, fetchCapturedPokemons]
  );

  return (
    <>
      <h1>Vite + React + .NET MAUI Blazor</h1>
      <h2>From .NET!</h2>
      <ul>
        {pokemons.map((v) => {
          const isCaptured =
            capturedPokemonIds?.some((c) => c === v.id) ?? false;
          return (
            <li
              style={{ listStyleType: "none" }}
              onClick={() => {
                if (isCaptured) {
                  deleteCaptured(v.id);
                } else {
                  putCaptured(v.id);
                }
              }}
              key={v.id}
            >
              <span
                style={{
                  paddingRight: "8px",
                  color: isCaptured ? "red" : "gray",
                }}
              >
                ●
              </span>
              {("000" + v.id).slice(-3)}: {v.name}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default App;
