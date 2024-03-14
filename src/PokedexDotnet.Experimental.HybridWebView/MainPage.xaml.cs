namespace PokedexDotnet.Experimental.HybridWebView;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared;

public partial class MainPage : ContentPage
{
	public MainPage()
	{
		InitializeComponent();

#if DEBUG
		myHybridWebView.EnableWebDevTools = true;
#endif

		myHybridWebView.JSInvokeTarget = new JSInvokeTarget();
	}

	private sealed class JSInvokeTarget()
	{
		private string? DataSource { get; set; }
		private string CaptureDataSourceInternal => $"Data Source={FileSystem.Current.AppDataDirectory}/captured.db";

		public void SetDataSourceGetter(string dataSource)
		{
			DataSource = dataSource;
		}

		public void SetCaptureDataSourceGetter(string _) { }

		public async Task<Pokemon[]> FetchPokemons()
		{
			if (DataSource == null) return Array.Empty<Pokemon>();

			var dbHelper = new SqliteConnectionWrapper(() => DataSource);
			var pokemons = await PokedexDotnet.Shared.Usecases.QueryPokemon.FetchPokemons(dbHelper);
			return pokemons;
		}

		public async Task Migration()
		{
			var dbHelper = new SqliteConnectionWrapper(() => CaptureDataSourceInternal);
			await dbHelper.AsyncBindConnection(
				async (c) => await PokedexDotnet.Shared.Usecases.CapturePokemon.Migration(c),
				Task.FromException<int>(new Exception($"Cannot migrate captured pokemons, filePath: {CaptureDataSourceInternal}"))
			);
		}

		public async Task<int[]> FetchCapturedPokemons()
		{
			var dbHelper = new SqliteConnectionWrapper(() => CaptureDataSourceInternal);
			var capturedPokemonIds = await PokedexDotnet.Shared.Usecases.CapturePokemon.FetchCapturedPokemons(dbHelper);
			return capturedPokemonIds;
		}

		public async Task PutCapturedPokemon(int id)
		{
			var dbHelper = new SqliteConnectionWrapper(() => CaptureDataSourceInternal);
			await PokedexDotnet.Shared.Usecases.CapturePokemon.PutCapturedPokemon(dbHelper, id);
		}

		public async Task DeleteCapturedPokemon(int id)
		{
			var dbHelper = new SqliteConnectionWrapper(() => CaptureDataSourceInternal);
			await PokedexDotnet.Shared.Usecases.CapturePokemon.DeleteCapturedPokemon(dbHelper, id);
		}
	}
}
