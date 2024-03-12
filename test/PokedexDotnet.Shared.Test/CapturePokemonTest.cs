namespace PokedexDotnet.Shared.Test;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared.Usecases;

public class CapturePokemonTest
{
    [Fact]
    public async Task TestCapturePokemons()
    {
        using var connection = await new DisposableSqliteConnection(() => "Data Source=:memory:").Open();
        if (connection == null)
        {
            Assert.Fail("Cannot open connection");
        }

        await CapturePokemon.Migration(connection);

        await CapturePokemon.PutCapturedPokemon(connection, 151);

        var pokemons = await CapturePokemon.FetchCapturedPokemons(connection);
        Assert.Equal(
            [151],
            pokemons
        );
    }

    [Fact]
    public async Task TestDeletePokemons()
    {
        using var connection = await new DisposableSqliteConnection(() => "Data Source=:memory:").Open();
        if (connection == null)
        {
            Assert.Fail("Cannot open connection");
        }

        await CapturePokemon.Migration(connection);
        await CapturePokemon.PutCapturedPokemon(connection, 151);

        await CapturePokemon.DeleteCapturedPokemon(connection, 151);

        var pokemons = await CapturePokemon.FetchCapturedPokemons(connection);
        Assert.Equal(
            [],
            pokemons
        );
    }
}