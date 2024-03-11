namespace PokedexDotnet.MAUIBlazor.Components.JSInterop;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared;

public partial class FetchPokemon : BaseComponent<FetchPokemon>
{
    [Parameter] public Func<string>? DataSourceGetter { private get; set; }

    [JSInvokable]
    private async Task<Pokemon[]> FetchPokemons()
    {
        if (DataSourceGetter == null) return Array.Empty<Pokemon>();

        var dbHelper = new SqliteConnectionWrapper(DataSourceGetter);
        var pokemons = await PokedexDotnet.Shared.Usecases.QueryPokemon.FetchPokemons(dbHelper);
        return pokemons;
    }

}