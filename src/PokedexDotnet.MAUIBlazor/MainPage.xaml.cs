namespace PokedexDotnet.MAUIBlazor;
using Microsoft.AspNetCore.Components.Web;

public partial class MainPage : ContentPage
{
	public MainPage()
	{
		InitializeComponent();

		// Register the Blazor WebView component
		// see: https://learn.microsoft.com/en-us/aspnet/core/blazor/components/js-spa-frameworks?view=aspnetcore-8.0#blazor-custom-elements
		blazorWebView.RootComponents.RegisterForJavaScript<Components.JSInterop.FetchPokemon>("fetch-pokemon-react");
		blazorWebView.RootComponents.RegisterForJavaScript<Components.JSInterop.CapturePokemon>("capture-pokemon-react");
	}
}
