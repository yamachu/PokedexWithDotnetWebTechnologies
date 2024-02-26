namespace PokedexDotnet.Shared.Test;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared.Usecases;

public class QueryPokemonTest
{
    [Fact]
    public async Task TestFetchPokemons()
    {
        var dbHelper = new SqliteConnectionWrapper(() => "Data Source=./fixtures/0-152.db");
        var pokemons = await QueryPokemon.FetchPokemons(dbHelper);
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヌル"),
                new Pokemon(152, "けつばん")
            },
            pokemons
        );
    }

    [Fact]
    public async Task FetchPokemon()
    {
        var dbHelper = new SqliteConnectionWrapper(() => "Data Source=./fixtures/0-152.db");
        var pokemon0 = await QueryPokemon.FetchPokemons(dbHelper, "0");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(0, "ヌル")
            },
            pokemon0
        );

        var pokemon152 = await QueryPokemon.FetchPokemons(dbHelper, "けつ");
        Assert.Equal(
            new Pokemon[] {
                new Pokemon(152, "けつばん")
            },
            pokemon152
        );
    }
}