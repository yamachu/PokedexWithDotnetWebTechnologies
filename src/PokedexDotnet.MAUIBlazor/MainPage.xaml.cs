namespace PokedexDotnet.MAUIBlazor;
using Microsoft.AspNetCore.Components.Web;

public partial class MainPage : ContentPage
{
	public MainPage()
	{
		InitializeComponent();

		// Register the Blazor WebView component
		blazorWebView.RootComponents.RegisterForJavaScript<Components.JSInterop.FetchPokemon>("FetchPokemon-react");
		blazorWebView.RootComponents.RegisterForJavaScript<Components.JSInterop.CapturePokemon>("CapturePokemon-react");
	}
}
