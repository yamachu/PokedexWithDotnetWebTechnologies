namespace PokedexDotnet.Experimental.HybridWebView;

using PokedexDotnet.Shared.Infrastructures;
using PokedexDotnet.Shared;

using System.Text.Json;

public partial class MainPage : ContentPage
{
	private readonly JSInvokeTarget invokeTarget;

	public MainPage()
	{
		InitializeComponent();

#if DEBUG
		// see: https://github.com/dotnet/maui/issues/22305
		// Debug Switch is not implemented yet...
#endif

		this.invokeTarget = new JSInvokeTarget();
	}

	private void OnHybridWebViewRawMessageReceived(object sender, HybridWebViewRawMessageReceivedEventArgs e)
	{
		var message = e.Message;
		var methodName = JsonDocument.Parse(message).RootElement.GetProperty("methodName").GetString();
		var timestamp = JsonDocument.Parse(message).RootElement.GetProperty("timestamp").GetInt32();

		switch (methodName)
		{
			case "SetDataSourceGetter":
				var dataSource = JsonDocument.Parse(message).RootElement.GetProperty("paramValues").EnumerateArray().First().GetString();
				invokeTarget.SetDataSourceGetter(dataSource);
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName }));
				break;
			case "SetCaptureDataSourceGetter":
				var captureDataSource = JsonDocument.Parse(message).RootElement.GetProperty("paramValues").EnumerateArray().First().GetString();
				invokeTarget.SetCaptureDataSourceGetter(captureDataSource);
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName }));
				break;
			case "FetchPokemons":
				var pokemons = invokeTarget.FetchPokemons().Result;
				var json = JsonSerializer.Serialize(new { timestamp, methodName, value = pokemons });
				myHybridWebView.SendRawMessage(json);
				break;
			case "Migration":
				invokeTarget.Migration().Wait();
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName }));
				break;
			case "FetchCapturedPokemons":
				var capturedPokemonIds = invokeTarget.FetchCapturedPokemons().Result;
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName, value = capturedPokemonIds }));
				break;
			case "PutCapturedPokemon":
				var id = JsonDocument.Parse(message).RootElement.GetProperty("paramValues").EnumerateArray().First().GetInt32();
				invokeTarget.PutCapturedPokemon(id).Wait();
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName }));
				break;
			case "DeleteCapturedPokemon":
				var deleteId = JsonDocument.Parse(message).RootElement.GetProperty("paramValues").EnumerateArray().First().GetInt32();
				invokeTarget.DeleteCapturedPokemon(deleteId).Wait();
				myHybridWebView.SendRawMessage(JsonSerializer.Serialize(new { timestamp, methodName }));
				break;
		}
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
