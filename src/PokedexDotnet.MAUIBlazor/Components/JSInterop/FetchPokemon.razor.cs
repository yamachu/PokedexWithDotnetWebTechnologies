namespace PokedexDotnet.MAUIBlazor.Components.JSInterop;

using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared;

public partial class FetchPokemon : BaseComponent<FetchPokemon>
{
    [Parameter] public string? DataSource { private get; set; }

    [JSInvokable]
    public async Task<Pokemon[]> FetchPokemons()
    {
        if (DataSource == null) return Array.Empty<Pokemon>();

        var dbHelper = new SqliteConnectionWrapper(() => DataSource);
        var pokemons = await PokedexDotnet.Shared.Usecases.QueryPokemon.FetchPokemons(dbHelper);
        return pokemons;
    }

}