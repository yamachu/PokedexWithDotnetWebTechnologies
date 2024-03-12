import { useFetchPokemon } from "@pokedex-dotnet-react/interop-mauiblazor/src/useFetchPokemon";
import { useEffect, useState } from "react";

type Pokemon = Awaited<
  ReturnType<ReturnType<typeof useFetchPokemon>["fetchPokemons"]>
>;

function App() {
  const [pokemons, setPokemons] = useState<Pokemon>([]);
  const { fetchPokemons } = useFetchPokemon({
    // This path is relative to the .NET project's output directory
    // But this structure is only support macOS, for Windows and Linux, you need to change the path or use another way to get the path...
    DataSourceGetter: () => "Data Source=./Contents/Resources/pokemons.db",
  });

  useEffect(() => {
    fetchPokemons().then((pokemons) => {
      setPokemons(pokemons);
    });
  }, [fetchPokemons]);

  return (
    <>
      <h1>Vite + React + .NET MAUI Blazor</h1>
      <h2>From .NET!</h2>
      <ul>
        {pokemons.map((pokemon) => (
          <li key={pokemon.id}>
            {pokemon.id} - {pokemon.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
