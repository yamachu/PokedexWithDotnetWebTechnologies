﻿using Microsoft.Extensions.Logging;

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

#if DEBUG
		builder.Logging.AddDebug();
		builder.Services.AddHybridWebViewDeveloperTools();
#endif

		return builder.Build();
	}
}
