namespace PokedexDotnet.BlazorWebAssembly.Components.JSInterop;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

using PokedexDotnet.Shared.Infrastructures;

public partial class CapturePokemon : BaseComponent<CapturePokemon>
{
    // File access is not allowed...so it's not used
    [Parameter] public string? DataSource { private get; set; }

    // https://learn.microsoft.com/en-us/dotnet/maui/platform-integration/storage/file-system-helpers?view=net-maui-8.0&tabs=windows#app-data-directory
    private string DataSourceInternal => $"Data Source={FileSystem.Current.AppDataDirectory}/captured.db";

    [JSInvokable]
    public async Task Migration()
    {
        if (DataSource == null) return;

        var dbHelper = new SqliteConnectionWrapper(() => DataSourceInternal);
        await dbHelper.AsyncBindConnection(
            async (c) => await PokedexDotnet.Shared.Usecases.CapturePokemon.Migration(c),
            Task.FromException<int>(new Exception($"Cannot migrate captured pokemons, filePath: {DataSource}"))
        );
    }

    [JSInvokable]
    public async Task<int[]> FetchCapturedPokemons()
    {
        if (DataSource == null) return [];

        var dbHelper = new SqliteConnectionWrapper(() => DataSourceInternal);
        var capturedPokemonIds = await PokedexDotnet.Shared.Usecases.CapturePokemon.FetchCapturedPokemons(dbHelper);
        return capturedPokemonIds;
    }

    [JSInvokable]
    public async Task PutCapturedPokemon(int id)
    {
        if (DataSource == null) return;

        var dbHelper = new SqliteConnectionWrapper(() => DataSourceInternal);
        await PokedexDotnet.Shared.Usecases.CapturePokemon.PutCapturedPokemon(dbHelper, id);
    }

    [JSInvokable]
    public async Task DeleteCapturedPokemon(int id)
    {
        if (DataSource == null) return;

        var dbHelper = new SqliteConnectionWrapper(() => DataSourceInternal);
        await PokedexDotnet.Shared.Usecases.CapturePokemon.DeleteCapturedPokemon(dbHelper, id);
    }

}