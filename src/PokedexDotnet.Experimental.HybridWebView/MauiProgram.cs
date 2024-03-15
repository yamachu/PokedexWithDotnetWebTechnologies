using Microsoft.Extensions.Logging;

namespace PokedexDotnet.Experimental.HybridWebView;

public static class MauiProgram
{
	public static MauiApp CreateMauiApp()
	{
		var builder = MauiApp.CreateBuilder();
		builder
			.UseMauiApp<App>()
			.ConfigureFonts(fonts =>
			{
				fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
			});

		// https://github.com/Eilon/MauiHybridWebView/tree/main?tab=readme-ov-file#getting-started
		builder.Services.AddHybridWebView();

#if DEBUG
		builder.Logging.AddDebug();
#endif

		return builder.Build();
	}
}
